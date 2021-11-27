export function addEvent({ commit }, event) {
  commit('addEvent', event)
}

export function setEvent({ commit }, events) {
  commit('setEvent', events)
}
