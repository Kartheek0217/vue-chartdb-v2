import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDiagramStore = defineStore('diagram', () => {
  const nodes = ref([])
  const edges = ref([])
  const viewport = ref({ x: 0, y: 0, zoom: 1 })
  const selected = ref([])

  const selectedNodes = computed(() => nodes.value.filter((n) => selected.value.includes(n.id)))
  const selectedEdges = computed(() => edges.value.filter((e) => selected.value.includes(e.id)))

  function addTable({
    name = 'New Table',
    columns = [],
    position = { x: 200, y: 200 },
    schema = 'public',
  } = {}) {
    const id = `t_${Math.random().toString(36).slice(2)}`
    nodes.value.push({ id, type: 'table', position, data: { name, columns, schema } })
    return id
  }

  function addRelationship(source, target, data = { type: 'one-to-many' }) {
    const id = `e_${Math.random().toString(36).slice(2)}`
    edges.value.push({ id, source, target, type: 'relationship', data })
    return id
  }

  function setViewport(v) {
    viewport.value = { ...v }
  }
  function setSelection(ids = []) {
    selected.value = Array.isArray(ids) ? ids : [ids]
  }
  function clearSelection() {
    selected.value = []
  }
  function deleteTable(id) {
    nodes.value = nodes.value.filter((n) => n.id !== id)
    edges.value = edges.value.filter((e) => e.source !== id && e.target !== id)
    selected.value = selected.value.filter((x) => x !== id)
  }
  function deleteRelationship(id) {
    edges.value = edges.value.filter((e) => e.id !== id)
    selected.value = selected.value.filter((x) => x !== id)
  }

  function importFromJson(json) {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    nodes.value = []
    edges.value = []
    ;(data.tables || []).forEach((t, i) =>
      addTable({
        name: t.name,
        schema: t.schema || 'public',
        columns: t.columns || [],
        position: { x: 200 + (i % 3) * 300, y: 120 + Math.floor(i / 3) * 220 },
      }),
    )
    ;(data.relationships || []).forEach((r) => {
      const s = nodes.value.find((n) => n.data.name === r.source_table)
      const t = nodes.value.find((n) => n.data.name === r.target_table)
      if (s && t) addRelationship(s.id, t.id, { type: r.type || 'one-to-many' })
    })
  }

  function exportToJson() {
    return {
      tables: nodes.value.map((n) => ({
        name: n.data.name,
        schema: n.data.schema,
        columns: n.data.columns,
      })),
      relationships: edges.value.map((e) => {
        const s = nodes.value.find((n) => n.id === e.source)
        const t = nodes.value.find((n) => n.id === e.target)
        return {
          source_table: s?.data.name,
          target_table: t?.data.name,
          type: e.data?.type || 'one-to-many',
        }
      }),
    }
  }

  return {
    nodes,
    edges,
    viewport,
    selected,
    selectedNodes,
    selectedEdges,
    addTable,
    addRelationship,
    setViewport,
    setSelection,
    clearSelection,
    deleteTable,
    deleteRelationship,
    importFromJson,
    exportToJson,
  }
})
