import {useState} from 'react'
import {ConsentContext,type ConsentState} from './consentContext'
const key='aos-consent-v1'
const defaults:ConsentState={necessary:true,functional:false,analytics:false,marketing:false,version:'1.0'}
function read(){try{const value=localStorage.getItem(key);return value?JSON.parse(value) as ConsentState:null}catch{return null}}
export function ConsentProvider({children}:{children:React.ReactNode}){const [initial]=useState(read);const [consent,setConsent]=useState<ConsentState>(initial??defaults);const [decided,setDecided]=useState(Boolean(initial));const [settingsOpen,setSettingsOpen]=useState(false);const save=(value:ConsentState)=>{setConsent(value);setDecided(true);setSettingsOpen(false);localStorage.setItem(key,JSON.stringify({...value,savedAt:new Date().toISOString()}))};return <ConsentContext.Provider value={{consent,decided,settingsOpen,save,acceptAll:()=>save({...defaults,functional:true,analytics:true,marketing:true}),rejectOptional:()=>save(defaults),openSettings:()=>setSettingsOpen(true),closeSettings:()=>setSettingsOpen(false)}}>{children}</ConsentContext.Provider>}
