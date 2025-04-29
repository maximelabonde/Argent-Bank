import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store, persistor } from './app/store.js'
import './assets/css/main.css'
import App from './app/App.jsx'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* Provides the Redux store to all components. */}
      <PersistGate persistor={persistor}>
        {/* Blocks the rendering of the application until the persistent state is restored. */}
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
