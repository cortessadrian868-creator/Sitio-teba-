import React from 'react';
import { Award, BookOpen, Clock, MapPin, Sparkles, Milestone, Users, Sprout } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="bg-alabaster min-h-screen">
      {/* Visual Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative overflow-hidden bg-sage-light rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-pine border border-sage-soft shadow-xs">
          {/* Subtle natural organic backdrop line pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(var(--color-pine)_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
          
          <div className="relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Branding text */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-sage-soft text-forest shadow-2xs">
                  <Sparkles className="h-3 w-3 text-sage animate-spin-slow" />
                  Matrícula Abierta • Ciclo Escolar 2026 - 2027
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-tight font-normal text-pine">
                  Telebachillerato <br />
                  <span className="italic font-extrabold text-sage">Mahuixtlán</span>
                </h1>
                
                <p className="text-base sm:text-lg text-earthy max-w-xl font-normal leading-relaxed">
                  Formamos jóvenes íntegros con sólidos conocimientos académicos y valores profundamente humanistas. Orgullosamente integrados en la comunidad cañera y cafetalera de Mahuixtlán, Coatepec, Veracruz.
                </p>

                {/* Badges / Quick stats row */}
                <div className="flex flex-wrap gap-3.5 pt-2">
                  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-xs border border-sage-soft/60 rounded-2xl p-3 pr-5">
                    <div className="p-2 bg-sage-light text-forest rounded-xl">
                      <Milestone className="h-5 w-5 text-sage" />
                    </div>
                    <div>
                      <div className="text-[10px] text-clay font-mono tracking-widest font-bold">CCT OFICIAL</div>
                      <div className="text-xs font-extrabold text-pine">30ETH0627X</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-xs border border-sage-soft/60 rounded-2xl p-3 pr-5">
                    <div className="p-2 bg-sage-light text-forest rounded-xl">
                      <MapPin className="h-5 w-5 text-sage" />
                    </div>
                    <div>
                      <div className="text-[10px] text-clay font-mono tracking-widest font-bold">UBICACIÓN</div>
                      <div className="text-xs font-extrabold text-pine">Coatepec, Ver.</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => onNavigate('portal')}
                    className="px-6 py-3.5 bg-sage hover:bg-forest text-white font-bold rounded-xl shadow-xs transition-all duration-200 text-sm md:text-base flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="h-5 w-5" />
                    Pre-registro de Admisión
                  </button>
                  <button
                    onClick={() => onNavigate('academia')}
                    className="px-6 py-3.5 bg-white hover:bg-sage-light text-pine font-semibold rounded-xl border border-linen transition-all duration-200 text-sm md:text-base cursor-pointer"
                  >
                    Explorar Plan de Estudios
                  </button>
                </div>
              </div>

              {/* Right Column: Identity teaser card */}
              <div className="lg:col-span-5 bg-white rounded-[2rem] p-6 sm:p-8 border border-linen shadow-xs relative">
                <h3 className="text-lg font-serif font-bold text-pine flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-sage" />
                  Identidad Telebachillerato
                </h3>
                <p className="text-xs text-earthy leading-relaxed mb-6 font-normal">
                  El sistema TEBAEV combina el uso de materiales impresos actualizados, teleclases audiovisuales dinámicas y la asesoría personalizada de profesores dedicados en cada área del saber.
                </p>

                {/* Fast stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-alabaster rounded-xl p-3.5 border border-linen">
                    <div className="text-sage font-serif font-extrabold text-lg">100%</div>
                    <div className="text-[10px] text-clay font-semibold">Validez Oficial SEV</div>
                  </div>
                  <div className="bg-alabaster rounded-xl p-3.5 border border-linen">
                    <div className="text-sage font-serif font-extrabold text-lg">Matutino</div>
                    <div className="text-[10px] text-clay font-semibold">Turno Escolar</div>
                  </div>
                  <div className="bg-alabaster rounded-xl p-3.5 border border-linen">
                    <div className="text-sage font-serif font-extrabold text-lg">3 Áreas</div>
                    <div className="text-[10px] text-clay font-semibold">Físico, Bio, Sociales</div>
                  </div>
                  <div className="bg-alabaster rounded-xl p-3.5 border border-linen">
                    <div className="text-sage font-serif font-extrabold text-lg">Capacitación</div>
                    <div className="text-[10px] text-clay font-semibold">Trabajo e Informática</div>
                  </div>
                </div>

                {/* Status footer inside card */}
                <div className="mt-5 pt-4 border-t border-linen flex items-center justify-between text-xs text-clay">
                  <span>Supervisión Escolar:</span>
                  <span className="font-mono font-bold text-pine">30FTH0009M (Z-09)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights & Regional Pride Ribbon */}
      <div className="bg-pine text-alabaster py-3 border-y border-forest/30">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs md:text-sm font-semibold tracking-wide flex flex-wrap items-center justify-center gap-y-1.5 gap-x-8">
          <span className="flex items-center gap-1.5"><Sprout className="h-4 w-4 text-sage-soft" /> Orgullo Coatepecano</span>
          <span className="hidden md:inline text-forest">•</span>
          <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-sage-soft" /> Educación Interactiva</span>
          <span className="hidden md:inline text-forest">•</span>
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-sage-soft" /> Alianza de Padres y Maestros</span>
        </div>
      </div>

      {/* Main Content Area: Director Greeting and Key Informative Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Welcome from Director (Left) */}
          <section className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-linen flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-sage rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-pine">Mensaje de la Dirección</h2>
              </div>
              
              <p className="text-earthy leading-relaxed text-sm sm:text-base font-normal">
                "Bienvenidos a la página web del <strong className="text-pine font-semibold">Telebachillerato Mahuixtlán</strong>. En nuestra institución entendemos que la educación de nivel medio superior es el puente fundamental hacia el desarrollo profesional e integral de cada joven veracruzano.
              </p>
              
              <p className="text-earthy leading-relaxed text-sm font-normal">
                Nuestra misión principal es brindar un espacio académico de excelencia y calidez humana donde cada estudiante reciba atención tutorial, aproveche los recursos multimedia propios de nuestro sistema TEBAEV, y adquiera competencias tanto para continuar con sus estudios universitarios como para incorporarse proactivamente al ámbito productivo de nuestra región."
              </p>

              <blockquote className="border-l-4 border-sage-soft bg-sage-light/40 p-4 rounded-r-2xl text-[#4A544A] text-xs font-semibold italic leading-relaxed">
                “Educación de calidad con sentido de pertenencia comunitaria, sembrando el futuro en la tierra del café y la caña de azúcar.”
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-linen flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sage-light text-forest flex items-center justify-center font-bold text-lg select-none border border-sage-soft">
                AH
              </div>
              <div>
                <h4 className="font-serif font-bold text-pine text-sm sm:text-base">Prof. Antonio Hernández Carmona</h4>
                <p className="text-xs text-clay">Director Escolar • TEBAEV Mahuixtlán</p>
              </div>
            </div>
          </section>

          {/* Quick Info & Schedule Box (Right) */}
          <section className="lg:col-span-5 bg-pine text-[#ECE9E1] rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-semibold text-alabaster border-b border-forest/50 pb-3">
                Información de Operación
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <Clock className="h-5 w-5 text-sage-soft flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-sage-soft uppercase tracking-wider font-mono font-bold">Horario de Clases</div>
                    <p className="text-sm font-semibold text-white">Turno Matutino: 08:00 AM a 02:00 PM</p>
                    <p className="text-xs text-stone-300">De lunes a viernes con estricta puntualidad escolar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <BookOpen className="h-5 w-5 text-sage-soft flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-sage-soft uppercase tracking-wider font-mono font-bold">Plan de Estudios</div>
                    <p className="text-sm font-semibold text-white">Bachillerato General Estatal</p>
                    <p className="text-xs text-stone-300">6 Semestres con Capacitación para el Trabajo en Informática.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Award className="h-5 w-5 text-sage-soft flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-sage-soft uppercase tracking-wider font-mono font-bold">Insignias y Logros</div>
                    <p className="text-sm font-semibold text-white">Proyectos Comunitarios de Ecología</p>
                    <p className="text-xs text-stone-300">Destacada participación en desfiles cívicos y eventos de zona.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Button links */}
            <div className="pt-6 mt-6 border-t border-forest/50 flex flex-col gap-2.5">
              <a
                href="mailto:tebaev_mahuixtlan@hotmail.com"
                className="text-center w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold tracking-wider transition uppercase text-alabaster cursor-pointer"
              >
                Enviar Correo Institucional
              </a>
              <a
                href="tel:2281866075"
                className="text-center w-full py-2.5 bg-sage hover:bg-forest text-white rounded-xl text-xs font-bold tracking-wider transition uppercase shadow-xs cursor-pointer"
              >
                Llamar: 228 186 6075
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
