import {useState} from 'react'
import {Download,FileSignature,Printer} from 'lucide-react'
import {oneWayNda,mutualNda,privacyAndCookies,riskDisclosure,termsAndConditions,affiliateTerms,accessibilityStatement,complaintsProcedure} from '../data/legal'
import LegalPageLayout from '../components/legal/LegalPageLayout'
export const TermsPage=()=> <LegalPageLayout document={termsAndConditions} showComplaints/>
export const PrivacyPage=()=> <LegalPageLayout document={privacyAndCookies} showComplaints/>
export const RiskPage=()=> <LegalPageLayout document={riskDisclosure}/>
export const AffiliateTermsPage=()=> <LegalPageLayout document={affiliateTerms}/>
export const AccessibilityPage=()=> <LegalPageLayout document={accessibilityStatement}/>
export const ComplaintsPage=()=> <LegalPageLayout document={complaintsProcedure} showComplaints/>
export function NdaPage(){const [mutual,setMutual]=useState(false);const doc=mutual?mutualNda:oneWayNda;return <><div className="nda-mode" role="group" aria-label="NDA draft type"><button className={!mutual?'active':''} onClick={()=>setMutual(false)}>One-way draft</button><button className={mutual?'active':''} onClick={()=>setMutual(true)}>Mutual draft</button><button onClick={()=>window.print()}><Printer/>Print</button><a href="mailto:hello@aosignals.co.uk?subject=Request%20an%20NDA"><FileSignature/>Request NDA</a><button onClick={()=>window.print()}><Download/>Download draft PDF</button></div><LegalPageLayout document={doc}/></>}
