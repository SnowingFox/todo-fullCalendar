import { useStore } from 'vuex'
import { computed } from 'vue'

export const STORE_KEY = '__CALENDAR__'
export default function useEvent() {
  const store = useStore()
  const events = computed(() => store.state.events)
  function addDayEvent(payload, ctx) {
    const event = {
      start: payload.start,
      end: payload.end,
      title: ctx,
    }

    addEvents(event)
  }

  function addEvents(event) {
    store.dispatch('addEvent', event)
  }
  function setEventCtx(payload, ctx) {
    payload.event.setProp('title', ctx)
  }

  return {
    addDayEvent,
    setEventCtx,
  }
}

export function deleteEvent(payload) {
  payload.event.remove()
}
