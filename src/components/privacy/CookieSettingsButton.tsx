import {Cookie} from 'lucide-react'
import {useConsent} from './consentContext'
export default function CookieSettingsButton(){const {openSettings}=useConsent();return <button className="cookie-settings-button" onClick={openSettings}><Cookie/>Cookie settings</button>}
