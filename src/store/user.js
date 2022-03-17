export default {
  namespaced: true,
  state: {
    validated: false,
    userInfo: {
      name: '',
      expires: 0,
    },
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = Object.assign(state.userInfo, info);
    },
    changeValidateStatus(state, isPass) {
      state.validated = isPass;
    },
  },
  actions: {
    validateLogin(context, loginInfo) {
      const { commit } = context;
      // TODO: 接入后端 -> 单点验证
      if (loginInfo.userName === 'admin' && loginInfo.password === 'admin') {
        const info = {
          name: loginInfo.userName,
          // 有效期一天
          expires: new Date().getTime() + 24 * 3600 * 1000,
        };
        commit('setUserInfo', info);
        // 写入localStorage中
        localStorage.setItem('kn-token', JSON.stringify(info));
        if (loginInfo.remeberUser) {
          localStorage.setItem('loginUserName', loginInfo.userName);
        }
        commit('changeValidateStatus', true);
      }
    },
  },
  getters: {
    isValidated(store) {
      return store.validated;
    },
  },
};
