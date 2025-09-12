export function logout() {
  localStorage.setItem('token', '')
  window.location.href = `${window.location.origin}/#/login`
}
