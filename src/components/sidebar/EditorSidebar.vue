<template>
  <div class="pa-3">
    <v-list-subheader>Tables</v-list-subheader>
    <v-list density="compact">
      <v-list-item v-for="n in nodes" :key="n.id" @click="$emit('select', n.id)">{{ n.data.name }}</v-list-item>
    </v-list>
    <v-list-subheader class="mt-4">Relationships</v-list-subheader>
    <v-list density="compact">
      <v-list-item v-for="e in edges" :key="e.id" @click="$emit('select', e.id)">{{ e.source }} -> {{ e.target
        }}</v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDiagramStore } from '@/stores/diagram'
const { nodes, edges } = storeToRefs(useDiagramStore())
</script>
