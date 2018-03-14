import { when } from 'k-ramel'
import pica from 'pica/dist/pica'

export default [
  when('@@http/IMAGES>POST>ENDED')(({ payload }, store) => {
    store.data.prices.set(payload.prices)
    store.ui.header.set({ title: 'ajout' })
    store.data.fileId.set(payload.fileId)
  }),
  when('@@ui/ON_SUBMIT')(({ payload }, store, { window, http }) => {
    // add image to a <img in DOM (the source of the transformation)
    const reader = new window.FileReader()
    reader.onload = (e) => {
      const img = window.document.getElementById('source')
      img.src = e.target.result

      window.requestAnimationFrame(() => {
        img.width = img.clientWidth
        img.height = img.clientHeight

        let targetWidth = img.width * 0.30
        if (targetWidth < 1000) targetWidth = 1000
        const targetHeight = (img.height / img.width) * targetWidth

        const canvas = window.document.getElementById('resize')
        canvas.width = targetWidth
        canvas.height = targetHeight

        const picaRunner = pica()
        picaRunner.resize(img, canvas)
          .then(result => picaRunner.toBlob(result, 'image/jpeg', 0.50))
          .then((blob) => {
            const reader2 = new window.FileReader()
            reader2.onerror = (readerE) => { store.dispatch({ type: '@@file/ON_ERROR', payload: readerE }) }
            reader2.onload = async (readerE) => {
              http('IMAGES').post('/api/images', {
                image: readerE.target.result.replace(/data:.*;base64,/, ''),
                user: 'fabien',
              }, { credentials: 'include' })
            }
            reader2.readAsDataURL(blob)
          })
      })
    }
    reader.readAsDataURL(payload)
  }),
  when('@@ui/ON_SEND')(() => {
    console.log('send files')
  }),
]