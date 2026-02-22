/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Timer, 
  CheckCircle2, 
  Download, 
  Edit3, 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp,
  Star,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Calculator,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const HOTMART_URL = "https://pay.hotmart.com/B104505220G";
const PRE_SALE_DEADLINE = new Date('2026-03-15T23:59:59-06:00'); // Mexico Time

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Countdown Logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +PRE_SALE_DEADLINE - +new Date();
      let timeLeftObj = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeftObj = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeftObj;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBuyClick = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      window.open(HOTMART_URL, '_blank');
      setIsModalOpen(false);
    }, 2000);
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-100 selection:text-pink-600">
      
      {/* 1. Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-bottom border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-pink-600 font-bold text-sm md:text-base">
            <Zap className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">Oferta termina en:</span>
            <div className="flex gap-1 font-mono bg-pink-50 px-2 py-1 rounded text-pink-700">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
              <span>{timeLeft.minutes}m</span>
              <span className="w-6">{timeLeft.seconds}s</span>
            </div>
          </div>
          <button 
            onClick={() => scrollToId('cta-final')}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-pink-200 active:scale-95"
          >
            Comprar ahora
          </button>
        </div>
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="relative pt-12 pb-20 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-pink-100/50 to-transparent rounded-full blur-3xl -z-10" />
          
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-2.5 rounded-full text-lg md:text-xl font-bold uppercase tracking-wider">
                <Star className="w-5 h-5 fill-current" />
                PREVENTA EXCLUSIVA
              </div>
              <span className="text-purple-600 font-bold text-base md:text-lg">
                (Disponibles a partir del 16 de marzo)
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
            >
              Kit de Plantillas Editables en Canva para Temporada Alta: <br />
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Día del Niño, Maestro, Madres y Padres
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
            >
              Un kit completo de plantillas listas para personalizar que puede pagarse solo con tu primera o segunda venta. ¡Ahorra tiempo y maximiza tus ingresos!
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-slate-400 line-through text-xl">$99 MXN</span>
                <span className="text-5xl font-extrabold text-slate-900">$79 MXN</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button 
                  onClick={handleBuyClick}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-pink-200 transition-all active:scale-95"
                >
                  ¡Quiero mi kit en preventa!
                </button>
                <button 
                  onClick={() => scrollToId('contenido')}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
                >
                  Ver lo que incluye
                </button>
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8"
            >
              {[
                { icon: Clock, text: "Acceso inmediato", subtext: "(a partir del 16 de marzo)" },
                { icon: Edit3, text: "Listo para editar" },
                { icon: Zap, text: "Diseños por temporada" }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-1 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2">
                    <badge.icon className="w-5 h-5 text-pink-500" />
                    <span className="font-semibold text-sm">{badge.text}</span>
                  </div>
                  {badge.subtext && (
                    <span className="text-[10px] text-slate-500 font-medium">{badge.subtext}</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Pasarela de Imágenes (Marquee) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 -mx-4 md:-mx-8 relative overflow-hidden flex flex-col gap-4 md:gap-6"
            >
              {/* Gradient Overlays for smooth fade */}
              <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20" />
              <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-20" />
              
              {/* Fila 1: Hacia la izquierda */}
              <motion.div 
                className="flex gap-4 md:gap-6 w-max px-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {[
                  "https://i.imgur.com/PeCYTZD.jpeg",
                  "https://i.imgur.com/oIqy3bJ.jpeg",
                  "https://i.imgur.com/XNtwwIr.jpeg",
                  "https://i.imgur.com/PeCYTZD.jpeg",
                  "https://i.imgur.com/PeCYTZD.jpeg",
                  "https://i.imgur.com/oIqy3bJ.jpeg",
                  "https://i.imgur.com/XNtwwIr.jpeg",
                  "https://i.imgur.com/PeCYTZD.jpeg"
                ].map((src, i) => (
                  <div 
                    key={i} 
                    className="w-48 md:w-72 aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-white shrink-0"
                  >
                    <img 
                      src={src} 
                      alt={`Muestra A-${i}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Fila 2: Hacia la derecha (Dirección contraria) */}
              <motion.div 
                className="flex gap-4 md:gap-6 w-max px-4"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {[
                  "https://i.imgur.com/s3TdrYK.png",
                  "https://i.imgur.com/mYIOMm3.png",
                  "https://i.imgur.com/zVJHO3j.jpeg",
                  "https://i.imgur.com/miGBUFs.jpeg",
                  "https://i.imgur.com/SnTkA5b.png",
                  "https://i.imgur.com/dgCCom6.jpeg",
                  "https://i.imgur.com/s3TdrYK.png",
                  "https://i.imgur.com/mYIOMm3.png",
                  "https://i.imgur.com/zVJHO3j.jpeg",
                  "https://i.imgur.com/miGBUFs.jpeg",
                  "https://i.imgur.com/SnTkA5b.png",
                  "https://i.imgur.com/dgCCom6.jpeg"
                ].map((src, i) => (
                  <div 
                    key={i} 
                    className="w-48 md:w-72 aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-white shrink-0"
                  >
                    <img 
                      src={src} 
                      alt={`Muestra B-${i}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. Contenido del Kit */}
        <section id="contenido" className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">¿Qué incluye el kit?</h2>
              <p className="text-slate-600">4 temporadas clave en un solo lugar, listas para que solo edites y vendas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Día del Niño",
                  items: ["Etiquetas escolares", "Máscaras divertidas", "Libros para colorear", "Cajitas dulceras", "Juegos tipo Play-Doh", "y más"],
                  color: "bg-blue-600 text-white shadow-blue-200",
                  icon: "🎨",
                  image: "https://i.imgur.com/CrPZC9Y.jpeg"
                },
                {
                  title: "Día del Maestro",
                  items: ["Diseños para tazas", "Playeras personalizadas", "Cajitas para bisutería", "Tarjetas de agradecimiento", "Organizadores", "y más"],
                  color: "bg-orange-500 text-white shadow-orange-200",
                  icon: "🍎",
                  image: "https://i.imgur.com/kTah9Tu.jpeg"
                },
                {
                  title: "Día de las Madres",
                  items: ["Playeras mamá e hija", "Placas decorativas", "Rompecabezas", "Cajas de regalo premium", "Diseños para tazas y cuadros", "y más"],
                  color: "bg-pink-600 text-white shadow-pink-200",
                  icon: "🌸",
                  image: "https://i.imgur.com/hzLCgCJ.jpeg"
                },
                {
                  title: "Día del Padre",
                  items: ["Playeras súper papá", "Cajas para chocolates", "Diseños para termos", "Cuadros decorativos", "Etiquetas para botellas", "y más"],
                  color: "bg-slate-800 text-white shadow-slate-200",
                  icon: "👔",
                  image: "https://i.imgur.com/t6qA6Oj.jpeg"
                }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{card.icon}</span>
                    <span className={cn("px-4 py-2 rounded-full text-sm md:text-base font-bold uppercase shadow-lg", card.color)}>Temporada {i+1}</span>
                  </div>
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                  <ul className="space-y-3">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-medium overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 text-center">
              <p className="text-purple-800 font-medium">
                <span className="font-bold">Nota:</span> Todo se entrega en un PDF organizado con enlaces directos para editar en Canva.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Cómo funciona */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center">Cómo funciona</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Compra en Hotmart", desc: "Pago 100% seguro. Recibes correo con indicaciones de acceso.", icon: ShoppingBag },
                { step: "2", title: "Descarga el PDF", desc: "Un archivo organizado con todos los accesos a las plantillas.", icon: Download },
                { step: "3", title: "Personaliza y vende", desc: "Cambia colores, textos o logos y empieza a generar ingresos.", icon: Edit3 }
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto relative">
                    <item.icon className="w-8 h-8 text-pink-600" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Por qué comprar en preventa */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-600 to-purple-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">¿Por qué comprar en preventa?</h2>
              <ul className="space-y-6">
                {[
                  { title: "Ahorro inmediato", desc: "Paga solo $79 MXN hoy. El precio subirá a $99 MXN el 16 de marzo." },
                  { title: "Anticípate a la demanda", desc: "Prepárate con tiempo para las fechas de mayor venta del año." },
                  { title: "Cero estrés creativo", desc: "Diseños listos para usar. No pierdas horas empezando desde cero." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-white/80">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5.5. Bonos Exclusivos */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">🎁 Bonos Exclusivos (Incluidos en tu compra)</h2>
              <p className="text-slate-600">Herramientas adicionales diseñadas para acelerar tus resultados.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bono 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-pink-100/50 border border-pink-50 flex flex-col gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-2 rounded-lg shrink-0">
                    <Calculator className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Bono 1: Calculadora de Precios para tus Productos 💸</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Una herramienta súper práctica para que definas precios sin perder dinero. Calcula de forma rápida tu costo + ganancia y te ayuda a poner un precio justo y rentable para cada producto que vendas.
                </p>
              </motion.div>

              {/* Bono 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-purple-100/50 border border-purple-50 flex flex-col gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg shrink-0">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Bono 2: Guía Rápida para Vender tus Productos 🚀</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Un paso a paso claro para que sepas qué ofrecer, cómo promocionarlo y cómo cerrar ventas más fácil. Ideal para vender en temporada alta sin estar improvisando.
                </p>
              </motion.div>
            </div>

            <div className="max-w-3xl mx-auto pt-4">
              <div className="bg-pink-50 border border-pink-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
                <span className="text-xl">🔒</span>
                <p className="text-pink-800 font-semibold text-sm md:text-base">
                  Compra 100% segura: tu pago se procesa de forma protegida y recibes tu acceso de manera inmediata.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold text-center">Preguntas Frecuentes</h2>
            
            <div className="space-y-4">
              {[
                { q: "¿Funciona con la versión gratuita de Canva?", a: "¡Sí! algunas plantillas requieren elementos de Canva PRO, pero puede sustituir los elementos por elementos de Canva gratis o bien cargar los elementos desde su ordenador." },
                { q: "¿Cómo recibo el acceso?", a: "Inmediatamente después de tu compra, te enviaremos un correo con un PDF en donde te explicamos como adquirir tus plantillas." },
                { q: "¿Puedo usarlo para vender productos físicos?", a: "¡Claro! Ese es el objetivo. Puedes imprimir los diseños en tazas, playeras, cajas y más para vender a tus clientes." },
                { q: "¿Qué pasa el 16 de marzo?", a: "La preventa termina y el precio del kit subirá a su valor regular de $99 MXN." }
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between font-bold hover:bg-slate-50 transition-all"
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-slate-600"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Cierre Final */}
        <section id="cta-final" className="py-24 px-4 bg-white text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Asegura tu precio de preventa</h2>
              <p className="text-xl text-slate-600">No esperes a que suba el precio. Prepárate hoy para la temporada más rentable del año.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
              <div className="flex flex-col items-center gap-2">
                <span className="text-pink-600 font-bold uppercase tracking-widest text-sm">Oferta por tiempo limitado</span>
                <div className="flex gap-4 text-3xl md:text-4xl font-mono font-bold text-slate-800">
                  <div className="flex flex-col"><span className="bg-white px-3 py-2 rounded-xl shadow-sm">{timeLeft.days}</span><span className="text-[10px] uppercase mt-1">Días</span></div>
                  <div className="flex flex-col"><span className="bg-white px-3 py-2 rounded-xl shadow-sm">{timeLeft.hours}</span><span className="text-[10px] uppercase mt-1">Hrs</span></div>
                  <div className="flex flex-col"><span className="bg-white px-3 py-2 rounded-xl shadow-sm">{timeLeft.minutes}</span><span className="text-[10px] uppercase mt-1">Min</span></div>
                  <div className="flex flex-col"><span className="bg-white px-3 py-2 rounded-xl shadow-sm text-pink-600">{timeLeft.seconds}</span><span className="text-[10px] uppercase mt-1">Seg</span></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-slate-400 line-through text-lg">$99 MXN</span>
                  <span className="text-4xl font-extrabold text-slate-900">$79 MXN</span>
                </div>
                <button 
                  onClick={handleBuyClick}
                  className="w-full max-w-md bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-pink-200 transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto"
                >
                  Comprar ahora por $79 MXN
                  <ArrowRight className="w-6 h-6" />
                </button>
                <div className="flex items-center justify-center gap-4 text-slate-500 text-sm font-medium">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-500" /> Pago Seguro</span>
                  <span className="flex items-center gap-1"><Smartphone className="w-4 h-4 text-blue-500" /> Acceso Móvil</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-slate-800 pb-8">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl">Kit Temporada Alta</h3>
            <p className="max-w-xs text-sm">Impulsa tu negocio creativo con diseños profesionales listos para personalizar y vender.</p>
          </div>
          <div className="space-y-4 md:text-right">
            <p className="text-sm font-medium text-white">¿Tienes dudas?</p>
            <a href="mailto:soporte@ejemplo.com" className="text-pink-500 hover:text-pink-400 transition-colors">Envíanos un mensaje</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span>Producto digital. No se envía físico.</span>
            <span>Términos y Condiciones</span>
          </div>
        </div>
      </footer>

      {/* Purchase Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">¡Excelente elección!</h3>
                <p className="text-slate-600">Te estamos redirigiendo al checkout seguro de Hotmart...</p>
              </div>
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
