import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const manifestUrl = "https://abolfazlmekaniki.github.io/simple_Dapp/tonconnect-manifest.json"

ReactDOM.createRoot(document.getElementById('root')!).render(
 
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App/>
    </TonConnectUIProvider>
  
)
