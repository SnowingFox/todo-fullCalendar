import { useStore } from 'vuex'
import { computed } from 'vue'

export const STORE_KEY = '__CALENDAR__'
export default function useEvent() {
  const store = useStore()
  const events = computed(() => store.state.events)
  function addDayEvent(payload, ctx) {
    const id = events.value.length
    const event = {
      id,
      start: payload.start,
      end: payload.end,
      title: ctx,
    }

    addEvents(event)
  }

  function addWeekEvent(payload) {}

  function addMonthEvent(payload) {}

  function addEvents(event) {
    store.dispatch('addEvent', event)
  }
  function setEventCtx(payload, ctx) {
    payload.event._def.title = ctx
    console.log(payload.event._def.title)
  }

  return {
    addDayEvent,
    addWeekEvent,
    addMonthEvent,
    setEventCtx,
  }
}
