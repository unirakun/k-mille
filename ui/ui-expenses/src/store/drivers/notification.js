const DELAY = 5000
const DELAY_BEFORE_REMOVE = 1000
const DELAY_BEFORE_PRINT = 100

const remove = store => (id) => {
  if (id) store.ui.notifications.remove(id)
  else store.ui.notifications.reset()
}

const print = store => printed => id => store.ui.notifications.update({ id, printed })

const close = store => (id) => {
  print(store)(false)(id)
  setTimeout(() => remove(store)(id), DELAY_BEFORE_REMOVE)
}

const notify = store => level => (message) => {
  const id = new Date().getTime()
  store.ui.notifications.addOrUpdate({
    id,
    level,
    message,
    printed: false,
  })
  setTimeout(() => print(store)(true)(id), DELAY_BEFORE_PRINT)
  setTimeout(() => close(store)(id), DELAY)
}

export default ({
  getDriver: store => ({
    // selectors
    get: store.ui.notifications.get,
    getKeys: store.ui.notifications.getKeys,
    // notify
    notify: notify(store),
    info: notify(store)('info'),
    success: notify(store)('success'),
    warning: notify(store)('warning'),
    error: notify(store)('error'),
    // close action
    close: close(store),
  }),
})
