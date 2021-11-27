<template>
  <div class="mdui-dialog" id="exampleDialog">
    <div class="mdui-dialog-title">{{ options.title }}</div>
    <div class="mdui-dialog-content">{{ options.content }}</div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-confirm @click="confirm">
        确定
      </button>
      <button class="mdui-btn mdui-ripple" mdui-dialog-close @click="cancel">
        取消
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Object,
    default: {},
  },
})
const emits = defineEmits(['confirm', 'cancel'])

function confirm() {
  emits('confirm')
}

function cancel() {
  emits('cancel')
}
</script>

<style lang="scss" scoped></style>
