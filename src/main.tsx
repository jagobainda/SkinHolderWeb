import { createRoot } from 'react-dom/client'
import { App } from '@app/App'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(<App />)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceworkers/SteamSW.js')
            .then(registration => {
                console.log('Service worker registered:', registration)
            })
            .catch(error => {
                console.error('Service worker registration failed:', error)
            })
    })
}
