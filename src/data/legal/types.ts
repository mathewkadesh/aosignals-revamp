export type LegalBlock={type:'p'|'ul'|'ol'|'warning'|'callout';text?:string;items?:string[]}
export interface LegalSectionData{id:string;number?:string;title:string;blocks:LegalBlock[]}
export interface LegalDocument{id:string;title:string;route:string;version:string;effectiveDate:string;lastUpdated:string;summary:string;reviewStatus:'draft'|'legal-review'|'approved';sections:LegalSectionData[]}
