import Link from "next/link";
export default function NotFound() { return <section className="section shell not-found"><p className="eyebrow">404</p><h1>That page is not available.</h1><p>The engineering information you requested may have moved or may not be published.</p><Link href="/projects" className="button button-dark">Browse projects</Link></section> }
