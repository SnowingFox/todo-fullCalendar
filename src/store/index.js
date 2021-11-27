import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actionos'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
