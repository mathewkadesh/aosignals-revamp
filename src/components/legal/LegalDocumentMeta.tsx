import type {LegalDocument} from '../../data/legal'
export default function LegalDocumentMeta({document}:{document:LegalDocument}){return <dl><div><dt>Effective</dt><dd>{document.effectiveDate}</dd></div><div><dt>Updated</dt><dd>{document.lastUpdated}</dd></div><div><dt>Version</dt><dd>{document.version}</dd></div></dl>}
