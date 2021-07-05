import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {computed, watch} from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export const useLoginForm = () => {
  const MIN_LENGTH = 6;
  const store = useStore();
  const router = useRouter();
  const schema = yup.object({
    email: yup.string().trim().required().email(),
    password: yup.string().trim().required().min(MIN_LENGTH)
  })

  const { handleSubmit, isSubmitting, submitCount } = useForm({validationSchema:schema});
  const tooMatch = computed(() => submitCount.value > 3)

  watch(tooMatch, (val) => {
    if(val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 2000)
    }
  })

  const {value: email, errorMessage: emailError, handleBlur: emailBlur } = useField('email')
  const {value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField('password')

  // асинхронный колбэк
  const onSubmit = handleSubmit(async value => {
    console.log(value)
    try {
      await store.dispatch('auth/login', value)
      router.push({ name : 'Home'})
    } catch {}
  })

  return {
    email, emailError, emailBlur,
    password, passwordError, passwordBlur,
    onSubmit, isSubmitting, submitCount, tooMatch
  }
}