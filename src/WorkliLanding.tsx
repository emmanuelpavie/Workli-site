import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, LogIn, Users, Menu, X, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default function WorkliLanding() {
  const [locOpen, setLocOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState("תל־אביב");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const locations = ["תל־אביב","ירושלים","רמת גן","ראשון לציון","חולון","פתח תקווה"];

  const works = [
    { title: "עוד - בעתיד", image: "https://source.unsplash.com/1200x800/?under-construction", disabled: true },
    { title: "עבודות טיח", image: "https://source.unsplash.com/1200x800/?plaster,construction", disabled: true },
    { title: "עבודות צבע", image: "https://source.unsplash.com/1200x800/?painting,wall,roller", disabled: true },
    { title: "עבודות ריצוף וחיפוי", image: "https://source.unsplash.com/1200x800/?tiling,floor,construction", disabled: true },
    { title: "עבודות שלד", image: "https://source.unsplash.com/1200x800/?rebar,concrete,framework", disabled: false },
    { title: "עבודות גבס", image: "https://source.unsplash.com/1200x800/?drywall,gypsum,construction", disabled: false },
  ];

  const updateArrows = () => {
    const el = scrollRef.current; if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 5);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current; if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows as any);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByCard = (dir: "left" | "right") => {
    const container = scrollRef.current; if (!container) return;
    const firstCard = container.querySelector<HTMLDivElement>("[data-card]"); if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth; const gap = 24; const amount = cardWidth + gap;
    const delta = dir === "left" ? -amount : amount;
    (container as any).scrollBy({ left: delta, behavior: "smooth" });
    setTimeout(updateArrows, 350);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-gray-100">
        <div className="relative">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="mx-auto max-w-6xl px-4 h-16">
            <div className="grid grid-cols-3 items-center h-full gap-4">
              <div className="flex items-center gap-4 justify-start">
                <a href="#" className="font-semibold text-xl tracking-tight">
                  Workli
                  <span className="ml-2 align-middle text-[10px] text-white bg-gray-900 rounded px-1.5 py-0.5 opacity-80">BETA</span>
                </a>

                <div className="relative hidden md:block">
                  <button onClick={() => setLocOpen((v) => !v)} className="group inline-flex items-center gap-2 text-sm px-0 py-2 border-0 bg-transparent hover:opacity-80">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">בחר אזור:</span>
                    <span>{location}</span>
                    <ChevronDown className={`w-4 h-4 transition ${locOpen ? "rotate-180" : ""}`} />
                  </button>

                  {locOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                      <ul className="max-h-72 overflow-auto py-1">
                        {locations.map((loc) => (
                          <li key={loc}>
                            <button onClick={() => { setLocation(loc); setLocOpen(false); }} className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-50 ${loc === location ? "bg-gray-50" : ""}`}>
                              {loc}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <nav className="hidden lg:flex items-center justify-center gap-6 text-sm font-medium">
                <a href="#about" className="hover:text-gray-700">מי אנחנו</a>
                <a href="#how" className="hover:text-gray-700">איך זה עובד</a>
                <a href="#contact" className="hover:text-gray-700">צור קשר</a>
              </nav>

              <div className="hidden lg:flex items-center gap-3 justify-end">
                <a className="text-sm inline-flex items-center gap-1 px-2 hover:underline" href="#pros">
                  <Users className="w-4 h-4" /> עובדים/אנשי מקצוע
                </a>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 transition">
                  <LogIn className="w-4 h-4" /> כניסה
                </button>
                <a className="rounded-2xl px-4 py-2 text-sm font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition shadow" href="#signup">
                  הרשמה
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Filter className="w-5 h-5" />
          <span className="text-sm">כל המקצועות</span>
        </div>

        <h1 className="text-4xl font-bold text-right mb-8">Workli – HERO</h1>

        <div className="relative">
          {canRight && (
            <button type="button" onClick={() => scrollByCard("right")} className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow rounded-full p-2 hover:shadow-md pointer-events-auto" aria-label="הבא">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          {canLeft && (
            <button type="button" onClick={() => scrollByCard("left")} className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white shadow rounded-full p-2 hover:shadow-md pointer-events-auto" aria-label="הקודם">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div dir="ltr" ref={scrollRef} onWheel={() => setTimeout(updateArrows, 0)} className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 no-scrollbar relative z-10">
            {works.map((w) => (
              <div key={w.title} data-card className={`relative rounded-2xl overflow-hidden shadow-lg w-[360px] h-96 flex-shrink-0 group snap-start ${w.disabled ? "bg-gray-100 grayscale" : "bg-gradient-to-br from-cyan-200 to-cyan-400"}`}>
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition pointer-events-none" style={{ backgroundImage: `url(${w.image})` }}></div>

                <div className="relative z-10 flex flex-col justify-between h-full p-6" dir="rtl">
                  <h2 className="text-2xl font-bold mb-4">{w.title}</h2>

                  <div className={`mt-auto space-y-4 ${w.disabled ? "opacity-80" : ""}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`px-3 py-2 rounded-lg border border-dashed text-sm font-medium ${w.disabled ? "bg-white/80 border-gray-300 text-gray-500" : "bg-cyan-50 border-cyan-400 text-cyan-700 font-semibold shadow ring-1 ring-cyan-200"}`}>
                        החל מ־₪250 למ"ר
                      </span>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm ${w.disabled ? "bg-white/70 border-gray-200 text-gray-500" : "bg-white/80 border-cyan-200 text-cyan-700"}`}>
                        {w.disabled ? (<>בקרוב</>) : (<><span className="relative inline-flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span>זמין למחר</>)}
                      </span>
                    </div>

                    <button className={`w-full rounded-xl font-semibold py-2 transition relative overflow-hidden ${w.disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/40 ring-1 ring-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"}`}>
                      הזמן עכשיו
                      {w.disabled && (<span className="absolute inset-0 flex items-center justify-center text-sm text-gray-700 bg-white/80 opacity-0 group-hover:opacity-100 transition">בהרצה – יהיה זמין בהמשך</span>)}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
