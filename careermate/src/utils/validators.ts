// 所有表单校验规则集中在这里维护：改规则只需改这一个文件
// 每个函数返回错误信息字符串，校验通过时返回空字符串 ''

export function validateName(name: string): string {
  if (name === '') return 'Name 不能为空'
  if (name.length > 30) return 'Name 不能超过 30 个字符'
  return ''
}

export function validateEmail(email: string): string {
  if (email === '') return 'Email 不能为空'
  if (!email.includes('@')) return 'Email 必须包含 @'
  if (email.length > 50) return 'Email 不能超过 50 个字符'
  return ''
}

export function validatePassword(password: string): string {
  if (password === '') return 'Password 不能为空'
  if (password.length < 6) return 'Password 不能少于 6 个字符'
  if (password.length > 20) return 'Password 不能超过 20 个字符'
  return ''
}

export function validateConfirmPassword(confirmPassword: string, password: string): string {
  if (confirmPassword === '') return 'Confirm Password 不能为空'
  if (confirmPassword !== password) return '两次输入的密码不一致'
  return ''
}

// 表单级整体校验：返回第一条错误信息，全部通过时返回 ''
export function validateLogin(email: string, password: string): string {
  return validateEmail(email) || validatePassword(password)
}

export function validateRegister(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): string {
  return (
    validateName(name) ||
    validateEmail(email) ||
    validatePassword(password) ||
    validateConfirmPassword(confirmPassword, password)
  )
}
