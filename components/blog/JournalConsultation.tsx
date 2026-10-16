import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function JournalConsultation() {
  return <section className="journal-consultation" aria-labelledby="journal-consultation-title">
    <div><p className="journal-eyebrow">Technical consultation</p><h2 id="journal-consultation-title">Discuss your engineering challenges.</h2><p>Speak with our team about how we can support your project goals.</p></div>
    <Link href="/contact">Contact us <ArrowUpRight size={17} aria-hidden="true" /></Link>
  </section>;
}
