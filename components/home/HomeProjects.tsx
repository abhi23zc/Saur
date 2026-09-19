import Link from "next/link";

const projects = [
  {
    title: "AiP5 Onshore Wellhead – BAB & BUHASA",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    scope: "Telecom and instrumentation detail engineering for 132 onshore well pads.",
    year: "2024",
  },
  {
    title: "CRPO 116",
    client: "Petrocon Engineers",
    endUser: "L&T Hydrocarbon / Saudi Aramco",
    scope: "Instrumentation FEED verification and detail engineering.",
    year: "2024",
  },
  {
    title: "Southeast Onshore Wellhead",
    client: "Petrocon Engineers",
    endUser: "ADNOC, UAE",
    scope: "3D modelling and detailed engineering for 117 onshore wells.",
    year: "2025, ongoing",
  },
];

export default function HomeProjects() {
  return (
    <section className="section home-projects" aria-labelledby="home-projects-heading">
      <div className="shell">
        <div className="page-intro page-intro-light">
          <p className="eyebrow eyebrow-light">Selected Work</p>
          <h2 id="home-projects-heading">Engineering success stories</h2>
        </div>
        <div className="content-grid home-projects-grid">
          {projects.map((project) => (
            <Link href="/projects" className="project-card" key={project.title}>
              <p className="eyebrow eyebrow-light">{project.year}</p>
              <h3>{project.title}</h3>
              <dl>
                <div>
                  <dt>Client</dt>
                  <dd>{project.client}</dd>
                </div>
                <div>
                  <dt>End User</dt>
                  <dd>{project.endUser}</dd>
                </div>
              </dl>
              <p className="project-scope">{project.scope}</p>
              <span className="card-link" aria-hidden="true">
                View project ↗
              </span>
            </Link>
          ))}
        </div>
        <div className="home-projects-cta">
          <Link href="/projects" className="button button-ghost-light">
            View Project Portfolio <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
