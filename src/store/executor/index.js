// 执行器状态管理
export default {
  namespaced: true,
  state: {
    methodList: [],
    shutdownList: [],
  },
  actions: {},
  mutations: {
    /* 触发功能模块 */
    addMethod(state, method) {
      state.methodList.push(method);
    },
    resetMethodList(state) {
      state.methodList = [];
    },

    /* 关闭功能模块 */
    addShutdown(state, method) {
      state.shutdownList.push(method);
    },
    resetShutdownList(state) {
      state.shutdownList = [];
    },
  },
  getters: {},
};
