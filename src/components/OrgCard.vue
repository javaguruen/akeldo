<script setup>
defineProps({
  org: { type: Object, required: true },
})
</script>

<template>
  <article class="org-card">
    <div class="org-card__header">
      <h2 class="org-card__name">{{ org.name }}</h2>
      <span
        v-if="org.status"
        class="org-card__status"
        :class="`status--${org.status.toLowerCase()}`"
      >{{ org.status }}</span>
    </div>

    <dl class="org-card__meta">
      <div v-if="org.type"><dt>Type</dt><dd>{{ org.type }}</dd></div>
      <div v-if="org.location"><dt>Location</dt><dd>{{ org.location }}</dd></div>
    </dl>

    <p v-if="org.description" class="org-card__desc">{{ org.description }}</p>

    <a
      v-if="org.website"
      :href="org.website"
      target="_blank"
      rel="noopener noreferrer"
      class="org-card__link"
    >Visit website</a>
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

.org-card__name { font-size: 1rem; font-weight: 600; }

.org-card__status {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  white-space: nowrap;
}
.status--active   { background: #d4edda; color: #155724; }
.status--inactive { background: #f8d7da; color: #721c24; }

.org-card__meta {
  display: flex;
  gap: 1rem;
  font-size: 0.82rem;
}
.org-card__meta div { display: flex; gap: 0.25rem; }
.org-card__meta dt { color: #777; }
.org-card__meta dd { font-weight: 500; }

.org-card__desc { font-size: 0.88rem; color: #444; line-height: 1.5; }

.org-card__link {
  font-size: 0.82rem;
  color: #4a90d9;
  text-decoration: none;
  margin-top: auto;
}
.org-card__link:hover { text-decoration: underline; }
</style>
