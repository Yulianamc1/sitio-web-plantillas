import { motion } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  Gift,
  Download,
  Edit3,
  Printer,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Zap,
  Heart,
  Info,
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Users,
  Package,
  Sticker,
  Coffee,
  Shirt,
  Puzzle,
  Sparkles
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const TopBar = () => {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedEndTime = localStorage.getItem('promoEndTime');
    let endTime;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime, 10);
    } else {
      endTime = Date.now() + 7200 * 1000; // 2 hours
      localStorage.setItem('promoEndTime', endTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(difference);

      if (difference === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white border-b border-purple-100 ${isScrolled ? 'py-2 shadow-md' : 'py-3 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <div className="flex items-center gap-2">
          {timeLeft > 0 ? (
            <div className="bg-pink-100 text-pink-700 font-bold px-4 py-1.5 rounded-full text-sm md:text-base border border-pink-300 shadow-sm flex items-center gap-2">
              <span>⏳ Oferta termina en:</span>
              <span className="font-black font-mono text-base md:text-lg">{formatTime(timeLeft)}</span>
            </div>
          ) : (
            <div className="bg-gray-100 text-gray-500 font-bold px-4 py-1.5 rounded-full text-sm md:text-base border border-gray-200">
              Promoción finalizada
            </div>
          )}
        </div>
        
        <a
          href={timeLeft > 0 ? "https://pay.hotmart.com/B104505220G" : "#"}
          target={timeLeft > 0 ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-colors text-sm md:text-base shadow-sm ${timeLeft === 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
        >
          Comprar ahora
        </a>
      </div>
    </div>
  );
};

const Countdown = ({ text = "⏳ Promoción termina en:", expiredText = "Promoción finalizada" }) => {
  const [timeLeft, setTimeLeft] = useState(7200);

  useEffect(() => {
    const savedEndTime = localStorage.getItem('promoEndTime');
    let endTime;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime, 10);
    } else {
      endTime = Date.now() + 7200 * 1000;
      localStorage.setItem('promoEndTime', endTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(difference);

      if (difference === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  if (timeLeft === 0) {
    return (
      <div className="inline-block bg-gray-100 text-gray-500 font-bold px-6 py-3 rounded-full border border-gray-200">
        {expiredText}
      </div>
    );
  }

  return (
    <div className="inline-block bg-pink-100/90 backdrop-blur-sm text-pink-700 font-black px-6 py-3 rounded-full border-2 border-pink-300 shadow-md">
      {text} <span className="font-mono text-xl md:text-2xl ml-2">{formatTime(timeLeft)}</span>
    </div>
  );
};

const CTAButton = ({ text = "QUIERO MI PROMOCIÓN AHORA", className = "" }) => (
  <div className="flex flex-col items-center w-full">
    <motion.a
      href="https://pay.hotmart.com/B104505220G"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex flex-col items-center justify-center text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xl md:text-2xl py-4 px-8 md:px-12 rounded-full shadow-[0_10px_25px_rgba(219,39,119,0.5)] hover:shadow-[0_15px_35px_rgba(147,51,234,0.6)] transition-all duration-300 w-full md:w-auto ${className}`}
    >
      <span>{text}</span>
      <span className="text-sm md:text-base font-medium mt-1 opacity-90 flex items-center gap-1">
        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /> (Compra 100% segura) <span className="text-red-300 font-bold ml-1">+ Más IVA</span>
      </span>
    </motion.a>
    <span className="mt-3 text-red-600 font-black text-lg md:text-xl uppercase tracking-wide bg-yellow-200 px-4 py-1 rounded-full shadow-sm">
      Entrega Inmediata
    </span>
  </div>
);

const SectionHeading = ({ title, subtitle, dark = false }: { title: string, subtitle?: string, dark?: boolean }) => (
  <div className="text-center mb-12 md:mb-16">
    <h2 className={`text-3xl md:text-5xl font-black mb-4 leading-tight ${dark ? 'text-white' : 'text-purple-950'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg md:text-xl max-w-2xl mx-auto ${dark ? 'text-purple-200' : 'text-gray-600'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-purple-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-6 flex justify-between items-center focus:outline-none"
      >
        <h3 className="text-lg md:text-xl font-bold text-purple-900 pr-4">{question}</h3>
        {isOpen ? <ChevronUp className="text-pink-500 flex-shrink-0" /> : <ChevronDown className="text-pink-500 flex-shrink-0" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

const Carousel = ({ items, reverse = false }: { items: {title: string, img: string}[], reverse?: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        if (reverse) {
          if (scrollLeft <= 0) {
            scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
          }
        } else {
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [reverse]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full mb-8">
      <button onClick={() => scroll('left')} className="hidden md:flex items-center justify-center bg-white w-12 h-12 rounded-full shadow-lg text-purple-600 hover:bg-purple-50 hover:scale-110 transition-all z-10 absolute left-0 top-1/2 -translate-y-1/2 -ml-6 border border-purple-100">
        <ChevronLeft className="w-8 h-8" />
      </button>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-4 px-4 w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, i) => (
          <div key={i} className="min-w-[260px] md:min-w-[320px] snap-center flex-shrink-0 bg-white rounded-3xl shadow-md border border-purple-100 overflow-hidden group">
            <div className="h-56 md:h-64 overflow-hidden relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              {item.title && (
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <span className="inline-block bg-white/20 backdrop-blur-md text-white font-bold px-4 py-1.5 rounded-full text-sm border border-white/30 shadow-sm">
                    {item.title}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => scroll('right')} className="hidden md:flex items-center justify-center bg-white w-12 h-12 rounded-full shadow-lg text-purple-600 hover:bg-purple-50 hover:scale-110 transition-all z-10 absolute right-0 top-1/2 -translate-y-1/2 -mr-6 border border-purple-100">
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
};

export default function App() {
  const carouselItems1 = [
    { title: "", img: "https://i.imgur.com/ZE8zGz4.png" },
    { title: "", img: "https://i.imgur.com/tCpPGRr.png" },
    { title: "", img: "https://i.imgur.com/RvPNjSI.jpeg" },
    { title: "", img: "https://i.imgur.com/zrvrmSp.jpeg" },
    { title: "", img: "https://i.imgur.com/Ox9cQtP.jpeg" },
    { title: "", img: "https://i.imgur.com/sgJcF9K.jpeg" },
    { title: "", img: "https://i.imgur.com/ZYG5FAS.jpeg" },
    { title: "", img: "https://i.imgur.com/3tSxwmO.jpeg" },
  ];

  const carouselItems2 = [
    { title: "", img: "https://i.imgur.com/hEYM3xH.png" },
    { title: "", img: "https://i.imgur.com/7LFJMHC.png" },
    { title: "", img: "https://i.imgur.com/T6s5itN.png" },
    { title: "", img: "https://i.imgur.com/1jskhuX.jpeg" },
    { title: "", img: "https://i.imgur.com/4H6oXJG.jpeg" },
    { title: "", img: "https://i.imgur.com/2orWqKa.jpeg" },
    { title: "", img: "https://i.imgur.com/00y5XKU.jpeg" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden pt-16 md:pt-20">
      <TopBar />
      
      {/* SECCIÓN 1 — HERO */}
      <section className="relative pt-10 pb-24 md:pt-16 md:pb-32 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2000&auto=format&fit=crop" 
            alt="Papelería creativa" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-50/90 via-white/95 to-purple-50/90 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 text-white font-bold text-base md:text-lg mb-8 shadow-md border border-purple-500">
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              Para emprendedoras creativas en México
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-purple-950 leading-[1.2] tracking-tight max-w-5xl mx-auto">
              Más de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">1700 plantillas y páginas</span> listas para que puedas crear y vender en estas temporadas desde casa fácilmente: <span className="text-pink-600 block mt-2">Día del Niño, Día del Maestro, Día de las Madres y Día del Padre</span>
            </h1>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 text-center lg:text-left"
            >
              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Edita fácilmente en Canva, personaliza los diseños y crea productos para vender o regalar (recupera tu inversión con tus primeras ventas)
              </p>
              
              <div className="mb-12 flex flex-col items-center lg:items-start">
                <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl border border-pink-100 shadow-sm mb-6 inline-flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  <div>
                    <p className="text-gray-500 line-through text-lg">Valor real: <span className="underline">22 USD</span></p>
                    <p className="text-2xl font-black text-pink-600 flex items-center justify-center lg:justify-start gap-2">
                      🔥 Precio especial: 5.99 USD
                    </p>
                    <p className="text-sm text-red-600 text-center lg:text-left mt-1 font-bold">+ Más IVA</p>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-pink-200"></div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                    <ShieldCheck className="w-6 h-6" />
                    Compra 100% Segura
                  </div>
                </div>
                <CTAButton />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 w-full max-w-lg lg:max-w-none flex flex-col justify-center overflow-hidden"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-purple-950 mb-2">Mira ejemplos de lo que vas a poder crear</h3>
                <p className="text-gray-600 font-medium">Diseños listos para editar en Canva y vender en temporadas altas.</p>
              </div>
              <Carousel items={carouselItems1} />
              <Carousel items={carouselItems2} reverse={true} />
            </motion.div>
          </div>

          {/* Mockups Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto mt-12"
          >
            {[
              { text: 'Cajitas', icon: Package },
              { text: 'Stickers', icon: Sticker },
              { text: 'Tazas', icon: Coffee },
              { text: 'Playeras', icon: Shirt },
              { text: 'Rompecabezas', icon: Puzzle },
              { text: 'Personalizados', icon: Sparkles }
            ].map((item, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-purple-100 flex flex-col items-center justify-center aspect-square hover:shadow-md transition-shadow">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-2">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                </div>
                <span className="font-bold text-purple-900 text-sm text-center">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NUEVA SECCIÓN — CARRUSELES */}
      <section className="py-20 px-4 bg-purple-50/50 border-y border-purple-100 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <img 
              src="https://i.imgur.com/JwCFTgW.jpeg" 
              alt="Kit Papelería Creativa" 
              className="w-full max-w-2xl mix-blend-multiply transform hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="text-center mt-12">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* SECCIÓN 6 — TODO LO QUE INCLUYE EL KIT */}
      <section className="py-24 px-4 bg-fuchsia-50/30">
        <div className="max-w-6xl mx-auto">
          <SectionHeading 
            title="Todo lo que incluye tu Kit por Temporadas" 
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Temporada 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <h3 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3">
                <span className="bg-pink-100 text-pink-600 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm">1</span>
                Día del Niño <span className="text-4xl md:text-5xl ml-1">🎈</span>
              </h3>
              <ul className="space-y-3">
                {[
                  { text: 'Cajitas para dulces y regalos', emoji: '🎁' },
                  { text: 'Cajitas para huevito kinder', emoji: '🥚' },
                  { text: 'Etiquetas estilo Hot Wheels', emoji: '🏎️' },
                  { text: 'Etiquetas para duvalín', emoji: '🍫' },
                  { text: 'Juego UNO especial', emoji: '🃏' },
                  { text: 'Álbum con stickers', emoji: '📒' },
                  { text: 'Cajitas estilo Play-Doh', emoji: '🎨' },
                  { text: 'Libros para colorear', emoji: '🖍️' },
                  { text: 'Libros para colorear interactivos', emoji: '✨' },
                  { text: 'Máscaras de personajes', emoji: '🎭' },
                  { text: 'Rompecabezas', emoji: '🧩' },
                  { text: 'Stickers', emoji: '⭐' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-lg leading-none">{item.emoji}</span>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Temporada 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <h3 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3">
                <span className="bg-rose-100 text-rose-600 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm">2</span>
                Día de las Madres <span className="text-4xl md:text-5xl ml-1">💐</span>
              </h3>
              <ul className="space-y-3">
                {[
                  { text: 'Cajitas para dulces, bisutería y regalos', emoji: '💝' },
                  { text: 'Diseños para playeras', emoji: '👕' },
                  { text: 'Calendarios del día de las madres', emoji: '📅' },
                  { text: 'Cuadros decorativos', emoji: '🖼️' },
                  { text: 'Rompecabezas', emoji: '🧩' },
                  { text: 'Cuadros editables de corazón', emoji: '❤️' },
                  { text: 'Diseños para tazas', emoji: '☕' },
                  { text: 'Blisters', emoji: '🏷️' },
                  { text: 'Álbum de stickers', emoji: '📒' },
                  { text: 'Portachocolates', emoji: '🍫' },
                  { text: 'Juego UNO especial', emoji: '🃏' },
                  { text: 'Portaflores', emoji: '🌹' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-lg leading-none">{item.emoji}</span>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Temporada 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <h3 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3">
                <span className="bg-amber-100 text-amber-600 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm">3</span>
                Día del Maestro <span className="text-4xl md:text-5xl ml-1">🍎</span>
              </h3>
              <ul className="space-y-3">
                {[
                  { text: 'Cajitas para dulces y regalos', emoji: '🎁' },
                  { text: 'Diseños para playeras', emoji: '👕' },
                  { text: 'Etiquetas estilo Hot Wheels', emoji: '🏎️' },
                  { text: 'Álbum especial', emoji: '📒' },
                  { text: 'Blisters', emoji: '🏷️' },
                  { text: 'Diseños para tazas', emoji: '☕' },
                  { text: 'Portachocolates', emoji: '🍫' },
                  { text: 'Portaflores', emoji: '🌹' },
                  { text: 'Rompecabezas', emoji: '🧩' },
                  { text: 'Juego UNO especial', emoji: '🃏' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-lg leading-none">{item.emoji}</span>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Temporada 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <h3 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm">4</span>
                Día del Padre <span className="text-4xl md:text-5xl ml-1">👔</span>
              </h3>
              <ul className="space-y-3">
                {[
                  { text: 'Cajitas para regalos y detalles', emoji: '🎁' },
                  { text: 'Etiquetas estilo Hot Wheels', emoji: '🏎️' },
                  { text: 'Cuadros editables', emoji: '🖼️' },
                  { text: 'Diseño para six de cerveza', emoji: '🍻' },
                  { text: 'Cajitas de corbata', emoji: '👔' },
                  { text: 'Cajitas de cigarros', emoji: '🚬' },
                  { text: 'Cuadros y láminas decorativas', emoji: '🎨' },
                  { text: 'Álbum de stickers', emoji: '📒' },
                  { text: 'Blisters para tazas', emoji: '🏷️' },
                  { text: 'Diseños para tazas', emoji: '☕' },
                  { text: 'Cajitas estilo Netflix, HBO, Prime y Disney', emoji: '📺' },
                  { text: 'Portachocolates', emoji: '🍫' },
                  { text: 'Diseños para playeras', emoji: '👕' },
                  { text: 'Rompecabezas', emoji: '🧩' },
                  { text: 'Juego UNO', emoji: '🃏' },
                  { text: 'Cajitas para dulces', emoji: '🍬' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-lg leading-none">{item.emoji}</span>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — IDENTIFICACIÓN DEL PROBLEMA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="¿Te suena familiar alguna de estas situaciones?" />
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "No saber qué vender en temporadas.",
              "No saber diseñar.",
              "No tener ideas de productos.",
              "Perder tiempo creando diseños desde cero.",
              "Querer emprender desde casa pero no saber por dónde empezar."
            ].map((problem, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex items-start gap-4 p-6 rounded-2xl bg-red-50/50 border border-red-100"
              >
                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700 font-medium">{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — PRESENTACIÓN DEL KIT */}
      <section className="py-20 px-4 bg-purple-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-pink-300">
            La solución perfecta para tu emprendimiento
          </h2>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed text-purple-100">
            El kit incluye <strong className="text-white">más de 1700 plantillas y páginas editables en Canva</strong> listos para personalizar y vender.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Cero Experiencia", desc: "No necesitas experiencia en diseño." },
              { title: "Fácil de Editar", desc: "Puedes editar fácilmente en Canva." },
              { title: "Crea Rápido", desc: "Puedes empezar a crear productos rápidamente." }
            ].map((feature, i) => (
              <div key={i} className="bg-purple-900/50 p-8 rounded-3xl border border-purple-800 backdrop-blur-sm">
                <CheckCircle2 className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-purple-200">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          <CTAButton className="shadow-[0_0_40px_rgba(219,39,119,0.4)]" />
        </div>
      </section>

      {/* SECCIÓN 4 — ¿POR QUÉ ESTE KIT ES PERFECTO PARA TI? */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="¿Por qué este Kit es perfecto para ti?" />
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "No necesitas saber diseñar",
              "Todo se edita en Canva (fácil)",
              "Puedes cambiar texto, colores y tamaño en muchos de los diseños",
              "Ideal para emprender desde casa",
              "Puedes crear productos personalizados para vender o regalar"
            ].map((benefit, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                key={i} 
                className="flex items-center gap-4 p-6 rounded-2xl bg-purple-50 border border-purple-100"
              >
                <Heart className="w-8 h-8 text-pink-500 flex-shrink-0 fill-pink-100" />
                <p className="text-lg text-purple-950 font-bold">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 7 — CÓMO FUNCIONA */}
      <section className="py-20 px-4 bg-purple-900 text-white">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Empezar es así de fácil" dark />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-purple-700 -translate-y-1/2 z-0"></div>
            
            {[
              { icon: Gift, title: "1. Compras el kit" },
              { icon: Download, title: "2. Recibes acceso inmediato" },
              { icon: MousePointerClick, title: "3. Abres las plantillas en Canva" },
              { icon: Edit3, title: "4. Editas o personalizas" },
              { icon: Printer, title: "5. Imprimes o vendes tus productos" }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(236,72,153,0.5)] border-4 border-purple-900">
                  <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 8 — BONOS */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 uppercase tracking-widest mb-12 drop-shadow-sm">
            REGALOS EXCLUSIVOS
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-pink-200 relative flex flex-col h-full">
              <div className="absolute -top-5 -right-5 bg-pink-500 text-white font-bold w-16 h-16 rounded-full flex items-center justify-center rotate-12 shadow-lg">
                GRATIS
              </div>
              <h3 className="text-2xl font-black text-purple-900 mb-4">BONO 1</h3>
              <p className="text-xl font-bold text-gray-800 mb-4">Calculadora de Precios</p>
              <p className="text-gray-600 mb-6 flex-grow">Calculadora para poner precios correctos a tus productos.</p>
              <div className="flex items-center justify-center gap-3 bg-pink-50 py-3 px-4 rounded-xl border border-pink-100 mt-auto">
                <span className="text-gray-400 line-through font-medium text-lg">$50 MXN</span>
                <span className="text-pink-600 font-black text-xl">¡Ahora $0!</span>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-pink-200 relative flex flex-col h-full">
              <div className="absolute -top-5 -right-5 bg-pink-500 text-white font-bold w-16 h-16 rounded-full flex items-center justify-center rotate-12 shadow-lg">
                GRATIS
              </div>
              <h3 className="text-2xl font-black text-purple-900 mb-4">BONO 2</h3>
              <p className="text-xl font-bold text-gray-800 mb-4">Mini Guía de Ventas</p>
              <p className="text-gray-600 mb-6 flex-grow">Mini guía para vender papelería creativa.</p>
              <div className="flex items-center justify-center gap-3 bg-pink-50 py-3 px-4 rounded-xl border border-pink-100 mt-auto">
                <span className="text-gray-400 line-through font-medium text-lg">$50 MXN</span>
                <span className="text-pink-600 font-black text-xl">¡Ahora $0!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 10 — OFERTA Y CTA FINAL */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900 to-purple-950 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
              Una oferta que no volverás a ver
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-10 border border-white/20 relative">
              <div className="flex flex-col items-center justify-center mb-4">
                <p className="text-xl text-purple-200 mb-2">Valor real del contenido:</p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl text-gray-400 line-through">~~<span className="underline">22 USD</span>~~</p>
                </div>
              </div>
              <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300 mb-2 drop-shadow-sm flex flex-col md:flex-row items-center justify-center gap-4">
                <span className="text-4xl md:text-5xl text-white">🔥 Precio especial hoy:</span>
                <span>5.99 <span className="text-3xl">USD</span></span>
              </div>
              <p className="text-xl text-red-500 mb-6 font-bold">+ Más IVA</p>
              
              <div className="mt-8 mb-6">
                <Countdown text="⏳ Esta promoción expira en:" />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-900/40 px-4 py-2 rounded-xl border border-emerald-500/30">
                  <ShieldCheck className="w-6 h-6" />
                  Compra 100% Segura
                </div>
                <div className="flex items-center gap-2 text-blue-400 font-bold bg-blue-900/40 px-4 py-2 rounded-xl border border-blue-500/30">
                  <ShieldCheck className="w-6 h-6" />
                  Garantía de 7 Días
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <CTAButton className="text-2xl py-5 px-10 shadow-[0_0_40px_rgba(219,39,119,0.5)] w-full md:w-auto" />
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-blue-400/30 text-left shadow-2xl relative overflow-hidden mt-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                <div className="bg-white/20 p-5 rounded-full flex-shrink-0 shadow-inner">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-white font-black text-2xl md:text-3xl mb-4 drop-shadow-md">¡Únete a nuestra Comunidad Exclusiva!</h4>
                  <p className="text-blue-50 text-lg md:text-xl leading-relaxed font-medium">
                    Podrán acceder a nuestra Página y Grupo de Facebook en donde subimos cursos gratis, plantillas de regalo de bienvenida, tips y podrá interactuar con la comunidad de personas que también hacen Papelería Creativa y Sublimación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5 — IMPORTANTE */}
      <section className="py-16 px-4 bg-pink-50 border-y border-pink-100">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-pink-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-pink-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-purple-950">
              ¿QUÉ SIGNIFICA QUE EL KIT INCLUYE MÁS DE 1700 PLANTILLAS?
            </h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-6 font-medium">
            Muchos de los productos incluyen múltiples páginas o elementos editables.
          </p>
          
          <div className="bg-purple-50 rounded-2xl p-6 mb-6">
            <p className="font-bold text-purple-900 mb-3">Por ejemplo:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                Un libro para colorear puede incluir muchas páginas diferentes.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                Los juegos incluyen diferentes piezas.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                Las cajitas incluyen varias partes para armar.
              </li>
            </ul>
          </div>
          
          <p className="text-lg text-gray-800 font-bold bg-pink-100/50 p-4 rounded-xl border border-pink-200">
            Sumando todas las páginas y diseños incluidos, el kit contiene más de 1700 elementos y páginas que pueden editarse o utilizarse dentro de Canva.
          </p>
        </div>
      </section>

      {/* SECCIÓN 9 — PREGUNTAS FRECUENTES */}
      <section className="py-20 px-4 bg-fuchsia-50">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Preguntas Frecuentes" />
          
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-purple-100">
            <FAQItem 
              question="¿Necesito Canva Pro?" 
              answer={`No necesariamente.\nMuchas plantillas utilizan elementos gratuitos de Canva.\n\nAlgunas pueden incluir elementos de Canva Pro, pero estos pueden reemplazarse fácilmente por elementos gratuitos disponibles dentro de Canva.`} 
            />
            <FAQItem 
              question="¿Las plantillas se pueden editar?" 
              answer={`La mayoría de los diseños son editables dentro de Canva.\n\nEn algunos casos, ciertos elementos funcionan como imágenes (por ejemplo algunos diseños gráficos), por lo que pueden modificarse en tamaño o posición, pero no separarse en partes individuales.`} 
            />
            <FAQItem 
              question="¿Puedo vender los productos que haga con estas plantillas?" 
              answer={`Sí.\nPuedes usar estas plantillas para crear productos personalizados para vender o regalar.`} 
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-purple-950 text-purple-300 py-10 text-center px-4">
        <p className="mb-4">© {new Date().getFullYear()} Kit Papelería Creativa. Todos los derechos reservados.</p>
        <p className="text-sm opacity-70 max-w-2xl mx-auto">
          Este sitio no es parte del sitio web de Facebook o Facebook Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca registrada de FACEBOOK, Inc.
        </p>
      </footer>
    </div>
  );
}
