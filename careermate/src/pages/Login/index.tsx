import { useState } from 'react'
import clsx from 'clsx'
import './index.scss'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (value === '') {
      setEmailError('Email 不能为空')
    } else if (!value.includes('@')) {
      setEmailError('Email 必须包含 @')
    } else if (value.length > 50) {
      setEmailError('Email 不能超过 50 个字符')
    } else {
      setEmailError('')
    }
  }

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)

    if (value === '') {
      setPasswordError('Password 不能为空')
    } else if (value.length < 6) {
      setPasswordError('Password 不能少于 6 个字符')
    } else if (value.length > 20) {
      setPasswordError('Password 不能超过 20 个字符')
    } else {
      setPasswordError('')
    }
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={(e) => e.preventDefault()}>
        <header className="login-head">
          <h1>Login</h1>
        </header>

        <div className={clsx('field', emailError && 'has-error')}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={emailChange}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div className={clsx('field', passwordError && 'has-error')}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={passwordChange}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <button type="submit" className="submit">
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login
