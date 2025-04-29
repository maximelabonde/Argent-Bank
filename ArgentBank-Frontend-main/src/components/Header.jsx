import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { authLogout } from '../features/authSlice'
import { userLogout } from '../features/userSlice'

export function Header() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const userName = useSelector((state) => state.user.userName)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await dispatch(authLogout())
    await dispatch(userLogout())
    navigate('/')
  }

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="./src/assets/img/argentBankLogo.webp"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {token ? (
            <div className="main-nav-div">
              <Link className="main-nav-item" onClick={handleSignOut}>
                <i className="fa fa-sign-out"></i>
                Sign Out
              </Link>
              <Link className="main-nav-item" to={'/user'}>
                <i className="fa fa-user-circle fa-lg"></i>
                <p className="main-nav-text">{userName}</p>
              </Link>
            </div>
          ) : (
            <Link className="main-nav-item" to={'/sign-in'}>
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
