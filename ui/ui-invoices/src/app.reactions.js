export const login = (action, store, { window }) => {
  window.document.location.assign('/api/auth')
}

export const init = (action, store, drivers) => {
  const regex = /^ ?profile=/
  const { window, http } = drivers

  // http
  http.setCredentials('include')

  // auth
  const cookie = window.document.cookie.split(';').find(d => regex.test(d))
  if (!cookie) {
    login(action, store, drivers)
    return
  }

  // profile
  const profile = JSON.parse(cookie.replace(regex, ''))
  store.data.profile.set(profile)
}
