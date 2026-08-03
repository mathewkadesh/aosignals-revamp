import {Link} from 'react-router-dom'
import {Cookie} from 'lucide-react'
import {useConsent} from './consentContext'
export default function CookieBanner(){const {decided,acceptAll,rejectOptional,openSettings}=useConsent();if(decided)return null;return <aside className="cookie-banner" aria-label="Cookie consent"><Cookie/><div><h2>Your privacy choices</h2><p>AOS currently uses necessary browser storage for this choice. Optional analytics and marketing technologies remain blocked unless you consent. <Link to="/privacy-and-cookies">Read the policy</Link>.</p></div><div><button onClick={acceptAll}>Accept all</button><button onClick={rejectOptional}>Reject non-essential</button><button onClick={openSettings}>Manage preferences</button></div></aside>}
