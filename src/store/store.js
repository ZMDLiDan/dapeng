import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {}
// });
export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
