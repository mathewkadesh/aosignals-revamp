import {Link} from 'react-router-dom'
import {Building2,Mail} from 'lucide-react'
import {legalCompanyDetails} from '../../data/legalCompanyDetails'
export default function LegalContactCard(){return <aside className="legal-contact-card"><Building2/><div><span>Legal entity</span><h3>{legalCompanyDetails.legalName}</h3><p>Company No. {legalCompanyDetails.companyNumber}<br/>Registered in {legalCompanyDetails.jurisdiction}</p><Link to="/contact"><Mail/>Contact AOS</Link></div></aside>}
