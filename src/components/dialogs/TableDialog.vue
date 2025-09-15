<template>
  <v-dialog v-model="model" max-width="700">
    <v-card>
      <v-card-title>Edit Table</v-card-title>
      <v-card-text>
        <v-text-field v-model="local.name" label="Table Name" />
        <v-text-field v-model="local.schema" label="Schema" />
        <div class="columns-editor">
          <div class="column-row" v-for="(c, idx) in local.columns" :key="idx">
            <v-text-field v-model="c.name" label="Name" dense />
            <v-text-field v-model="c.type" label="Type" dense />
            <v-checkbox v-model="c.primaryKey" label="PK" />
            <v-checkbox v-model="c.nullable" label="Nullable" />
            <v-btn icon @click="removeColumn(idx)" variant="text">Remove</v-btn>
          </div>
          <v-btn color="secondary" variant="outlined" @click="addColumn">Add Column</v-btn>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="close">Cancel</v-btn>
        <v-btn variant="text" color="error" @click="confirmDelete">Delete</v-btn>
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ modelValue: Boolean, table: Object })
const emit = defineEmits(['update:modelValue', 'save'])
const model = ref(props.modelValue)
const local = ref({ name: '', schema: 'public', columns: [] })
const error = ref('')

watch(
  () => props.modelValue,
  (v) => (model.value = v),
)
watch(model, (v) => emit('update:modelValue', v))
watch(
  () => props.table,
  (t) => {
    if (t) {
      local.value = { name: t.data.name, schema: t.data.schema || 'public', columns: JSON.parse(JSON.stringify(t.data.columns || [])) }
    }
  },
  { immediate: true },
)

function close() {
  model.value = false
  error.value = ''
}

function save() {
  // validate columns
  try {
    const cols = (local.value.columns || []).map((c) => ({
      name: String(c.name || '').trim(),
      type: String(c.type || '').trim() || 'TEXT',
      primaryKey: !!c.primaryKey,
      nullable: !!c.nullable,
    }))
    if (cols.some((c) => !c.name)) {
      error.value = 'All columns must have a name.'
      return
    }
    emit('save', { name: local.value.name, schema: local.value.schema, columns: cols })
    model.value = false
  } catch (e) {
    error.value = 'Failed to save columns.'
    console.error(e)
  }
}

function confirmDelete() {
  if (!props.table) return
  // emit delete event with table id
  emit('delete', props.table.id)
  model.value = false
}

function addColumn() {
  local.value.columns.push({ name: '', type: 'TEXT', primaryKey: false, nullable: true })
}

function removeColumn(idx) {
  local.value.columns.splice(idx, 1)
}
</script>

<style scoped>
.error {
  color: var(--v-theme-error);
  margin-top: 8px;
}
</style>
