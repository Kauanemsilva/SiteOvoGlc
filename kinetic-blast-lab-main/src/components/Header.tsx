import { useEffect, useState } from "react";
import { Egg } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-700 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-organic"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex h-20 items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-golden shadow-warm group-hover:scale-110 transition-transform duration-500">
            <Egg className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
          </span>
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
           Terra <span className="italic text-primary">On</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-10 text-sm">
          {[
            { l: "Início", h: "#hero" },
            { l: "Sobre", h: "#about" },
            { l: "Qualidade", h: "#quality" },
            { l: "Contato", h: "#contact" },
          ].map((item) => (
            <li key={item.l}>
              <a
                href={item.h}
                className="relative text-foreground/80 hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.l}
              </a>
            </li>
          ))}
        </ul>

        <a href= "https://shopee.com.br/product/540108200/58256953128/"  target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex btn-organic !px-6 !py-2.5 !text-sm">
          Comprar agora
        </a>
      </nav>
    </header>
  );
}
