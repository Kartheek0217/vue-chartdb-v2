<template>
  <v-app-bar app elevation="2">
    <v-app-bar-title>ChartDB Vue</v-app-bar-title>
    <v-spacer />
    <v-btn variant="elevated" color="success" @click="$emit('add-table')">Add Table</v-btn>
    <v-btn variant="text" @click="showImport = true">Import</v-btn>
    <v-btn variant="text" @click="exportJson">Export JSON</v-btn>
    <ImportDialog v-model="showImport" @import="onImport" />
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useDiagramStore } from '@/stores/diagram'
import ImportDialog from '@/components/dialogs/ImportDialog.vue'
const store = useDiagramStore()
const showImport = ref(false)
function onImport(data) {
  store.importFromJson(data)
}
function exportJson() {
  const blob = new Blob([JSON.stringify(store.exportToJson(), null, 2)], {
    type: 'application/json',
  })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'diagram.json'
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>
