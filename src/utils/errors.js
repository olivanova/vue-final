const errors_messages = {
  EMAIL_NOT_FOUND: 'Пользователь не найден',
  INVALID_PASSWORD: 'Пароль не верный',
  auth: 'not auth'
}

export const errors = (error) => {
  return errors_messages[error] ? errors_messages[error] : 'Неизвестная ошибка'
}