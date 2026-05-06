import { Leaf, Sun, Sprout, Heart } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Sun, title: "Natural", desc: "Galinhas criadas livres no pasto, ao sol da manhã. Sem confinamento, sem pressa, sem atalhos." },
  { icon: Sprout, title: "Fresco", desc: "Coletados todos os dias antes do meio-dia e entregues diretamente — do ninho à sua mesa em até 24h." },
  { icon: Leaf, title: "Sustentável", desc: "Manejo regenerativo do solo, alimentação orgânica e compromisso real com o equilíbrio da fazenda." },
  { icon: Heart, title: "Cuidado", desc: "Cada ovo carrega o cuidado de quem acorda cedo e vê o sol nascer sobre o ninho. Tradição que se prova no sabor." },
];

export function Quality() {
  return (
    <section id="quality" className="relative py-32 leaf-grid overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <p className="uppercase text-xs tracking-[0.4em] text-primary mb-4">— Nossa promessa —</p>
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-tight">
            Quatro raízes que <span className="italic text-primary">sustentam</span> o nosso ninho.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative organic-card p-10 shadow-organic border border-border/60 hover:border-primary/40 transition-all duration-500"
              >
                <div className="mb-6 inline-grid h-16 w-16 place-items-center rounded-full bg-gradient-golden/20 border border-primary/30 text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-3xl font-medium mb-3">{b.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
                <div className="mt-8 text-xs tracking-[0.3em] text-primary/60 uppercase">
                  0{i + 1} · 04
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
