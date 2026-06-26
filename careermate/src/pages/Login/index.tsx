import { useState } from 'react'
import TextInput from '@/Components/TextInput'
import { useEmail } from '@/Hooks/useEmail'
import { validateLogin, validatePassword } from '@/utils/validators'
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
  const { email, emailError, emailChange } = useEmail()
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setPasswordError(validatePassword(value))
  }

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    // 提交前先做整体校验，有错误就直接展示、不请求接口
    const errMsg = validateLogin(email, password)
    if (errMsg) {
      setStatus('error')
      setError(errMsg)
      return
    }

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

        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={emailChange}
          error={emailError}
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={passwordChange}
          error={passwordError}
        />

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
