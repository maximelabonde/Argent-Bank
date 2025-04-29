import PropTypes from 'prop-types'

export function Input({
  inputType,
  label,
  type,
  id,
  value,
  checked,
  onChange,
  autoComplete,
}) {
  if (inputType === 'auth') {
    return (
      <div className="input-wrapper">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
        />
      </div>
    )
  } else if (inputType === 'rememberMe') {
    return (
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor="remember-me">{label}</label>
      </div>
    )
  } else if (inputType === 'username') {
    return (
      <div>
        <label htmlFor="username">{label}</label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
        />
      </div>
    )
  } else if (inputType === 'disabled') {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input id={id} value={value} disabled />
      </div>
    )
  }
}

Input.propTypes = {
  inputType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string.isRequired,
}
