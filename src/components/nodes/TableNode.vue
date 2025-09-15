<template>
  <div class="table-node">
    <div class="table-header">{{ data.name }}</div>
    <div class="table-fields">
      <div class="table-field" v-for="(c, i) in data.columns" :key="i">
        <strong>{{ c.name }}</strong>
        <span>{{ c.type }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ id: String, data: Object, selected: Boolean })
</script>

<style scoped>
.table-node {
  min-width: 200px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--v-theme-surface);
  border: 1px solid var(--v-theme-outline);
}

.table-header {
  background: var(--v-theme-primary);
  color: var(--v-theme-on-primary);
  padding: 8px 12px;
  font-weight: 600;
}

.table-field {
  display: flex;
  justify-content: space-between;
  padding: 6px 12px;
  border-top: 1px solid var(--v-theme-outline);
}
</style>
