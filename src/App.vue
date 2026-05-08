<script setup>
import { ref, computed, onMounted } from 'vue'
import FilterBar from './components/FilterBar.vue'
import OrgCard from './components/OrgCard.vue'
import { parseInnsender } from './utils/innsender.js'

const orgs = ref([])
const loading = ref(true)
const error = ref(null)
const lastUpdated = ref(null)

const searchText = ref('')
const roleFilter = ref('')
const innsenderFilter = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/akeldo/organizations.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    orgs.value = data.akeldo
    lastUpdated.value = data.lastUpdated
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})


const lastUpdatedFormatted = computed(() => {
  if (!lastUpdated.value) return null
  return new Date(lastUpdated.value).toLocaleString('nb-NO', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
})

const roleOptions = computed(() =>
  [...new Set(orgs.value.map(o => o.roller?.[0]?.rolle).filter(Boolean))].sort()
)

const innsenderOptions = computed(() =>
  [...new Set(orgs.value.map(o => parseInnsender(o.innsender)).filter(Boolean))].sort()
)

const hasActiveFilters = computed(() =>
  searchText.value !== '' || roleFilter.value !== '' || innsenderFilter.value !== ''
)

const filteredOrgs = computed(() => {
  const search = searchText.value.trim().toLowerCase()
  return orgs.value.filter(org => {
    if (search && !org.organisasjonsnavn.toLowerCase().includes(search) && !org.organisasjonsnummer.includes(search)) return false
    if (roleFilter.value && org.roller?.[0]?.rolle !== roleFilter.value) return false
    if (innsenderFilter.value && parseInnsender(org.innsender) !== innsenderFilter.value) return false
    return true
  })
})

function clearFilters() {
  searchText.value = ''
  roleFilter.value = ''
  innsenderFilter.value = ''
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Aktører</h1>
      <p v-if="lastUpdatedFormatted" class="last-updated">Sist oppdatert: {{ lastUpdatedFormatted }}</p>
    </header>

    <FilterBar
      :role-options="roleOptions"
      :innsender-options="innsenderOptions"
      :role-filter="roleFilter"
      :innsender-filter="innsenderFilter"
      :search-text="searchText"
      :has-active-filters="hasActiveFilters"
      @search="searchText = $event"
      @role="roleFilter = $event"
      @innsender="innsenderFilter = $event"
      @clear="clearFilters"
    />

    <p v-if="!loading && !error" class="result-count">
      Viser {{ filteredOrgs.length }} av {{ orgs.length }} aktører
    </p>

    <main class="org-list">
      <p v-if="loading" class="status-msg">Laster…</p>
      <p v-else-if="error" class="status-msg status-msg--error">Kunne ikke laste data: {{ error }}</p>
      <p v-else-if="filteredOrgs.length === 0" class="status-msg">Ingen aktører matcher gjeldende filtre.</p>
      <OrgCard
        v-for="org in filteredOrgs"
        :key="org.organisasjonsnummer"
        :org="org"
      />
    </main>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f5f5f5; color: #222; }

.app { max-width: 1100px; margin: 0 auto; padding: 1.5rem; }

.app-header { margin-bottom: 1.5rem; }
.app-header h1 { font-size: 1.75rem; font-weight: 700; }
.last-updated { font-size: 0.8rem; color: #888; margin-top: 0.25rem; }

.result-count {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: #666;
}

.org-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1rem;
  margin-top: 0.75rem;
}

.status-msg { grid-column: 1/-1; color: #666; font-style: italic; }
.status-msg--error { color: #a00; }
</style>
