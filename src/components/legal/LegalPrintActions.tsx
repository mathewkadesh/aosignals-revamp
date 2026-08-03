import {Link2,Printer} from 'lucide-react'
export default function LegalPrintActions(){return <div className="legal-actions"><button onClick={()=>window.print()}><Printer/>Print document</button><button onClick={()=>void navigator.clipboard?.writeText(location.href)}><Link2/>Copy page link</button></div>}
