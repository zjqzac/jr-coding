import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextInput from '@/Components/TextInput'
import { useEmail } from '@/Hooks/useEmail'
import {
  validateRegister,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validators'
import './index.scss'

type Status = 'idle' | 'loading' | 'success' | 'error'

// 模拟后端注册接口：延迟 1 秒，邮箱已存在 reject，否则 resolve
function mockRegister(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com') {
        reject(new Error('Email already registered'))
      } else {
        resolve()
      }
    }, 1000)
  })
}

function Register() {
  const [name, setName] = useState('')
  const { email, emailError, emailChange } = useEmail()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    setNameError(validateName(value))
  }

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setPasswordError(validatePassword(value))

    // 密码变化时，同步校验确认密码
    if (confirmPassword !== '') {
      setConfirmError(validateConfirmPassword(confirmPassword, value))
    }
  }

  const confirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)
    setConfirmError(validateConfirmPassword(value, password))
  }

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const errMsg = validateRegister(name, email, password, confirmPassword)
    if (errMsg) {
      setStatus('error')
      setError(errMsg)
      return
    }

    setStatus('loading')
    try {
      await mockRegister(email)
      setStatus('success')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (err) {
      setStatus('error')
      setError((err as Error).message)
    }
  }

  return (
    <div className="register">
      <form className="register-card" onSubmit={handleRegister}>
        <header className="register-head">
          <h1>Register</h1>
        </header>

        <TextInput
          label="Name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={nameChange}
          error={nameError}
        />

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

        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={confirmPasswordChange}
          error={confirmError}
        />

        <button type="submit" className="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>

        {status === 'error' && <p className="error-message">{error}</p>}
        {status === 'success' && <p className="success-message">Register Success</p>}

        <p className="switch-hint">
          Already have an account?{' '}
          <Link className="switch-link" to="/">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
