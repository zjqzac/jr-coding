import clsx from 'clsx'
import './TextInput.scss'
import { useId } from 'react'

type TextInputProps = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  error?: string
  placeholder?: string
}

function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  error = '',
  placeholder,
}: TextInputProps) {
  const id = useId()

  return (
    <div className={clsx('field', error && 'has-error')}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default TextInput
