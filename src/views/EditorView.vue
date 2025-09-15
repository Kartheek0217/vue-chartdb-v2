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
    <TableDialog v-model="showTableDialog" :table="activeTable" @save="onSaveTable" @delete="onDeleteTable" />
  </v-layout>
</template>

<script setup>
import { watch, ref } from 'vue'
import MainToolbar from '@/components/toolbar/MainToolbar.vue'
import EditorSidebar from '@/components/sidebar/EditorSidebar.vue'
import DiagramCanvas from '@/components/canvas/DiagramCanvas.vue'
import TableDialog from '@/components/dialogs/TableDialog.vue'
import { useDiagramStore } from '@/stores/diagram'

const store = useDiagramStore()
// watch for last added node and open dialog
watch(
  () => store.nodes.length,
  (n, o) => {
    if (n > o) {
      const t = store.nodes[store.nodes.length - 1]
      activeTable.value = t
      showTableDialog.value = true
    }
  },
)



const showTableDialog = ref(false)
const activeTable = ref(null)
function addTable() {
  store.addTable({
    name: `table_${store.nodes.length + 1}`,
    columns: [{ name: 'id', type: 'INTEGER', primaryKey: true, nullable: false }],
  })
}
function onSelect(id) {
  store.setSelection([id])
}

function onSaveTable(data) {
  if (!activeTable.value) return
  store.updateTable(activeTable.value.id, data)
  store.clearEditingTable()
}

function onDeleteTable(id) {
  store.deleteTable(id)
  store.clearEditingTable()
}

// open dialog when store.editingTable changes
watch(
  () => store.editingTable,
  (id) => {
    if (id) {
      activeTable.value = store.getTable(id)
      showTableDialog.value = true
    } else {
      showTableDialog.value = false
      activeTable.value = null
    }
  },
)
</script>
