<template>
  <form @submit.prevent="submit">
    <div class="form-control" :class="{invalid: nameError}">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" @blur="nameBlur">
      <small v-if="nameError"> {{ nameError }}</small>
    </div>

    <div class="form-control" :class="{invalid: phoneError}">
      <label for="phone">Телефон</label>
      <input type="text" id="phone" v-model="phone"  @blur="phoneBlur">
      <small v-if="phoneError"> {{ phoneError }}</small>
    </div>
    <div class="form-control" :class="{invalid: sumError}">
      <label for="sum">Сумма заявки</label>
      <input type="text" id="sum" v-model="sum"  @blur="sumBlur">
      <small v-if="sumError"> {{ sumError }}</small>
    </div>
    <div class="form-control">
      <label for="status"> Статус заявки</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cansel">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn primary" type="submit" :disabled="isSubmitting">Create</button>
  </form>
</template>

<script>
import {useRequestForm} from "../../hooks/request_form";

export default {
  emits: ['create'],
  setup(_, { emit }) {
    const submit = async values => {
      console.log(values)
      emit('create')
    }

    return {
      ...useRequestForm(submit)
    }
  }
}
</script>

<style scoped>

</style>