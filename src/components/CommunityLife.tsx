import React, { useState } from 'react';
import { Calendar, Sprout, Milestone, Users, Award, MapPin, Star, HeartHandshake, X } from 'lucide-react';
import { CalendarEvent } from '../types';

export default function CommunityLife() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'academic' | 'cultural' | 'holiday'>('all');
  
  // Custom modal for news reading to avoid alert() in iframe
  const [activeBulletin, setActiveBulletin] = useState<{ title: string; summary: string; points: string } | null>(null);

  const calendarEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Entrega de Boletas Parcial I',
      date: '2026-06-15',
      category: 'academic',
      description: 'Reunión general con padres de familia para la firma de reportes de evaluación y calificaciones parciales.'
    },
    {
      id: '2',
      title: 'Feria Ecológica de Mahuixtlán',
      date: '2026-06-25',
      category: 'cultural',
      description: 'Presentación de proyectos sobre el reciclaje compostable del bagazo de caña de azúcar, donado por el Ingenio local.'
    },
    {
      id: '3',
      title: 'Consejo Técnico Escolar',
      date: '2026-06-30',
      category: 'academic',
      description: 'Sesión de planeación docente para el cierre formal del ciclo académico. No hay actividades escolares presenciales.'
    },
    {
      id: '4',
      title: 'Receso Escolar Oficial (SEV)',
      date: '2026-07-16',
      category: 'holiday',
      description: 'Inicio oficial del período de vacaciones de verano para toda la comunidad de Telebachillerato de Veracruz.'
    },
    {
      id: '5',
      title: 'Inicio Curso Propedéutico de Admisión',
      date: '25 de Agosto, 2026',
      category: 'academic',
      description: 'Inducción intensiva de dos semanas para todos los nuevos alumnos pre-registrados a primer semestre.'
    }
  ];

  const newsItems = [
    {
      title: 'Proyecto Verde: Reutilización de Bagazo',
      summary: 'Alumnos del 6º semestre desarrollaron un tipo de papel y cartón biodegradable a base de bagazo de caña de azúcar, donado por el Ingenio de Mahuixtlán.',
      points: 'Cuidado Ambiental • Innovación Social',
      icon: Sprout,
      date: 'Hace 3 días'
    },
    {
      title: '1er Lugar en el Certamen de Oratoria de Zona 09 (Coatepec)',
      summary: 'Nuestra destacada alumna Mariana Ortiz ganó la competencia de oratoria de zona con un elocuente y emotivo discurso sobre las raíces del Telebachillerato.',
      points: 'Orgullo TEBAEV • Oratoria',
      icon: Award,
      date: 'Hace 1 semana'
    },
    {
      title: 'Tequio Comunitario con Padres de Familia',
      summary: 'Se realizó de manera exitosa la jornada ejidal voluntaria de limpieza y pintura de las fachadas del aula multifuncional con apoyo del comité vecinal.',
      points: 'Unidad Escolar • Colaboración',
      icon: HeartHandshake,
      date: 'Hace 2 semanas'
    }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? calendarEvents 
    : calendarEvents.filter(e => e.category === selectedCategory);

  return (
    <div className="bg-alabaster py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Culture & Heritage introduction */}
        <section className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-sage-light text-forest border border-sage-soft px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
              <MapPin className="h-3.5 w-3.5 text-sage" /> Identidad Veracruzana
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-pine tracking-tight leading-tight font-normal">
              Sólida Identidad con Nuestra Comunidad Cañera
            </h2>
            
            <p className="text-earthy leading-relaxed text-sm sm:text-base font-normal">
              Mahuixtlán es una población de gran tradición agrícola en el bello municipio de <strong className="text-pine font-semibold">Coatepec, Veracruz</strong>, célebre por su histórica producción de caña de azúcar y su emblemático <strong className="text-pine font-semibold">Ingenio Azucarero</strong>. En el TEBAEV Mahuixtlán, integramos esta rica herencia en nuestro quehacer académico cotidiano.
            </p>

            <p className="text-earthy text-sm leading-relaxed font-normal">
              Fomentamos proyectos de vinculación comunitaria donde los alumnos investigan alternativas de desarrollo sustentable, participan activamente en las festividades y realizan servicio social que beneficia directamente a los ejidos y colonias circundantes de nuestra zona.
            </p>

            {/* Icons grid representing values */}
            <div className="grid grid-cols-3 gap-4 pt-3 text-center">
              <div className="bg-white rounded-2xl p-4 border border-linen shadow-2xs">
                <Sprout className="h-6 w-6 text-sage mx-auto mb-1.5 stroke-[1.8]" />
                <span className="block font-serif font-bold text-xs text-pine">Ecología Local</span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-linen shadow-2xs">
                <Users className="h-6 w-6 text-sage mx-auto mb-1.5 stroke-[1.8]" />
                <span className="block font-serif font-bold text-xs text-pine">Tequio Vecinal</span>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-linen shadow-2xs">
                <Milestone className="h-6 w-6 text-sage mx-auto mb-1.5 stroke-[1.8]" />
                <span className="block font-serif font-bold text-xs text-pine">Raíces SEV</span>
              </div>
            </div>
          </div>

          {/* Graphic Banner illustrating regional life */}
          <div className="lg:col-span-5 bg-pine text-[#ECE9E1] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs border border-forest/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sage/15 rounded-full blur-xl"></div>
            
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-sage-soft" />
              El Corazón de Mahuixtlán
            </h3>

            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              La cercanía de nuestro plantel a las zonas de cultivo campestres ofrece a nuestros alumnos una perspectiva invaluable de respeto por el trabajo honrado y el campo. Cultivamos principios de solidaridad y sustentabilidad en Coatepec.
            </p>

            <div className="space-y-3.5 bg-forest/20 p-4 rounded-xl border border-forest/40">
              <div className="flex items-start gap-2.5 text-xs text-[#ECE9E1]">
                <span className="w-1.5 h-1.5 bg-sage-soft rounded-full flex-shrink-0 mt-1.5"></span>
                <p>Estudios de campo dirigidos a la conservación de suelos y afluentes locales.</p>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#ECE9E1]">
                <span className="w-1.5 h-1.5 bg-sage-soft rounded-full flex-shrink-0 mt-1.5"></span>
                <p>Preservación de expresiones tradicionales en desfiles y conmemoraciones.</p>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#ECE9E1]">
                <span className="w-1.5 h-1.5 bg-sage-soft rounded-full flex-shrink-0 mt-1.5"></span>
                <p>Monitoreo ecológico de subproductos agrícolas para beneficio vecinal.</p>
              </div>
            </div>

            <div className="text-[10px] text-sage-soft text-center font-mono tracking-widest font-semibold uppercase">
              • Educación Con Pertinencia de Veracruz •
            </div>
          </div>
        </section>

        {/* School Calendar interactive list */}
        <section className="bg-sage-light/35 border border-sage-soft p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-sage-soft pb-4">
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-pine flex items-center gap-2">
                <Calendar className="h-5 w-5 text-sage" />
                Calendario del Ciclo Escolar
              </h3>
              <p className="text-xs text-earthy">Seguimiento puntual de asambleas, días festivos, evaluaciones parciales y planeación técnica oficial.</p>
            </div>

            {/* Category Filter buttons */}
            <div className="flex flex-wrap gap-1 bg-white/60 border border-sage-soft/60 p-1.5 rounded-xl">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-sage text-white shadow-2xs'
                    : 'text-earthy hover:bg-sage-light'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedCategory('academic')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'academic'
                    ? 'bg-sage text-white shadow-2xs'
                    : 'text-earthy hover:bg-sage-light'
                }`}
              >
                Evaluación
              </button>
              <button
                onClick={() => setSelectedCategory('cultural')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'cultural'
                    ? 'bg-sage text-white shadow-2xs'
                    : 'text-earthy hover:bg-sage-light'
                }`}
              >
                Eventos
              </button>
              <button
                onClick={() => setSelectedCategory('holiday')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'holiday'
                    ? 'bg-sage text-white shadow-2xs'
                    : 'text-earthy hover:bg-sage-light'
                }`}
              >
                Vacaciones
              </button>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.map((ev) => (
              <div key={ev.id} className="bg-white border border-linen rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-sage-soft transition-all duration-200 shadow-2xs">
                <div className="space-y-2 max-w-2xl">
                  {/* Category badging */}
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                      ev.category === 'academic'
                        ? 'bg-sage-light text-forest border border-sage-soft/60'
                        : ev.category === 'cultural'
                        ? 'bg-alabaster text-clay border border-linen'
                        : ev.category === 'holiday'
                        ? 'bg-[#F2EFE8] text-[#5C5648] border border-linen'
                        : 'bg-white text-earthy'
                    }`}>
                      {ev.category === 'academic' ? 'Académico / CTE' : ev.category === 'cultural' ? 'Eventos y Comunidad' : 'Día Oficial / Receso'}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-clay">{ev.date}</span>
                  </div>

                  <h4 className="font-serif font-bold text-pine text-base">{ev.title}</h4>
                  <p className="text-xs text-earthy leading-relaxed font-normal">{ev.description}</p>
                </div>

                <div className="flex-shrink-0 self-start md:self-center">
                  <span className="text-xs text-forest bg-sage-light/50 px-3 py-1.5 rounded-xl border border-sage-soft font-bold block text-center min-w-[120px]">
                    {ev.category === 'holiday' ? 'Sin Labores' : 'Presencial'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent News section */}
        <section className="space-y-8">
          <div className="border-b border-linen pb-3">
            <h3 className="text-2xl font-serif font-bold text-pine">Ecos del Telebachillerato: Boletín Escolar</h3>
            <p className="text-xs text-clay mt-0.5">Destacamos los compromisos, tequios y logros consolidados por nuestros alumnos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((news, idx) => {
              const IconComp = news.icon;
              return (
                <div key={idx} className="bg-white border border-linen rounded-3xl p-5 hover:shadow-xs transition-all duration-200 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] text-clay font-mono font-semibold">
                      <span className="flex items-center gap-1">
                        <IconComp className="h-4 w-4 text-sage" />
                        <span className="font-bold text-pine">{news.points}</span>
                      </span>
                      <span>{news.date}</span>
                    </div>

                    <h4 className="font-serif font-bold text-pine text-base sm:text-lg leading-tight">{news.title}</h4>
                    <p className="text-xs text-earthy leading-relaxed font-normal opacity-95">{news.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-linen mt-4 flex items-center justify-between text-[11px]">
                    <span className="text-forest font-bold uppercase tracking-wider font-mono text-[9px]">Boletín Oficial</span>
                    <button
                      onClick={() => setActiveBulletin(news)}
                      className="text-sage font-bold hover:text-forest transition-colors cursor-pointer hover:underline"
                    >
                      Leer Boletín
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Custom Bulletin Modal */}
        {activeBulletin && (
          <div className="fixed inset-0 bg-pine/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-linen shadow-xl relative animate-scale-up">
              <button 
                onClick={() => setActiveBulletin(null)}
                className="absolute top-4 right-4 p-1.5 text-earthy hover:text-pine hover:bg-alabaster rounded-xl transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] text-sage font-bold font-mono uppercase tracking-widest">{activeBulletin.points}</span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-pine leading-tight">{activeBulletin.title}</h3>
              </div>

              <div className="py-2 text-xs sm:text-sm text-earthy leading-relaxed border-y border-linen">
                <p className="font-normal">
                  {activeBulletin.content || activeBulletin.summary}
                </p>
                <p className="mt-3 font-normal">
                  Este boletín de prensa del Telebachillerato Mahuixtlán ratifica los lazos del plantel con los productores ejidales, fomentando una formación participativa orientada al bienestar de Coatepec, Veracruz, coordinada por el Director Escolar y el plantel académico de zona.
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-clay font-mono pt-1">
                <span>Dirección Escolar • TEBAEV</span>
                <span>Firma Certificada SEV</span>
              </div>

              <button
                onClick={() => setActiveBulletin(null)}
                className="w-full py-2.5 bg-sage hover:bg-forest text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
