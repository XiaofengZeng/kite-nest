// 执行器状态管理
export default {
  namespaced: true,
  state: {
    methodList: [],
  },
  actions: {},
  mutations: {
    addMethod(state, method) {
      state.methodList.push(method);
    },
    resetMethodList(state) {
      state.methodList = [];
    },
  },
  getters: {},
};
