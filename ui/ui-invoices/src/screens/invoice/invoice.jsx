import React from 'react'
import PropTypes from 'prop-types'
import { Form, Text } from 'react-form'
import { Link } from '@k-redux-router/react-k-ramel'
import { component } from 'ui-hocs'
import Line from './line'
import Timetable from './timetable'
import Total from './total'

const Invoice = ({
  ok,
  id,
  lines,
  timetable,
  addLine,
  addTimetableLine,
  setId,
  setClient,
  setDates,
  getPDF,
}) => {
  if (ok) return 'OK !'

  return (
    <div>
      <Link code="list">list</Link>
      <h2>Id</h2>
      <Form onSubmit={setId} preventDefault defaultValues={{ id }}>
        {({ submitForm }) => (
          <form onSubmit={submitForm}>
            <Text field="id" placeholder="numéro" />
            <button type="submit">set</button>
          </form>
        )}
      </Form>
      <h2>Client</h2>
      <Form onSubmit={setClient} preventDefault>
        {({ submitForm }) => (
          <form onSubmit={submitForm}>
            <Text field="name" placeholder="name" />
            <Text field="city" placeholder="Code and city" />
            <Text field="address" placeholder="Address" />
            <Text field="timeToPay" placeholder="time to pay" />
            <button type="submit">set</button>
          </form>
        )}
      </Form>

      <h2>Dates</h2>
      <Form onSubmit={setDates} preventDefault>
        {({ submitForm }) => (
          <form onSubmit={submitForm}>
            <Text type="date" field="end" placeholder="end" />
            <button type="submit">set</button>
          </form>
        )}
      </Form>

      <h2>Lines</h2>
      <Form onSubmit={addLine} preventDefault>
        {({ submitForm }) => (
          <form onSubmit={submitForm}>
            <Text field="title" placeholder="title" />
            <Text field="nb" placeholder="number of units" />
            <Text field="pricePerUnit" placeholder="price per unit (without taxes)" />
            <button type="submit">add</button>
          </form>
        )}
      </Form>
      <table border="1">
        <thead>
          <tr><td>Title</td><td>number of units</td><td>price per unit</td><td>price</td></tr>
        </thead>
        <tbody>
          {lines.map(line => <Line key={line} id={line} />)}
          <Total />
        </tbody>
      </table>

      <h2>Timetable</h2>
      <Form onSubmit={addTimetableLine} preventDefault>
        {({ submitForm }) => (
          <form onSubmit={submitForm}>
            <Text field="date" type="date" placeholder="date" />
            <Text field="price" placeholder="price" />
            <button type="submit">add</button>
          </form>
        )}
      </Form>
      <table border="1">
        <thead>
          <tr><td>Date</td><td>Price</td></tr>
        </thead>
        <tbody>
          {timetable.map(time => <Timetable key={time} id={time} />)}
        </tbody>
      </table>

      <button onClick={getPDF}>get pdf</button>
    </div>
  )
}

Invoice.propTypes = {
  ok: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lines: PropTypes.array,
  timetable: PropTypes.array,
  addLine: PropTypes.func,
  addTimetableLine: PropTypes.func,
  setId: PropTypes.func,
  setClient: PropTypes.func,
  setDates: PropTypes.func,
  getPDF: PropTypes.func,
}

Invoice.defaultProps = {
  ok: false,
  id: undefined,
  lines: [],
  timetable: [],
  addLine: undefined,
  addTimetableLine: undefined,
  setId: undefined,
  setClient: undefined,
  setDates: undefined,
  getPDF: undefined,
}

export default component()(Invoice)
