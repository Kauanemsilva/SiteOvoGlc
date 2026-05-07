import { Hero3D } from "@/components/Hero3D";
import { Header } from "@/components/Header";
import { Origin } from "@/components/Origin";
import { Quality } from "@/components/Quality";
import { LightBurst } from "@/components/LightBurst";
import { Footer } from "@/components/Footer";
import { FeatherCursor } from "@/components/FeatherCursor";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import henNest from "@/assets/hen-nest.jpg";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Terra On — Ovos de qualidade, direto para o seu ninho ";
    const meta =
      document.querySelector('meta[name="description"]') ||
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    meta.setAttribute(
      "content",
      "Ovos caipiras orgânicos do Vale do Ninho. Galinhas criadas livres, ovos colhidos diariamente. Frescor, natureza e tradição em cada casca.",
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <FeatherCursor />
      <Header />

      {/* HERO */}
      <section id="hero" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={henNest}
            alt="Galinha chocando ovos no ninho de palha ao amanhecer"
            width={1920}
            height={1088}
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
          <div className="absolute inset-0 bg-gradient-sun" />
        </div>

        <Hero3D />

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-center max-w-5xl"
          >
            <p className="uppercase text-xs md:text-sm tracking-[0.5em] text-primary mb-5">
              — TerraOn · desde 2026 —
            </p>
            <h1 className="font-display text-5xl md:text-8xl font-medium leading-[0.95]">
              Ovos de{" "}
              <span className="italic text-glow-warm text-primary">
                qualidade
              </span>
              <br />
              para o seu ninho.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-light">
              Ovos selecionados de galinhas felizes, colhidos ao amanhecer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="flex flex-col items-center gap-6 pointer-events-auto"
          >
            <p className="text-muted-foreground text-center text-sm md:text-base italic">
              Toque no ninho.{" "}
              <span className="text-primary not-italic">
                Sinta a vida nascer.
              </span>
            </p>
                  <a
                    href= "https://shopee.com.br/product/540108200/58256953128/"
                    className="btn-organic group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Comprar agora
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground/70">
              <span className="h-px w-8 bg-primary/60" />
              role para descobrir
              <span className="h-px w-8 bg-primary/60" />
            </div>
          </motion.div>
        </div>
      </section>

      <Origin />
      <LightBurst />
      <Quality />
      <Footer />
    </div>
  );
};

export default Index;
