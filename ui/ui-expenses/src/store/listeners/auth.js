export const login = (action, store, { window }) => {
  window.document.location.assign('/api/auth')
}

export const init = (action, store, drivers) => {
  const { http, window } = drivers
  const regex = /^ ?profile=/

  const cookie = window.document.cookie.split(';').find(d => regex.test(d))
  if (!cookie) {
    login(action, store, drivers)
    return
  }

  const profile = JSON.parse(cookie.replace(regex, ''))

  store.data.profile.set(profile)
  http.setAuthorization(`Bearer ${profile.tokens.access_token}`)
}
