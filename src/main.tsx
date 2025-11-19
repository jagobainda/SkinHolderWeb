import { createRoot } from 'react-dom/client'
import { App } from '@app/App'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(<App />)

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/SteamSW.js").catch(err =>
        console.error("Error registering SteamSW:", err)
    );
    navigator.serviceWorker.register("/GamerPaySW.js").catch(err =>
        console.error("Error registering GamerPaySW:", err)
    );
}