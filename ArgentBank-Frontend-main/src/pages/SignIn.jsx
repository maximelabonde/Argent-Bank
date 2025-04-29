import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { authPost } from '../features/authSlice'
import { Input } from '../components'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const resultAction = await dispatch(
        authPost({
          email: email,
          password: password,
          rememberMe: rememberMe,
        }),
      )
      if (authPost.fulfilled.match(resultAction)) {
        navigate('/user')
      }
      setError('Incorrect email or password')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <p>{error}</p>
          <Input
            inputType={'auth'}
            label={'Email'}
            id={'email'}
            type={'text'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete={'email'}
          />
          <Input
            inputType={'auth'}
            label={'Password'}
            id={'password'}
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={'current-password'}
          />
          <Input
            inputType={'rememberMe'}
            rememberMe={true}
            label={'Remember me'}
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe ? true : false)}
          />
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}
