<script setup>
defineProps({
  roleOptions:     { type: Array, required: true },
  innsenderOptions:{ type: Array, required: true },
  roleFilter:      { type: String, required: true },
  innsenderFilter: { type: String, required: true },
})

const emit = defineEmits(['search', 'role', 'innsender'])
</script>

<template>
  <div class="filter-bar">
    <div class="filter-group">
      <label for="search">Søk</label>
      <input
        id="search"
        type="text"
        placeholder="Søk etter navn…"
        @input="emit('search', $event.target.value)"
      />
    </div>

    <div class="filter-group">
      <label for="filter-rolle">Rolle</label>
      <select
        id="filter-rolle"
        :value="roleFilter"
        @change="emit('role', $event.target.value)"
      >
        <option value="">Alle</option>
        <option v-for="r in roleOptions" :key="r" :value="r">{{ r }}</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="filter-innsender">Innsender</label>
      <select
        id="filter-innsender"
        :value="innsenderFilter"
        @change="emit('innsender', $event.target.value)"
      >
        <option value="">Alle</option>
        <option v-for="i in innsenderOptions" :key="i" :value="i">{{ i }}</option>
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
