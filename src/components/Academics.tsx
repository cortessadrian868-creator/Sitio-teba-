import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle, ArrowRight, Laptop, Beaker, FileText, Compass, GraduationCap } from 'lucide-react';

interface SemesterSubject {
  name: string;
  type: 'basica' | 'propedeutica' | 'trabajo';
  hours: number;
}

export default function Academics() {
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const academicAreas = [
    {
      title: 'Químico-Biólogo',
      icon: Beaker,
      description: 'Enfocado en las ciencias de la salud, medicina, biología, agronomía, ecología y química orgánica.',
      subjects: ['Biología Avanzada', 'Química Orgánica', 'Fisiología Humana', 'Bioquímica'],
      color: 'border-sage-soft bg-sage-light/45 text-pine',
      badgeColor: 'bg-sage text-white'
    },
    {
      title: 'Físico-Matemático',
      icon: Compass,
      description: 'Ideal para ingenierías, arquitectura, informática avanzada, física avanzada y matemáticas puras.',
      subjects: ['Cálculo Integral', 'Física de Fluidos', 'Estadística y Probabilidad', 'Geometría Analítica'],
      color: 'border-linen bg-[#F6F4EE] text-pine',
      badgeColor: 'bg-clay text-white'
    },
    {
      title: 'Humanidades y Ciencias Sociales',
      icon: BookOpen,
      description: 'Orientado al derecho, psicología, pedagogía, comunicación, historia, sociología y lengua extranjera.',
      subjects: ['Sociología Veracruzana', 'Derecho Constitucional', 'Literatura Hispanoamericana', 'Metodología Especial'],
      color: 'border-[#E2DC CE] bg-[#EFEDE6] text-earthy',
      badgeColor: 'bg-forest text-white'
    }
  ];

  const curriculum: Record<number, SemesterSubject[]> = {
    1: [
      { name: 'Matemáticas I', type: 'basica', hours: 5 },
      { name: 'Química I', type: 'basica', hours: 4 },
      { name: 'Ética y Valores I', type: 'basica', hours: 3 },
      { name: 'Metodología de la Investigación', type: 'basica', hours: 3 },
      { name: 'Taller de Lectura y Redacción I', type: 'basica', hours: 4 },
      { name: 'Lengua Adicional al Español I (Inglés)', type: 'basica', hours: 3 },
      { name: 'Informática I', type: 'trabajo', hours: 3 }
    ],
    2: [
      { name: 'Matemáticas II', type: 'basica', hours: 5 },
      { name: 'Química II', type: 'basica', hours: 4 },
      { name: 'Ética y Valores II', type: 'basica', hours: 3 },
      { name: 'Introducción a las Ciencias Sociales', type: 'basica', hours: 3 },
      { name: 'Taller de Lectura y Redacción II', type: 'basica', hours: 4 },
      { name: 'Lengua Adicional al Español II (Inglés)', type: 'basica', hours: 3 },
      { name: 'Informática II', type: 'trabajo', hours: 3 }
    ],
    3: [
      { name: 'Matemáticas III', type: 'basica', hours: 5 },
      { name: 'Física I', type: 'basica', hours: 4 },
      { name: 'Biología I', type: 'basica', hours: 4 },
      { name: 'Literatura I', type: 'basica', hours: 3 },
      { name: 'Historia de México I', type: 'basica', hours: 3 },
      { name: 'Capacitación para el Trabajo: Administración I', type: 'trabajo', hours: 4 }
    ],
    4: [
      { name: 'Matemáticas IV', type: 'basica', hours: 5 },
      { name: 'Física II', type: 'basica', hours: 4 },
      { name: 'Biología II', type: 'basica', hours: 4 },
      { name: 'Literatura II', type: 'basica', hours: 3 },
      { name: 'Historia de México II', type: 'basica', hours: 3 },
      { name: 'Capacitación para el Trabajo: Administración II', type: 'trabajo', hours: 4 }
    ],
    5: [
      { name: 'Geografía', type: 'basica', hours: 3 },
      { name: 'Estructura Socioeconómica de México', type: 'basica', hours: 3 },
      { name: 'Asignatura Propedéutica I (Según Área)', type: 'propedeutica', hours: 4 },
      { name: 'Asignatura Propedéutica II (Según Área)', type: 'propedeutica', hours: 4 },
      { name: 'Metodología del Trabajo en Comunidad', type: 'basica', hours: 3 },
      { name: 'Capacitación para el Trabajo: Informática Aplicada I', type: 'trabajo', hours: 4 }
    ],
    6: [
      { name: 'Ecología y Medio Ambiente', type: 'basica', hours: 3 },
      { name: 'Filosofía', type: 'basica', hours: 4 },
      { name: 'Asignatura Propedéutica III (Según Área)', type: 'propedeutica', hours: 4 },
      { name: 'Asignatura Propedéutica IV (Según Área)', type: 'propedeutica', hours: 4 },
      { name: 'Proyectos del Desarrollo Comunitario', type: 'basica', hours: 4 },
      { name: 'Capacitación para el Trabajo: Informática Aplicada II', type: 'trabajo', hours: 4 }
    ]
  };

  const currentSubjects = curriculum[selectedSemester] || [];

  return (
    <div className="bg-alabaster py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro academic vision */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-sage font-extrabold text-xs uppercase tracking-widest font-mono">Modelo Educativo TEBAEV</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-pine tracking-tight font-normal">
            Programa de Bachillerato General
          </h2>
          <p className="text-earthy leading-relaxed text-sm sm:text-base font-normal">
            El plan de estudios del Telebachillerato del Estado de Veracruz está estructurado en seis semestres para brindar una educación integral, preparando a los estudiantes de manera sobresaliente para el siguiente paso universitario y laboral.
          </p>
        </section>

        {/* Areas de Formacion Propedéutica */}
        <section className="space-y-8">
          <div className="flex items-center gap-3.5 border-b border-linen pb-4">
            <div className="p-2.5 bg-sage text-white rounded-xl shadow-2xs">
              <GraduationCap className="h-6 w-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-pine">Áreas Propedéuticas (5º y 6º Semestre)</h3>
              <p className="text-xs text-clay">Los estudiantes seleccionan su especialidad preferente de acuerdo con su proyecto de educación superior.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {academicAreas.map((area, idx) => {
              const IconComp = area.icon;
              return (
                <div key={idx} className={`border rounded-2xl p-6 flex flex-col justify-between shadow-2xs transition-all hover:-translate-y-1 duration-200 ${area.color}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl ${area.badgeColor}`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <h4 className="font-serif font-bold text-lg leading-tight text-pine">{area.title}</h4>
                    </div>
                    <p className="text-sm text-earthy leading-relaxed font-normal opacity-95">{area.description}</p>
                    
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider block text-clay">Asignaturas Clave:</span>
                      <ul className="space-y-1.5">
                        {area.subjects.map((sub, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2 text-xs font-semibold text-pine">
                            <CheckCircle className="h-4 w-4 flex-shrink-0 text-sage opacity-85" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Curriculum Viewer */}
        <section className="bg-sage-light/35 rounded-3xl p-6 sm:p-10 border border-sage-soft space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-sage-soft pb-5">
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-pine flex items-center gap-2.5">
                <BookOpen className="h-5 w-5 text-sage" />
                Mapa Curricular Interactivo
              </h3>
              <p className="text-xs text-earthy">
                Haz clic en los semestres para visualizar las materias correspondientes y su carga horaria semanal autorizada.
              </p>
            </div>
            
            {/* Semester Tabs */}
            <div className="flex flex-wrap gap-1.5 bg-white/60 p-1.5 rounded-xl border border-sage-soft self-start lg:self-center">
              {[1, 2, 3, 4, 5, 6].map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    selectedSemester === sem
                      ? 'bg-sage text-white shadow-2xs scale-[1.03]'
                      : 'text-earthy hover:bg-sage-light'
                  }`}
                >
                  {sem}º Semestre
                </button>
              ))}
            </div>
          </div>

          {/* Subject showcase board */}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-2xs border border-linen flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-pine text-base border-b border-linen pb-2">
                  Asignaturas de <span className="text-sage italic">{selectedSemester}º Semestre</span>
                </h4>

                <div className="divide-y divide-linen">
                  {currentSubjects.map((subject, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between py-2.5 hover:bg-alabaster/70 px-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${
                          subject.type === 'basica'
                            ? 'bg-sage'
                            : subject.type === 'propedeutica'
                            ? 'bg-clay'
                            : 'bg-forest'
                        }`} />
                        <span className="text-sm font-medium text-pine">{subject.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-clay italic font-mono">{subject.hours} hrs/sem</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                          subject.type === 'basica'
                            ? 'bg-sage-light text-forest border border-sage-soft/55'
                            : subject.type === 'propedeutica'
                            ? 'bg-alabaster text-clay border border-linen'
                            : 'bg-[#F2EFE8] text-[#5C5648] border border-linen'
                        }`}>
                          {subject.type === 'basica' ? 'Formación Básica' : subject.type === 'propedeutica' ? 'Propedéutica' : 'Capacitación'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guide to subject types */}
              <div className="mt-6 pt-4 border-t border-linen flex flex-wrap gap-x-6 gap-y-2 text-xs text-clay">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sage"></span>
                  <span>Formación Básica</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-clay"></span>
                  <span>Propedéutica Universitaria</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-forest"></span>
                  <span>Capacitación Laboral</span>
                </div>
              </div>
            </div>

            {/* Special Training spotlight */}
            <div className="lg:col-span-4 bg-pine text-[#ECE9E1] rounded-2xl p-6.5 shadow-2xs border border-forest/30 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-2.5 bg-sage-light text-forest rounded-xl inline-block border border-sage-soft">
                  <Laptop className="h-6 w-6 stroke-[1.8]" />
                </div>
                
                <h4 className="font-serif font-bold text-lg text-alabaster">
                  Área de Capacitación: Administración e Informática
                </h4>
                
                <p className="text-xs text-[#DFDCD2] leading-relaxed font-normal">
                  A diferencia de otros subsistemas tradicionales, en el TEBAEV dotamos a los alumnos con herramientas analíticas, contables, tecnológicas y de negocios para que obtengan un aval de capacidades laborales inmediato.
                </p>

                <ul className="space-y-2.5 pt-2 text-xs text-stone-200 font-normal">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-sage-soft flex-shrink-0" />
                    <span>Ofimática e Internet aplicado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-sage-soft flex-shrink-0" />
                    <span>Bases de administración empresarial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-sage-soft flex-shrink-0" />
                    <span>Proyectos comunitarios ecológicos</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-forest/50 mt-4 text-center">
                <span className="inline-block text-[10px] text-sage-soft font-mono tracking-widest bg-forest/40 py-1.5 px-3 rounded-md border border-forest/60">
                  CERTIFICADO POR LA SEV
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pedagogical items info */}
        <section className="grid lg:grid-cols-2 gap-8 items-center bg-white p-8 rounded-3xl border border-linen shadow-2xs">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-pine">El Sistema de Telebachillerato</h3>
            <p className="text-earthy text-sm leading-relaxed font-normal">
              El Telebachillerato (TEBAEV) es un prestigioso subsistema educativo creado en el estado de Veracruz en 1980, diseñado para democratizar e impulsar el acceso de educación media superior de excelencia con tecnologías audiovisuales.
            </p>
            <p className="text-earthy text-sm leading-relaxed font-normal">
              Trabajamos mediante **módulos didácticos estructurados** y pedagógicamente integrados, reforzados con **teleclases de alto dinamismo** impartidas en las aulas bajo la asesoría comprometida de educadores expertos en cada área temática.
            </p>
          </div>
          <div className="bg-alabaster/60 p-6 rounded-2xl border border-linen grid grid-cols-2 gap-4">
            <div className="p-4 border border-linen rounded-xl text-center space-y-1 bg-white">
              <span className="block font-serif font-extrabold text-pine text-2xl sm:text-3xl">40+</span>
              <span className="text-xs text-clay font-semibold">Años de Excelencia</span>
            </div>
            <div className="p-4 border border-linen rounded-xl text-center space-y-1 bg-white">
              <span className="block font-serif font-extrabold text-pine text-2xl sm:text-3xl">SEV</span>
              <span className="text-xs text-clay font-semibold">Soporte Estatal</span>
            </div>
            <div className="p-4 border border-linen rounded-xl text-center space-y-1 bg-white">
              <span className="block font-serif font-extrabold text-pine text-2xl sm:text-3xl">100%</span>
              <span className="text-xs text-clay font-semibold">Libros Gratuitos</span>
            </div>
            <div className="p-4 border border-linen rounded-xl text-center space-y-1 bg-white">
              <span className="block font-serif font-extrabold text-pine text-2xl sm:text-3xl">Z-09</span>
              <span className="text-xs text-clay font-semibold">Zona Coatepec 09</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
