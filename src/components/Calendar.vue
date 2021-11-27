<template>
  <FullCalendar :options="calendarOptions" />
</template>
<script setup>
import { computed, ref } from 'vue'
import mdui from 'mdui'
import * as types from './day-types'
import useEvent, { deleteEvent } from './use-event'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useStore } from 'vuex'

const { addDayEvent, setEventCtx } = useEvent()

const store = useStore()
const title = ref('')
const content = ref('')
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
  }
}

function handlerSelect(payload) {
  mdui.prompt(
    '请安排一下今天的这个时间段想做些什么吧 (๑•̀ㅂ•́)و✧~',
    '重新计划',
    function (ctx) {
      addDayEvent(payload, ctx)
    },
    function () {},
    {
      type: 'textarea',
      confirmText: '确定',
      cancelText: '取消',
    }
  )
}

function handlerEventClick(payload) {
  mdui.prompt(
    '是不是要重新安排一下呢？φ(゜▽゜*)♪',
    '重新安排',
    function (value) {
      setEventCtx(payload, value)
    },
    function () {
      deleteEvent(payload)
    },
    {
      defaultValue: payload.event._def.title,
      cancelText: '删除',
      confirmText: '确定',
    }
  )
}
function handlerEventDrop(payload) {}
function handlerEvent(events) {
  store.dispatch('setEvent', events)
}
</script>
<style lang="scss" scoped></style>
