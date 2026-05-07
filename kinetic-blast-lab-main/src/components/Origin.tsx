import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import eggsBasket from "@/assets/eggs-basket.jpg";

export function Origin() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.05, 0.95]);

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      <div className="container relative grid lg:grid-cols-2 gap-20 items-center">
        <motion.div style={{ scale }} className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[40px_8px_40px_8px] border border-border shadow-soft">
            <img
              src={eggsBasket}
              alt="Cesto rústico com ovos orgânicos frescos sobre mesa de madeira"
              loading="lazy"
              width={1080}
              height={1600}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
          {/* floating decorative tag */}
          <motion.div
            style={{ y }}
            className="absolute -top-6 -right-6 md:-right-10 bg-background/90 backdrop-blur-xl border border-primary/30 rounded-full px-6 py-3 shadow-warm"
          >
            <p className="font-display italic text-primary text-lg">colhidos hoje</p>
          </motion.div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="uppercase text-xs tracking-[0.4em] text-secondary mb-6"
          >
            — Nossa origem —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-medium leading-[1.05] mb-8"
          >
            Uma fazenda que <span className="italic text-primary">acorda cedo</span> para você.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              Cuidamos das nossas galinhas como parte da família. Elas vivem soltas,
              ciscam livres no pasto e descansam à sombra das mangueiras — como sempre foi.
            </p>
            <p>
              Cada ovo é colhido à mão, ainda quente do ninho. Da palha ao seu ninho, é uma
              jornada curta — mas cheia de história.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-10 flex items-center gap-6"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
            <p className="font-display italic text-xl text-primary">— Família TerraOn</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
