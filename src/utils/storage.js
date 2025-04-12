const INFO_KEY = 'hm-shopping-info'

export default {
  // 储存个人信息token
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
    console.log('removeInfo')
    localStorage.removeItem(INFO_KEY)
  }
}
// 储存搜索记录
export const getSearchHistory = () => {
  const defaultHistory = []
  const result = localStorage.getItem('search-history')
  return result ? JSON.parse(result) : defaultHistory
}
export const setSearchHistory = (history) => {
  localStorage.setItem('search-history', JSON.stringify(history))
}
