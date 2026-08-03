import {Link} from 'react-router-dom'
import {FileText} from 'lucide-react'
import type {LegalDocument} from '../../data/legal'
export default function LegalPageHero({document}:{document:LegalDocument}){return <header className="legal-hero"><div className="container-wide"><nav aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Legal</span></nav><span className="legal-badge"><FileText/>Legal · review draft</span><h1>{document.title}</h1><p>{document.summary}</p><dl><div><dt>Effective</dt><dd>{document.effectiveDate}</dd></div><div><dt>Last updated</dt><dd>{document.lastUpdated}</dd></div><div><dt>Version</dt><dd>{document.version}</dd></div></dl></div></header>}
