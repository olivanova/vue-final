<template>
  <component :is="`${layout}-layout`" v-if="layout"></component>
  <p>{{ layout }}</p>
</template>

<script>
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup() {
    const route = useRoute();
    const layout = computed(() => route.meta.layout)
    return {
      layout
    }
  },
  components: {AuthLayout, MainLayout}
}
</script>