<template>
  <FullCalendar :options="calendarOptions" />
</template>
<script setup>
import { computed } from 'vue'
import mdui from 'mdui'
import * as types from './day-types'
import useEvent from './use-event'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useStore } from 'vuex'

const { addDayEvent, addWeekEvent, addMonthEvent, setCtxById } = useEvent()

const store = useStore()
const calendarOptions = computed(() => {
  return {
    ...configOptions(),
    ...eventOptions(),
  }
})
const events = computed(() => store.state.events)
function eventOptions() {
  return {
    eventClick: handlerEventClick,
    eventDrop: handlerEventDrop,
    select: handlerSelect,
    eventsSet: handlerEvent,
    events: events.value,
  }
}
function configOptions() {
  return {
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    initialView: 'dayGridMonth',
    locale: 'zh-cn', //中文设置

    eventTimeFormat: {
      // like '14:30:00'

      hour: '2-digit',

      minute: '2-digit',

      second: '2-digit',

      meridiem: false,

      hour12: false, //设置时间为24小时
    },
    events: [],
  }
}

function handlerSelect(payload) {
  const type = payload.view.type
  if (type === types.DAY) {
    mdui.prompt(
      '请安排一下今天的这个时间段想做些什么吧 (๑•̀ㅂ•́)و✧~',
      function (ctx) {
        addDayEvent(payload, ctx)
      }
    )
  }
  if (type === types.WEEK) {
    addWeekEvent(payload)
  }

  if (type === types.MONTH) {
    addMonthEvent(payload)
  }
}
function handlerEventClick(payload) {
  const type = payload.view.type
  console.log(payload)
  if (type === types.DAY) {
    mdui.prompt(
      ' 是不是觉得安排的不妥当要重新修改呀？( =•ω•= )m',
      function (ctx) {
        setCtxById(payload, ctx)
      }
    )
  }
  if (type === types.WEEK) {
    addWeekEvent(payload)
  }

  if (type === types.MONTH) {
    addMonthEvent(payload)
  }
}
function handlerEventDrop(payload) {}
function handlerEvent(events) {
  store.dispatch('setEvent', events)
}
</script>
<style lang="scss" scoped></style>
