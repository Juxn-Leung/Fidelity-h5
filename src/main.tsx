import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@/styles/index.scss'
import '@/styles/tailwind.css'
import SpinContent from '@/components/SpinContent/SpinContent'
import MessageContent from '@/components/MessageContent/MessageContent'
import './version'
import { AuthProvider } from './contexts/AuthContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <SpinContent>
      <MessageContent>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </MessageContent>
    </SpinContent>
  </AuthProvider>
)
