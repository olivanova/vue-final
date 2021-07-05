import * as yup from "yup";
import {useField, useForm} from "vee-validate";

export const useRequestForm = (cbSubmit) => {
  const schema = yup.object({
    name: yup.string().trim().required(),
    phone: yup.number().required(),
    sum: yup.number().required().min(0),
  })

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema:schema,
    initialValues: {
      status: 'active'
    }
  });

  const {value: name, errorMessage: nameError, handleBlur: nameBlur } = useField('name')
  const {value: phone, errorMessage: phoneError, handleBlur: phoneBlur } = useField('phone')
  const {value: sum, errorMessage: sumError, handleBlur: sumBlur } = useField('sum')
  const {value: status } = useField('status')

  const submit = handleSubmit(cbSubmit)

  return {
    status,
    name, nameError, nameBlur,
    phone, phoneError, phoneBlur,
    sum, sumError, sumBlur,
    submit, isSubmitting
  }
}