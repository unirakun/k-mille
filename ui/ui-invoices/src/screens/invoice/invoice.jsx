import React from 'react'
import PropTypes from 'prop-types'
import { Form, Text } from 'react-form'
import { Link } from 'redux-little-router'
import Line from './line'
import Timetable from './timetable'
import Total from './total'

const Main = ({ ok, lines, timetable, addLine, addTimetableLine, setId, setClient, setDates, getPDF, id }) => {
  if (ok) return 'OK !'

  return (
    <div>
      <Link href="/">list</Link>
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
          {lines.map(id => <Line key={id} id={id} />)}
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
          {timetable.map(id => <Timetable key={id} id={id} />)}
        </tbody>
      </table>

      <button onClick={getPDF}>get pdf</button>
    </div>
  )
}

Main.propTypes = {
  lines: PropTypes.array,
}

Main.defaultProps = {
  lines: [],
}

export default Main
