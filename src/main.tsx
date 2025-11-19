import { createRoot } from 'react-dom/client'
import { App } from '@app/App'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(<App />)

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/SteamSW.js");
    navigator.serviceWorker.register("/GamerPaySW.js");
}
