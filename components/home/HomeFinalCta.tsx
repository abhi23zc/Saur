import Link from "next/link";

export default function HomeFinalCta() {
  return (
    <section className="home-final-cta" aria-labelledby="home-final-cta-heading">
      <div className="shell home-final-cta-inner">
        <h2 id="home-final-cta-heading">Bring clarity to your next engineering challenge.</h2>
        <p>Talk to Saur about engineering, workforce, or training requirements.</p>
        <Link href="/contact" className="button button-primary">
          Request a Consultation <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
