import {createContext,useContext} from 'react'
export type ConsentState={necessary:true;functional:boolean;analytics:boolean;marketing:boolean;version:'1.0'}
export type ConsentContextValue={consent:ConsentState;decided:boolean;settingsOpen:boolean;save:(value:ConsentState)=>void;acceptAll:()=>void;rejectOptional:()=>void;openSettings:()=>void;closeSettings:()=>void}
export const ConsentContext=createContext<ConsentContextValue|null>(null)
export function useConsent(){const value=useContext(ConsentContext);if(!value)throw new Error('useConsent must be inside ConsentProvider');return value}
