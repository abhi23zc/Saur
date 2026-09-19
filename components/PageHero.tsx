import Image from "next/image";
import Link from "next/link";

type Props = { eyebrow: string; title: string; text: string; image: string; action?: { label: string; href: string } };

export default function PageHero({ eyebrow, title, text, image, action }: Props) {
  return <section className="page-hero"><Image src={image} alt="" fill priority sizes="100vw" className="hero-image" /><div className="hero-scrim" /><div className="shell hero-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p>{action && <Link href={action.href} className="button button-primary">{action.label} <span>↗</span></Link>}</div></section>;
}
