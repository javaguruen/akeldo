<script setup>
defineProps({
  roleOptions:      { type: Array,   required: true },
  innsenderOptions: { type: Array,   required: true },
  sendeOptions:     { type: Array,   required: true },
  mottakOptions:    { type: Array,   required: true },
  roleFilter:       { type: String,  required: true },
  innsenderFilter:  { type: String,  required: true },
  sendeFilter:      { type: String,  required: true },
  mottakFilter:     { type: String,  required: true },
  searchText:       { type: String,  required: true },
  hasActiveFilters: { type: Boolean, required: true },
})

const emit = defineEmits(['search', 'role', 'innsender', 'sende', 'mottak', 'clear'])
</script>

<template>
  <div class="filter-bar">
    <div class="filter-row">
      <div class="filter-group">
        <label for="search">Søk</label>
        <input
          id="search"
          type="text"
          placeholder="Søk etter navn eller org.nr…"
          :value="searchText"
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

      <div class="filter-group filter-group--clear">
        <label>&nbsp;</label>
        <button
          class="clear-btn"
          :disabled="!hasActiveFilters"
          @click="emit('clear')"
        >Tøm filtre</button>
      </div>
    </div>

    <div class="filter-row">
      <div class="filter-group">
        <label for="filter-sende">Kan sende</label>
        <select
          id="filter-sende"
          :value="sendeFilter"
          @change="emit('sende', $event.target.value)"
        >
          <option value="">Alle meldingstyper</option>
          <option v-for="m in sendeOptions" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="filter-mottak">Kan motta</label>
        <select
          id="filter-mottak"
          :value="mottakFilter"
          @change="emit('mottak', $event.target.value)"
        >
          <option value="">Alle meldingstyper</option>
          <option v-for="m in mottakOptions" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 160px;
}

.filter-group--clear {
  flex: 0 0 auto;
  min-width: unset;
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

.clear-btn {
  padding: 0.4rem 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  background: #fff;
  color: #444;
  cursor: pointer;
  white-space: nowrap;
}

.clear-btn:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #aaa;
}

.clear-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>
