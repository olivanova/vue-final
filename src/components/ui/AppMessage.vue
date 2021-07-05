<template>
  <div :class="['alert', message.type]" v-if="message">
    <p class="alert-title" v-if="title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore()
    const message = computed(() => store.state.message)
    const TITLE_MAP = {
      primary: 'Success',
      danger: 'Error',
      warning: 'Attention'
    }

    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : '' )

    return {
      message, title,
      close: () => store.commit('clearMessage')
    }
  }
}
</script>

<style scoped>

</style>