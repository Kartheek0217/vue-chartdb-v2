<template>
  <v-layout>
    <MainToolbar @add-table="addTable" />
    <v-navigation-drawer permanent width="280">
      <EditorSidebar @select="onSelect" />
    </v-navigation-drawer>
    <v-main>
      <div style="height: calc(100vh - 64px)">
        <DiagramCanvas />
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import MainToolbar from '@/components/toolbar/MainToolbar.vue'
import EditorSidebar from '@/components/sidebar/EditorSidebar.vue'
import DiagramCanvas from '@/components/canvas/DiagramCanvas.vue'
import { useDiagramStore } from '@/stores/diagram'
const store = useDiagramStore()
function addTable() {
  store.addTable({
    name: `table_${store.nodes.length + 1}`,
    columns: [{ name: 'id', type: 'INTEGER', primaryKey: true, nullable: false }],
  })
}
function onSelect(id) {
  store.setSelection([id])
}
</script>
