<template>
  <div class="diagram-canvas">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :default-viewport="viewport"
      :min-zoom="0.1"
      :max-zoom="3"
      fit-view-on-init
      @viewport-change="onViewportChange"
      @pane-click="onPaneClick"
      @connect="onConnect"
      @node-click="onNodeClick"
      @edge-click="onEdgeClick"
    >
      <Background variant="dots" :size="1" gap="20" />
      <Controls :show-zoom="true" :show-fit-view="true" :show-interactive="true" />
      <MiniMap :node-stroke-width="2" />
      <template #node-table="{ id, data, selected }">
        <TableNode :id="id" :data="data" :selected="selected" />
      </template>
      <template #edge-relationship="edgeProps">
        <RelationshipEdge v-bind="edgeProps" />
      </template>
    </VueFlow>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

import { useDiagramStore } from '@/stores/diagram'
import TableNode from '@/components/nodes/TableNode.vue'
import RelationshipEdge from '@/components/edges/RelationshipEdge.vue'

const store = useDiagramStore()
const nodes = computed({
  get: () => store.nodes,
  set: (v) => (store.nodes = v),
})
const edges = computed({
  get: () => store.edges,
  set: (v) => (store.edges = v),
})
const viewport = computed(() => store.viewport)

function onViewportChange(v) {
  store.setViewport(v)
}
function onPaneClick() {
  store.clearSelection()
}
function onConnect({ source, target }) {
  store.addRelationship(source, target)
}
function onNodeClick({ node }) {
  store.setSelection([node.id])
}
function onEdgeClick({ edge }) {
  store.setSelection([edge.id])
}
</script>

<style scoped>
.diagram-canvas {
  width: 100%;
  height: 100%;
}
</style>
