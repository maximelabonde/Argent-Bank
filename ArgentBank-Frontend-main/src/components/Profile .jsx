import { useDispatch, useSelector } from 'react-redux'
import { userGet, userPut } from '../features/userSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Input } from './Input'

export function Profile() {
  const [edit, setEdit] = useState(false)
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/sign-in')
    } else {
      {
        try {
          dispatch(userGet({ token }))
        } catch (err) {
          console.log(err)
        }
      }
    }
  }, [token, dispatch, navigate])

  const handleUserPut = () => {
    if (userName === '') return
    try {
      dispatch(
        userPut({
          token: token,
          userName: userName,
        }),
      )
      setEdit(false)
      setUserName('')
    } catch (err) {
      console.log(err)
    }
  }

  const profile = {
    ...useSelector((state) => state.user),
  }

  if (!edit) {
    return (
      <div className="header">
        <h1>
          Welcome back
          <br />
          {profile.firstName} &apos;{profile.userName}&apos; {profile.lastName}
        </h1>
        <button className={'edit-button'} onClick={() => setEdit(true)}>
          Edit Username
        </button>
      </div>
    )
  } else {
    return (
      <div className="header">
        <h1>Edit user info</h1>
        <div className={'input-username'}>
          <Input
            inputType={'username'}
            label={'User Name :'}
            id={'username'}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete={'username'}
          />
          <Input
            id={'firstname'}
            inputType={'disabled'}
            label={'First Name :'}
            value={profile.firstName}
          />
          <Input
            id={'lastname'}
            inputType={'disabled'}
            label={'Last Name :'}
            value={profile.lastName}
          />
        </div>
        <button className="edit-button" onClick={() => handleUserPut()}>
          Save
        </button>
        <button className="edit-button" onClick={() => setEdit(false)}>
          Cancel
        </button>
      </div>
    )
  }
}
