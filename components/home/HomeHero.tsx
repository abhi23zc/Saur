import Image from "next/image";
import Link from "next/link";

const credibility = [
  "11 Engineering Disciplines",
  "ISO 9001:2015 Certified",
  "Mumbai & Chennai Delivery Locations",
];

export default function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-heading">
      <Image
        src="/media/saur-industrial-hero.png"
        alt="Saur Engineering & Consultancy industrial project site"
        fill
        priority
        sizes="100vw"
        className="home-hero-image"
      />
      <div className="home-hero-scrim" aria-hidden="true" />
      <div className="shell home-hero-content">
        <p className="eyebrow eyebrow-light">ISO 9001:2015 Certified</p>
        <h1 id="home-hero-heading">
          Reliable Engineering.
          <br />
          Sustainable Design.
          <br />
          <span className="text-accent">Proven Results.</span>
        </h1>
        <p className="home-hero-text">
          Saur Engineering &amp; Consultancy delivers multidisciplinary engineering solutions for EPC companies, Oil
          &amp; Gas operators, and industrial clients—combining technical precision, safety, and accountable
          delivery.
        </p>
        <div className="home-hero-actions">
          <Link href="/services" className="button button-primary">
            Explore Services <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/contact" className="button button-ghost-light">
            Talk to Our Team
          </Link>
        </div>
      </div>
      <div className="shell home-credibility" aria-label="Company credentials">
        <ul>
          {credibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
