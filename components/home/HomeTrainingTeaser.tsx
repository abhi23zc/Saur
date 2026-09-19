import Link from "next/link";

export default function HomeTrainingTeaser() {
  return (
    <section className="home-training-teaser" aria-labelledby="home-training-heading">
      <div className="shell home-training-teaser-inner">
        <div>
          <h2 id="home-training-heading">Develop capability that lasts.</h2>
          <p>
            Professional training in Piping, Process, Mechanical, Instrumentation, Electrical, and plant-design
            software.
          </p>
        </div>
        <Link href="/training" className="button button-dark">
          Explore Training <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
