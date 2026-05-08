<script setup>
defineProps({
  org: { type: Object, required: true },
})

function innsenderNavn(innsender) {
  return innsender?.split(' - ')[0] ?? innsender
}
</script>

<template>
  <article class="org-card">
    <div class="org-card__header">
      <h2 class="org-card__name">{{ org.organisasjonsnavn }}</h2>
      <span
        v-if="org.roller?.[0]?.rolle"
        class="org-card__rolle"
        :class="`rolle--${org.roller[0].rolle.toLowerCase()}`"
      >{{ org.roller[0].rolle }}</span>
    </div>

    <p class="org-card__meta">
      <span class="org-card__orgnr">{{ org.organisasjonsnummer }}</span>
      <span v-if="org.innsender" class="org-card__sep">·</span>
      <span v-if="org.innsender" class="org-card__innsender">{{ innsenderNavn(org.innsender) }}</span>
    </p>

    <div v-if="org.mottaksliste?.length" class="org-card__tags-section">
      <p class="org-card__tags-label">Mottar</p>
      <div class="org-card__tags">
        <span v-for="m in org.mottaksliste" :key="m.meldingstype" class="tag tag--receive">
          {{ m.meldingstype }}
        </span>
      </div>
    </div>

    <div v-if="org.sendeliste?.length" class="org-card__tags-section">
      <p class="org-card__tags-label">Sender</p>
      <div class="org-card__tags">
        <span v-for="m in org.sendeliste" :key="m.meldingstype" class="tag tag--send">
          {{ m.meldingstype }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.org-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.org-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.org-card__name {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
}

.org-card__rolle {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  white-space: nowrap;
  flex-shrink: 0;
}
.rolle--bank   { background: #dbeafe; color: #1e40af; }
.rolle--megler { background: #d1fae5; color: #065f46; }

.org-card__meta {
  font-size: 0.8rem;
  color: #555;
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.org-card__orgnr { font-variant-numeric: tabular-nums; }
.org-card__sep   { color: #bbb; }

.org-card__tags-section { display: flex; flex-direction: column; gap: 0.3rem; }

.org-card__tags-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #777;
  letter-spacing: 0.03em;
}

.org-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  white-space: nowrap;
}
.tag--receive { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.tag--send    { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
</style>
