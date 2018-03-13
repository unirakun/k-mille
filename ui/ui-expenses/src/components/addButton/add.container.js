import { inject } from '@k-ramel/react'
import Component from './add'

export default inject(store => ({
  selectFile: () => {
    document.getElementById('file').click()
  },
  onFileSelected: () => {
    document.getElementById('fileSubmit').click()
  },
  onSubmit: (e) => {
    e.preventDefault()
    store.dispatch({ type: '@@ui/ON_SUBMIT', payload: e.target[0].files[0] })
  },

}))(Component)
