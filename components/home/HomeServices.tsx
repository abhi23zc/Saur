import Link from "next/link";

const services = [
  {
    title: "FEED & Detail Engineering",
    text: "Multidisciplinary engineering from verification and design basis through construction-ready deliverables.",
    href: "/services",
  },
  {
    title: "Manpower & Workforce Solutions",
    text: "Skilled manpower and execution support for onshore, yard fabrication, and offshore operations.",
    href: "/digital-workforce",
  },
  {
    title: "Domain & SME Support",
    text: "Industry expertise that helps IT organizations solve complex engineering and operational challenges.",
    href: "/digital-workforce",
  },
  {
    title: "Training & Development",
    text: "Customized professional courses that build practical engineering capability.",
    href: "/training",
  },
];

export default function HomeServices() {
  return (
    <section className="section surface" aria-labelledby="home-services-heading">
      <div className="shell">
        <div className="page-intro">
          <p className="eyebrow">What we do</p>
          <h2 id="home-services-heading">Services built around delivery.</h2>
        </div>
        <div className="content-grid home-services-grid">
          {services.map((service, index) => (
            <Link href={service.href} className="content-card service-card" key={service.title}>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="card-link" aria-hidden="true">
                Learn more ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
