import { useEffect, useRef, useState } from "react";
import farmSunrise from "@/assets/farm-sunrise.jpg";
import freeHens from "@/assets/free-hens.jpg";
import eggsBasket from "@/assets/eggs-basket.jpg";

const cards = [
  {
    img: farmSunrise,
    title: "Fazenda ao amanhecer",
    desc: "Cada dia começa com o canto do galo e a luz dourada banhando os campos. É aqui que tudo nasce.",
  },
  {
    img: freeHens,
    title: "Galinhas livres",
    desc: "Nossas galinhas vivem soltas, ciscando pasto natural, banhos de sol e poeira — como a natureza pediu.",
  },
  {
    img: eggsBasket,
    title: "Coleta artesanal",
    desc: "Colhidos um a um, com cuidado de quem entende que o melhor leva tempo. Direto do ninho ao seu lar.",
  },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      className="relative py-32 md:py-44 overflow-hidden bg-gradient-earth"
    >
      {/* Light leak transition from hero */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(38 90% 70% / 0.45) 0%, hsl(38 90% 70% / 0) 70%)",
        }}
      />

      <div ref={ref} className="container relative">
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-primary font-sans-soft">
            A nossa origem
          </span>
          <h2
            className={`mt-4 font-display text-4xl md:text-6xl font-medium leading-tight text-balance transition-all duration-1000 ease-organic ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Onde a vida acontece{" "}
            <span className="italic text-accent">devagar</span>.
          </h2>
          <p
            className={`mt-6 font-serif text-lg md:text-xl text-foreground/70 leading-relaxed transition-all duration-1000 delay-150 ease-organic ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Não somos uma fábrica. Somos uma fazenda. Cada ovo que chega até
            você carrega o som do campo, o cheiro da palha e o tempo certo de
            quem respeita a natureza.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((c, i) => (
            <article
              key={c.title}
              className={`group relative overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-1000 ease-organic ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-organic group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3
                  className="font-display text-2xl font-medium text-cream"
                  style={{ color: "hsl(40 50% 92%)" }}
                >
                  {c.title}
                </h3>
                <p
                  className="mt-2 font-serif text-sm leading-relaxed"
                  style={{ color: "hsl(40 40% 85%)" }}
                >
                  {c.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LightBurst = About;
export default About;
