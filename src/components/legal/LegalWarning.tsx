import {TriangleAlert} from 'lucide-react'
export default function LegalWarning({children}:{children:React.ReactNode}){return <aside className="legal-warning" role="note"><TriangleAlert/><p>{children}</p></aside>}
