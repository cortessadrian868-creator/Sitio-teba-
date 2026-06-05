import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Academics from './components/Academics';
import StudentHub from './components/StudentHub';
import CommunityLife from './components/CommunityLife';
import LocationAndContact from './components/LocationAndContact';
import Gallery from './components/Gallery';
import { Mail, Phone, Award, School, ChevronUp, MapPin } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-alabaster flex flex-col justify-between font-sans selection:bg-sage-soft selection:text-pine">
      
      {/* Dynamic Header Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Primary Section Render Router */}
      <div className="flex-grow">
        {activeSection === 'inicio' && <Hero onNavigate={setActiveSection} />}
        {activeSection === 'academia' && <Academics />}
        {activeSection === 'comunidad' && <CommunityLife />}
        {activeSection === 'galeria' && <Gallery />}
        {activeSection === 'portal' && <StudentHub />}
        {activeSection === 'contacto' && <LocationAndContact />}
      </div>

      {/* Official Footnote / Contact & Directory Seal */}
      <footer className="bg-pine text-[#FAF8F5] border-t border-forest/40 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Main Footer layout */}
          <div className="grid md:grid-cols-12 gap-10 items-start">
            
            {/* Column 1: School Identity */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-forest text-alabaster p-2.5 rounded-xl border border-forest/35">
                  <School className="h-6 w-6 stroke-[1.8]" />
                </div>
                <span className="font-serif font-bold text-xl tracking-tight text-white">
                  TEBAEV <span className="text-sage-soft italic">Mahuixtlán</span>
                </span>
              </div>
              
              <p className="text-xs text-stone-300 leading-relaxed max-w-sm font-normal">
                Escuela de nivel medio superior que imparte bachillerato general estatal en el turno matutino, incorporada oficialmente a la Secretaría de Educación de Veracruz (SEV). Sólida formación académica con vinculación comunitaria.
              </p>
              
              <div className="text-[10px] font-mono font-bold text-sage-soft uppercase tracking-widest bg-forest/35 py-1.5 px-3 rounded-lg border border-forest/50 inline-block">
                CCT: 30ETH0627X • ACTIVO
              </div>
            </div>

            {/* Column 2: Quick Links Directory */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white border-b border-forest/50 pb-2">
                Mapa del Sitio
              </h4>
              <ul className="space-y-2 text-xs text-[#EAE6DD] font-semibold">
                <li>
                  <button
                    onClick={() => { setActiveSection('inicio'); scrollToTop(); }}
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    • Inicio / Mensaje de Dirección
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveSection('academia'); scrollToTop(); }}
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    • Especialidades & Plan de Estudios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveSection('comunidad'); scrollToTop(); }}
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    • Identidad Cañera & Calendario
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveSection('galeria'); scrollToTop(); }}
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    • Álbum / Galería Fotográfica
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveSection('portal'); scrollToTop(); }}
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    • Pre-registro & Simulador
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setActiveSection('contacto'); scrollToTop(); }}
                    className="hover:text-white transition cursor-pointer text-left"
                  >
                    • Directorio SEP, Teléfono & Mapa
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Supervision */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-white border-b border-forest/50 pb-2">
                Zona Escolar Coatepec 09
              </h4>
              
              <div className="space-y-3.5 text-xs text-stone-300 font-normal">
                <p className="leading-relaxed">
                  Supervisión Escolar del Telebachillerato de Veracruz (DGTEBAEV) Clave CCT <span className="font-semibold text-white font-mono">30FTH0009M</span>.
                </p>

                <div className="space-y-2.5 pt-1 text-stone-200">
                  <div className="flex items-center gap-2.5 text-xs">
                    <Phone className="h-4 w-4 text-sage-soft flex-shrink-0" />
                    <a href="tel:2281866075" className="hover:underline hover:text-white transition-colors">228 186 6075</a>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs">
                    <Mail className="h-4 w-4 text-sage-soft flex-shrink-0" />
                    <a href="mailto:tebaev_mahuixtlan@hotmail.com" className="hover:underline hover:text-white transition-colors truncate">tebaev_mahuixtlan@hotmail.com</a>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs">
                    <MapPin className="h-4 w-4 text-sage-soft flex-shrink-0" />
                    <span className="leading-snug">Calle Miguel Alemán S/N, Localidad Mahuixtlán.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Lower Legal Bar */}
          <div className="border-t border-forest/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-stone-400 font-medium">
            <div className="text-center sm:text-left space-y-0.5">
              <p>© {new Date().getFullYear()} Telebachillerato Mahuixtlán • SEV • Gobierno del Estado de Veracruz.</p>
              <p className="opacity-75 font-light">La información presentada es pública e integrada para beneficio de la comunidad escolar.</p>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="px-3.5 py-2.5 bg-[#425042]/50 hover:bg-forest border border-forest/65 rounded-xl text-white font-bold flex items-center gap-1.5 transition-all duration-200 shadow-2xs cursor-pointer"
              title="Volver arriba"
            >
              <ChevronUp className="h-4 w-4 text-sage-soft" />
              <span>Subir</span>
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
}
