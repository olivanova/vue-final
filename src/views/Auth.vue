<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', { invalid: emailError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="emailBlur">
      <small v-if="emailError">{{ emailError }}</small>
    </div>

    <div :class="['form-control', { invalid: passwordError}]">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" @blur="passwordBlur">
      <small v-if="passwordError">{{ passwordError }}</small>
    </div>
    <button class="btn primary" type="submit" :disabled="isSubmitting || tooMatch">Submit</button>
    <div v-if="tooMatch">Слишком много попыток</div>
  </form>
</template>

<script>
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {useLoginForm} from "../hooks/login_form";
import { errors } from "../utils/errors";

export default {
  setup(){
    const route = useRoute()
    const store = useStore()

    if(route.query.message) {
      store.commit('setMessage', {
        value: errors(route.query.message),
        type: 'warning'
      })
    }

    return { ...useLoginForm()}
  }
}
</script>

<style scoped>

</style>