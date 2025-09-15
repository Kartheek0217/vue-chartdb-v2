<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="800"
  >
    <v-card>
      <v-card-title>Import JSON</v-card-title>
      <v-card-text>
        <v-textarea v-model="text" label="Paste schema JSON here" rows="12" variant="outlined" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="$emit('update:modelValue', false)">Cancel</v-btn>
        <v-btn color="primary" @click="submit" :disabled="!text">Import</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'import'])
const text = ref('')
function submit() {
  try {
    emit('import', JSON.parse(text.value))
    emit('update:modelValue', false)
  } catch {
    /* show error */
  }
}
</script>
