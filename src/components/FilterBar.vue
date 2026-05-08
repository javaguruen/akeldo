<script setup>
defineProps({
  filterKeys: { type: Array, required: true },
  filterOptions: { type: Object, required: true },
  activeFilters: { type: Object, required: true },
})

const emit = defineEmits(['search', 'filter'])

function onInput(e) {
  emit('search', e.target.value)
}

function onSelect(key, e) {
  emit('filter', { key, value: e.target.value })
}

function label(key) {
  return key.charAt(0).toUpperCase() + key.slice(1)
}
</script>

<template>
  <div class="filter-bar">
    <div class="filter-group">
      <label for="search">Search</label>
      <input
        id="search"
        type="text"
        placeholder="Search by name…"
        @input="onInput"
      />
    </div>

    <div v-for="key in filterKeys" :key="key" class="filter-group">
      <label :for="`filter-${key}`">{{ label(key) }}</label>
      <select
        :id="`filter-${key}`"
        :value="activeFilters[key]"
        @change="onSelect(key, $event)"
      >
        <option value="">All</option>
        <option v-for="opt in filterOptions[key]" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 160px;
}

label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: #555; }

input, select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  background: #fff;
}

input:focus, select:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 1px;
}
</style>
