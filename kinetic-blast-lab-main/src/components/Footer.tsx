import { Heart ,Phone, Mail, Egg } from "lucide-react";

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
                Terra <span className="italic text-primary-glow">On</span>
              </span>
            </div>
            <p className="text-background/70 max-w-sm leading-relaxed">
              Ovos selecionados de galinhas felizes, criadas livres ao sol. Da nossa fazenda direto para o seu ninho, com o cuidado de gerações.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xl mb-5 text-primary-glow">Navegue</h4>
            <ul className="space-y-3 text-background/70">
              {[
                { l: "Início", h: "#hero" },
                { l: "Nossa origem", h: "#about" },
                { l: "Qualidade", h: "#quality" },
                {   l: "Onde encontrar",
                    h: "https://shopee.com.br/product/540108200/58256953128/", },
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
               {[ Heart ,Phone, Mail].map((Icon, i) => {
                 const links = [
                   "https://shopee.com.br/product/540108200/58256953128/",
                    "https://wa.me/5511959115896?text=%F0%9F%90%94Ol%C3%A1!%20Vi%20que%20voc%C3%AAs%20trabalham%20com%20ovos%20e%20fiquei%20interessado.%20Pode%20me%20explicar%20as%20op%C3%A7%C3%B5es%20dispon%C3%ADveis%20e%20como%20fa%C3%A7o%20pra%20comprar?" ,
                    "mailto:danielparanbarbosa@gmail.com",
                 ];
             
                 return (
                   <a
                     key={i}
                     href={links[i]}
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="rede social"
                     className="grid h-12 w-12 place-items-center rounded-full border border-background/20              hover:border-primary-glow hover:bg-primary/10 transition-all hover:-translate-y-1              duration-500"
                   >
                     <Icon size={20} />
                   </a>
                 );
               })}
             </div>
            <p className="font-display italic text-primary-glow text-lg">
              "Trabalho de verdade, feito com atenção em cada detalhe."
            </p>
          </div>
        </div>

        <div className="border-t border-background/15 pt-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-background/50">
          <p>© 2026 TerraOn · Todos os direitos reservados</p>
          <p className="italic">Feito com cuidado.</p>
        </div>
      </div>
    </footer>
  );
}
