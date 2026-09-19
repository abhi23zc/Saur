import Image from "next/image";
import Link from "next/link";

const tags = [
  "Telecommunication",
  "Electrical",
  "Instrumentation",
  "3D Modelling",
  "Process Engineering",
  "Piping & Mechanical",
];

export default function HomeExpertise() {
  return (
    <section className="home-expertise" aria-labelledby="home-expertise-heading">
      <div className="home-expertise-image">
        <Image
          src="/media/expertise-design-office.png"
          alt="Saur engineering design office coordinating multidisciplinary project work"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="home-expertise-panel">
        <p className="eyebrow eyebrow-light">Multidisciplinary Expertise</p>
        <h2 id="home-expertise-heading">One coordinated engineering partner.</h2>
        <p>
          Our teams support critical design decisions across telecommunications, electrical, instrumentation,
          process, piping, mechanical, pipeline, civil, structural, and specialist engineering disciplines.
        </p>
        <ul className="expertise-tags" aria-label="Engineering expertise areas">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <Link href="/expertise" className="button button-primary">
          Explore Expertise <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
