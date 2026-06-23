import { useState } from 'react'
import clsx from 'clsx'
import './index.scss'

type Status = 'idle' | 'loading' | 'success' | 'error'

// 模拟后端登录接口：延迟 1 秒，账号密码对了 resolve，否则 reject
function mockLogin(email: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com' && password === '123456') {
        resolve()
      } else {
        reject(new Error('Incorrect email or password'))
      }
    }, 1000)
  })
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

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

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setStatus('loading')

    try {
      await mockLogin(email, password)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError((err as Error).message)
    }
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={handleLogin}>
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

        <button type="submit" className="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>

        {status === 'error' && <p className="error-message">{error}</p>}
        {status === 'success' && <p className="success-message">Login Success</p>}
      </form>
    </div>
  )
}

export default Login
