import { Instagram, Facebook, Mail, Egg } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative bg-gradient-earth text-background pt-24 pb-10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute inset-0 grain-overlay opacity-30" />

      <div className="container relative">
        <div className="grid md:grid-cols-3 gap-14 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-golden shadow-warm">
                <Egg className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
              </span>
              <span className="font-display text-3xl text-background">
                Vale do <span className="italic text-primary-glow">Ninho</span>
              </span>
            </div>
            <p className="text-background/70 max-w-sm leading-relaxed">
              Ovos caipiras de galinhas felizes, criadas livres ao sol. Da nossa fazenda direto para a sua mesa, com o cuidado de três gerações.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xl mb-5 text-primary-glow">Navegue</h4>
            <ul className="space-y-3 text-background/70">
              {[
                { l: "Início", h: "#hero" },
                { l: "Nossa origem", h: "#about" },
                { l: "Qualidade", h: "#quality" },
                { l: "Onde encontrar", h: "#contact" },
              ].map((l) => (
                <li key={l.l}>
                  <a href={l.h} className="hover:text-primary-glow transition-colors">{l.l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl mb-5 text-primary-glow">Conecte-se</h4>
            <div className="flex gap-3 mb-6">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="rede social"
                  className="grid h-12 w-12 place-items-center rounded-full border border-background/20 hover:border-primary-glow hover:bg-primary/10 transition-all hover:-translate-y-1 duration-500"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </a>
              ))}
            </div>
            <p className="font-display italic text-primary-glow text-lg">
              "O sol que nasce na fazenda, brilha no seu café da manhã."
            </p>
          </div>
        </div>

        <div className="border-t border-background/15 pt-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-background/50">
          <p>© 2026 Vale do Ninho · Todos os direitos reservados</p>
          <p className="italic">Feito com cuidado, no campo.</p>
        </div>
      </div>
    </footer>
  );
}
