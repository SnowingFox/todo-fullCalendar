import { save } from '../assets/store'
import { STORE_KEY } from '../components/use-event'
const mutations = {
  addEvent(state, event) {
    state.events.push(event)
  },
  setEvent(state, events) {
    save(STORE_KEY, events)
  },
}
export default mutations
