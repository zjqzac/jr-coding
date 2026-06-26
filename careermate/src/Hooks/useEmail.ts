import { useState } from 'react'
import { validateEmail } from '@/utils/validators'

// 复用 Email 的状态逻辑；校验规则统一来自 validators
export function useEmail() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setEmailError(validateEmail(value))
  }

  return { email, emailError, emailChange }
}
