const INFO_KEY = 'hm-shopping-info'

export default {
  getInfo () {
    const defaultInfo = {
      token: '',
      userId: ''
    }
    const result = localStorage.getItem(INFO_KEY)
    return result ? JSON.parse(result) : defaultInfo
  },
  setInfo (info) {
    localStorage.setItem(INFO_KEY, JSON.stringify(info))
  },
  removeInfo () {
    localStorage.removeItem(INFO_KEY)
  }
}
