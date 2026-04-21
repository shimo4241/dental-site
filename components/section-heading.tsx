import { FadeInUp } from "./animated";

type SectionHeadingProps = {
  badge: string;
  title: string;
  description: string;
  inverse?: boolean;
};

export function SectionHeading({
  badge,
  title,
  description,
  inverse = false
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <FadeInUp className="inline-flex">
        <span className="eyebrow">{badge}</span>
      </FadeInUp>
      <FadeInUp delay={0.08}>
        <h2
          className={`mt-6 text-3xl font-semibold tracking-tight md:text-5xl ${
            inverse ? "text-white" : "text-slate-950"
          }`}
        >
          {title}
        </h2>
      </FadeInUp>
      <FadeInUp delay={0.16}>
        <p
          className={`mt-4 max-w-3xl text-base leading-8 md:text-lg ${
            inverse ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      </FadeInUp>
    </div>
  );
}
