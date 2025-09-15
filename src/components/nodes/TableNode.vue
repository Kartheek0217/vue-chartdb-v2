<template>
  <div class="table-node">
    <div class="table-header">
      <div class="header-left">{{ data.name }}</div>
      <div class="header-actions">
        <button class="icon-btn" @click.stop="$emit('edit', id)">✏️</button>
        <button class="icon-btn" @click.stop="$emit('delete', id)">🗑️</button>
      </div>
    </div>
    <div class="table-fields">
      <div class="table-field" v-for="(c, i) in data.columns" :key="i">
        <div class="col-left">
          <span class="pk" v-if="c.primaryKey">🔑</span>
          <strong>{{ c.name }}</strong>
        </div>
        <div class="col-right">{{ c.type }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ id: String, data: Object, selected: Boolean })
</script>

<style scoped>
.table-node {
  display: inline-block;
  min-width: 220px;
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

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 6px;
}

.icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--v-theme-on-primary);
  font-size: 14px;
}

.table-fields {
  padding: 6px 0;
}

.table-field {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-top: 1px solid var(--v-theme-outline);
  align-items: center;
}

.col-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.col-right {
  color: var(--v-theme-on-surface);
  opacity: 0.9;
}

.pk {
  font-size: 14px;
}
</style>
