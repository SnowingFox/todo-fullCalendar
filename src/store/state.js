import { load } from '../assets/store'
import { STORE_KEY } from '../components/use-event'

const state = {
  events: load(STORE_KEY),
}

export default state
