const PDFDocument = require('pdfkit')
const { format } = require('date-fns')

const MAX_WIDTH = 612
const MAX_HEIGHT = 792

const MARGIN = 20

const FORMATTER = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

module.exports = (ctx) => {
  const {
    client,
    id,
    dates,
    lines,
    timetable,
  } = ctx.request.body

  const doc = new PDFDocument()

  setTimeout(() => {
    doc.registerFont('regular', 'Helvetica')
    doc.registerFont('bold', 'Helvetica-Bold')

    doc.image('./resources/logo.png', MARGIN, MARGIN, { fit: [50, 50] })

    doc.text(' ')

    let { x, y } = doc
    doc.font('bold').text('Prestataire', MARGIN, y, { width: MAX_WIDTH - MARGIN, align: 'left' }).font('regular')
    doc.text('ALAKARTE', MARGIN, doc.y, { width: MAX_WIDTH - MARGIN, align: 'left' })
    doc.text('SIREN : 837 609 890', MARGIN, doc.y, { width: MAX_WIDTH - MARGIN, align: 'left' })
    doc.text('Numéro de TVA intracommunautaire : FR 62 837609890', MARGIN, doc.y, { width: MAX_WIDTH - MARGIN, align: 'left' })
    doc.text('SARL au capital de 1000€', MARGIN, doc.y, { width: MAX_WIDTH - MARGIN, align: 'left' })

    doc.text(' ')
    doc.font('bold').text('Adresse', MARGIN, doc.y, { width: MAX_WIDTH - MARGIN, align: 'left' }).font('regular')
    doc.text('105 Rue de la Patouillerie', MARGIN, doc.y, { width: MAX_WIDTH - MARGIN, align: 'left' })
    doc.text('44700 ORVAULT', MARGIN, doc.y, { width: MAX_WIDTH - MARGIN, align: 'left' })

    doc.font('bold').text('Client', 0, y, { width: MAX_WIDTH - MARGIN, align: 'right' }).font('regular')
    doc.text(`${client.name}`, 0, doc.y, { width: MAX_WIDTH - MARGIN, align: 'right' })
    doc.text(`${client.address}`, 0, doc.y, { width: MAX_WIDTH - MARGIN, align: 'right' })
    doc.text(`${client.city}`, 0, doc.y, { width: MAX_WIDTH - MARGIN, align: 'right' })

    doc.fontSize(48)
    doc.text('Facture', 0, 200, {
      width: MAX_WIDTH,
      align: 'center',
    })
    doc.fontSize(14)
    doc.text(`n°${id}`, 0, doc.y, { width: MAX_WIDTH, align: 'center' })

    doc.fontSize(10)
    doc
      .text('Date d\'émission : ', 420, doc.y + MARGIN, { width: 130, continued: true })
      .font('bold')
      .text(format(dates.print, 'DD/MM/YYYY'), { align: 'right' })
      .font('regular')
    doc
      .text('Date de fin de mission : ', 392, doc.y, { width: 158, continued: true })
      .font('bold')
      .text(format(dates.end, 'DD/MM/YYYY'), { align: 'right' })
      .font('regular')

    y = doc.y // eslint-disable-line prefer-destructuring
    y += 20
    x = MARGIN * 3
    const height = 20
    let width = MAX_WIDTH - (6 * MARGIN)

    // header
    doc.font('bold')
    doc.rect(x, y, width, height).fill('#7901c3')
    doc.rect(x, y, width, height).stroke('black')
    width = MAX_WIDTH - (6 * MARGIN)
    x = MARGIN * 3
    doc.fill('white')
    doc.rect(x, y, width, height).stroke()
    doc.text('Intitulé', x + MARGIN, y + 4, { width: width - (MARGIN * 2), align: 'left' })

    x += (MARGIN * 15.5)
    width = 30
    doc.rect(x, y, width, height).stroke()
    doc.text('Nb', x, y + 4, { width, align: 'center' })

    x += width
    width = 60
    doc.rect(x, y, width, height).stroke()
    doc.text('Prix u.', x, y + 4, { width: width - 5, align: 'right' })

    x += width
    width = 80
    doc.text('Total', x, y + 4, { width: width - 5, align: 'right' })
    doc.fill('black')
    doc.font('regular')

    // lines
    let total = 0
    lines.forEach(({
      title,
      nb,
      pricePerUnit,
    }) => {
      // reinit
      width = MAX_WIDTH - (6 * MARGIN)
      x = MARGIN * 3

      y += 20
      doc.fill('black')
      doc.rect(x, y, width, height).stroke()

      doc.text(title, x + MARGIN, y + 4, { width: width - (MARGIN * 2), align: 'left' })

      x += (MARGIN * 15.5)
      width = 30
      doc.rect(x, y, width, height).stroke()
      doc.text(nb, x, y + 4, { width, align: 'center' })

      x += width
      width = 60
      doc.rect(x, y, width, height).stroke()
      doc.text(FORMATTER.format(pricePerUnit), x, y + 4, { width: width - 5, align: 'right' })

      x += width
      width = 80
      const sub = nb * pricePerUnit
      total += sub
      doc.text(FORMATTER.format(sub), x, y + 4, { width: width - 5, align: 'right' })
    })

    // totals
    const totalTTC = FORMATTER.format(total * 1.2)
    const endLines = [
      {
        bold: true,
        label: 'Total HT',
        value: FORMATTER.format(total),
      },
      {
        label: 'Taux TVA',
        value: '20%',
      },
      {
        label: 'TVA',
        value: FORMATTER.format(total * 0.2),
      },
      {
        bold: true,
        label: 'Total TTC',
        value: totalTTC,
        backgroundColor: '#426cfa',
        color: 'white',
      },
    ]

    // draw ending lines
    endLines.forEach(({
      bold,
      label,
      value,
      color = 'black',
      backgroundColor = 'white',
    }) => {
      doc.font('regular')
      if (bold) doc.font('bold')

      y += 20
      x = (MARGIN * 15.5) + 30 + 60
      doc.rect(x, y, 152, height).fill(backgroundColor)
      doc.rect(x, y, 60, height).stroke()
      doc.rect(x, y, 152, height).stroke()
      doc.fill(color)

      width = 60
      doc.text(label, x, y + 4, { width: width - 5, align: 'right' })

      x += width
      width = 80
      doc.text(value, x, y + 4, { width: width - 5, align: 'right' })
    })

    if (timetable && timetable.length > 0) {
      doc.fill('black')
      y = doc.y + MARGIN
      x = (MARGIN * 15.5) + 30 + 42
      doc.text('Échéancier :', x, y)

      // header
      doc.font('bold')
      y = doc.y // eslint-disable-line prefer-destructuring
      x = (MARGIN * 15.5) + 30 + 40
      width = 82
      doc.rect(x, y, width, height).fill('#7901c3')
      doc.rect(x, y, width, height).stroke()
      doc.fill('white')
      doc.text('Date d\'échance', x, y + 4, { width, align: 'center' })

      x += width
      width = 90
      doc.rect(x, y, width, height).fill('#7901c3')
      doc.rect(x, y, width, height).stroke()
      doc.fill('white')
      doc.text('Montant TTC', x, y + 4, { width: width - 15, align: 'right' })

      // timetable
      doc.fill('black')
      doc.font('regular')
      timetable.forEach((time) => {
        x = (MARGIN * 15.5) + 30 + 40
        y += 20
        width = 82
        doc.rect(x, y, width, height).stroke()
        doc.text(format(time.date, 'DD/MM/YYYY'), x, y + 4, { width: width - 5, align: 'right' })

        x += width
        width = 90
        doc.rect(x, y, width, height).stroke()
        doc.text(FORMATTER.format(time.price * 1.2), x, y + 4, { width: width - 15, align: 'right' })
      })

      doc.fill('black')
      doc.fontSize(10)
      doc
        .font('regular')
        .text('Merci de bien vouloir nous payer chacune des sommes décrites dans l\'échéancier dans les ', MARGIN * 2, doc.y + (MARGIN * 2), { continued: true, align: 'justify' })
        .font('bold')
        .text('10 jours ouvrés ', { continued: true })
        .font('regular')
        .text('suivant ', { continued: true })
        .font('bold')
        .text('chaque date d\'échéance', { continued: true })
        .font('regular')
        .text('.')
    } else {
      doc.fill('black')
      doc.fontSize(10)
      doc
        .font('regular')
        .text('Merci de bien vouloir nous payer la somme de ', MARGIN * 2, doc.y + (MARGIN * 2), { continued: true })
        .font('bold')
        .text(totalTTC, { continued: true })
        .text('  TTC', { continued: true })
        .font('regular')
        .text(' sous ', { continued: true })
        .font('bold')
        .text('10 jours ouvrés', { continued: true })
        .font('regular')
        .text('.')
    }

    // IBAN / BIC
    y = MAX_HEIGHT - 95 - (height * 4)
    x = MARGIN * 3
    width = MAX_WIDTH - (6 * MARGIN)

    doc.font('bold')
    doc.rect(x, y, width, height).fill('#a2a2a2').stroke('black')

    doc.fill('white')
    doc.rect(x, y, width, height).stroke()
    doc.text('IBAN', x + MARGIN, y + 4, { width: width - (MARGIN * 2), align: 'left' })

    x += 360
    width = 120
    doc.rect(x, y, width + 12, height).stroke('black')
    doc.text('BIC', x, y + 4, { width: width - 5, align: 'right' })

    y += MARGIN
    x = MARGIN * 3
    doc.fill('black')
    doc.font('regular')
    width = MAX_WIDTH - (6 * MARGIN)
    doc.rect(x, y, width, height).stroke()
    doc.text(`${process.env.BANK_IBAN}`, x + MARGIN, y + 4, { width: width - (MARGIN * 2), align: 'left' })

    x += 360
    width = 120
    doc.rect(x, y, width + 12, height).stroke('black')
    doc.text(`${process.env.BANK_BIC}`, x, y + 4, { width: width - 5, align: 'right' })


    // CGV
    doc.fontSize(6)
    doc.text(
      'CGV :',
      MARGIN,
      MAX_HEIGHT - 95,
    )
    doc.text(
      ' - pénalités de retard : 3 fois le taux d’intérêt légal majorées d’une indemnité forfaitaire de 40 € pour fais de recouvrement. Si les frais de recouvrement réellement engagés sont supérieurs au montant forfaitaire de 40 €, une indemnisation complémentaire sur justification peut être demandée.', // eslint-disable-line max-len
      MARGIN * 2,
      doc.y,
      { width: MAX_WIDTH - (4 * MARGIN), align: 'justify' },
    )

    doc.end()
  }, 0)

  return doc
}
