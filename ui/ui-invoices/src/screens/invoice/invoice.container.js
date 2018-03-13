import { compose } from 'recompose'
import { inject, listen } from '@k-ramel/react'
import parse from 'date-fns/parse'
import loader from 'hoc-react-loader'
import forRoute from 'hoc-little-router'
import Component from './invoice'
import listeners from './invoice.listeners'

const screenName = 'create'

export default compose(
  forRoute(screenName),
  inject(store => ({
    ok: store.ui.ok.get(),
    id: store.ui.id.get(),
    lines: store.ui.lines.getKeys(),
    timetable: store.ui.timetable.getKeys(),
    addLine: (values) => { store.ui.lines.add(values) },
    addTimetableLine: (values) => { store.ui.timetable.add(values) },
    setClient: (values) => { store.ui.client.set(values) },
    setDates: (values) => { store.ui.dates.set({ end: parse(values.end).getTime(), print: Date.now() }) },
    setId: (values) => { store.ui.id.set(values.id) },
    getPDF: () => { store.dispatch('@@ui/GET_PDF') },
  })),
  listen(listeners, screenName),
  loader({ print: props => !!props.id }),
)(Component)
