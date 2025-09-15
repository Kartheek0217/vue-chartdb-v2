<template>
  <BaseEdge :id="id" :style="edgeStyle" :path="path" :marker-end="markerEnd" :marker-start="markerStart" />
</template>

<script setup>
import { BaseEdge } from '@vue-flow/core'
import { computed } from 'vue'
const props = defineProps({
  id: String,
  data: Object,
  selected: Boolean,
  path: String,
  markerEnd: String,
  markerStart: String,
})
const edgeStyle = computed(() => ({
  stroke: props.selected ? '#58A6FF' : '#6B7280',
  strokeWidth: props.selected ? 3 : 2,
}))
</script>
