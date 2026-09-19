import Link from "next/link";
import { site } from "@/data/site";

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell footer-grid">
      <div><p className="eyebrow">Saur Engineering & Consultancy</p><h2>Engineering confidence into every decision.</h2><p className="muted">ISO 9001:2015 certified engineering consultancy for oil & gas, EPC and industrial projects.</p></div>
      <div><p className="footer-label">Explore</p><Link href="/company">Company</Link><Link href="/services">Services</Link><Link href="/expertise">Expertise</Link><Link href="/projects">Projects</Link></div>
      <div><p className="footer-label">Contact</p>{site.phones.map((phone) => <a href={`tel:${phone.replace(/\s/g, "")}`} key={phone}>{phone}</a>)}{site.emails.map((email) => <a href={`mailto:${email}`} key={email}>{email}</a>)}<Link href="/privacy">Privacy</Link></div>
    </div>
    <div className="shell footer-bottom">© {new Date().getFullYear()} Saur Engineering & Consultancy. All rights reserved.</div>
  </footer>;
}
