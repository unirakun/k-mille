import parse from 'date-fns/parse'
import { container } from 'ui-hocs'
import Component from './invoice'
import listeners from './invoice.listeners'

const screenName = 'create'

const loader = 'id'

const mapStore = store => ({
  ok: store.ui.ok.get(),
  id: store.ui.id.get(),
  lines: store.ui.lines.getKeys(),
  timetable: store.ui.timetable.getKeys(),
  addLine: (values) => { store.ui.lines.add(values) },
  addTimetableLine: ({ date, price }) => { store.ui.timetable.add({ price, date: parse(date).getTime() }) },
  setClient: (values) => { store.ui.client.set(values) },
  setDates: (values) => { store.ui.dates.set({ end: parse(values.end).getTime(), print: Date.now() }) },
  setId: (values) => { store.ui.id.set(values.id) },
  getPDF: () => { store.dispatch('@@ui/GET_PDF') },
})

export default container({
  screenName,
  mapStore,
  listeners,
  loader,
})(Component)
