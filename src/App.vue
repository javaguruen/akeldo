<script setup>
import { ref, computed, onMounted } from 'vue'
import FilterBar from './components/FilterBar.vue'
import OrgCard from './components/OrgCard.vue'

const FILTER_KEYS = ['type', 'status', 'location']

const orgs = ref([])
const loading = ref(true)
const error = ref(null)

const searchText = ref('')
const activeFilters = ref(
  Object.fromEntries(FILTER_KEYS.map(k => [k, '']))
)

onMounted(async () => {
  try {
    const res = await fetch('/akeldo/organizations.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    orgs.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

const filterOptions = computed(() =>
  Object.fromEntries(
    FILTER_KEYS.map(key => [
      key,
      [...new Set(orgs.value.map(o => o[key]).filter(Boolean))].sort()
    ])
  )
)

const filteredOrgs = computed(() => {
  const search = searchText.value.trim().toLowerCase()
  return orgs.value.filter(org => {
    if (search && !org.name.toLowerCase().includes(search)) return false
    for (const key of FILTER_KEYS) {
      if (activeFilters.value[key] && org[key] !== activeFilters.value[key]) return false
    }
    return true
  })
})

function onSearch(value) {
  searchText.value = value
}

function onFilter({ key, value }) {
  activeFilters.value[key] = value
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Organizations</h1>
    </header>

    <FilterBar
      :filter-keys="FILTER_KEYS"
      :filter-options="filterOptions"
      :active-filters="activeFilters"
      @search="onSearch"
      @filter="onFilter"
    />

    <main class="org-list">
      <p v-if="loading" class="status-msg">Loading…</p>
      <p v-else-if="error" class="status-msg status-msg--error">Failed to load data: {{ error }}</p>
      <p v-else-if="filteredOrgs.length === 0" class="status-msg">No organizations match the current filters.</p>
      <OrgCard
        v-for="org in filteredOrgs"
        :key="org.id"
        :org="org"
      />
    </main>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f5f5f5; color: #222; }

.app { max-width: 960px; margin: 0 auto; padding: 1.5rem; }

.app-header { margin-bottom: 1.5rem; }
.app-header h1 { font-size: 1.75rem; font-weight: 700; }

.org-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.status-msg { grid-column: 1/-1; color: #666; font-style: italic; }
.status-msg--error { color: #a00; }
</style>
