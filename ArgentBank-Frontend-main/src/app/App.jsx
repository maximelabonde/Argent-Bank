import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { Header, Footer } from '../components'
import { Home, SignIn, User } from '../pages'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
