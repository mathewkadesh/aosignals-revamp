export default function RiskCategoryCard({title,children}:{title:string;children:React.ReactNode}){return <article className="risk-category-card"><h3>{title}</h3><p>{children}</p></article>}
