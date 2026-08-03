import {Info} from 'lucide-react'
export default function LegalCallout({children}:{children:React.ReactNode}){return <aside className="legal-callout"><Info/><p>{children}</p></aside>}
