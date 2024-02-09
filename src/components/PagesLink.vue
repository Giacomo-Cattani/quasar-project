<template >
  <q-item v-show="route != router.currentRoute.value.path && route != '/:catchAll(.*)*'" clickable :to="route">

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
})
</script>

