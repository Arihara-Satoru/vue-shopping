import storage from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: storage.getInfo()
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
      storage.setInfo(payload)
    }
  },
  actions: {},
  getters: {}
}
