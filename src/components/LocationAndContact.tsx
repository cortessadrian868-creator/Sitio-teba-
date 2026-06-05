import React, { useState } from 'react';
import { MapPin, Phone, Mail, Award, CheckCircle, Navigation, ExternalLink, ShieldCheck, Landmark } from 'lucide-react';

export default function LocationAndContact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Consultas Generales',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const contactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.message) return;

    // Save as message into localstorage
    const localMsgs = localStorage.getItem('tebaev_messages');
    let loaded = [];
    if (localMsgs) {
      loaded = JSON.parse(localMsgs);
    }
    const newMsg = {
      id: Date.now().toString(),
      name: formData.fullName,
      type: formData.subject,
      content: formData.message,
      date: new Date().toISOString().split('T')[0],
      reply: 'Gracias por ponerte en contacto. Un asesor de control escolar te enviará un correo o responderá directamente.'
    };
    loaded.unshift(newMsg);
    localStorage.setItem('tebaev_messages', JSON.stringify(loaded));

    setSuccess(true);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: 'Consultas Generales',
      message: ''
    });
    setTimeout(() => setSuccess(false), 6000);
  };

  const schoolDetails = [
    { title: 'Clave de Incorporación CCT', value: '30ETH0627X', ref: 'SEV Estatal' },
    { title: 'Nivel Educativo', value: 'Media Superior • Bachillerato General', ref: 'SEP' },
    { title: 'Supervisión de Zona Escolar', value: '30FTH0009M (Zona Coatepec 09)', ref: 'Coatepec, Ver.' },
    { title: 'Estatus del Plantel', value: 'Activo Escolar Ordinario', ref: 'SEP 2026/2027' },
  ];

  return (
    <div className="bg-alabaster py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Contact head */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-sage font-extrabold text-xs uppercase tracking-widest font-mono">Servicios de Atención</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-pine tracking-tight font-normal">
            Contacto y Ubicación del Plantel
          </h2>
          <p className="text-earthy text-sm sm:text-base font-normal">
            Ubica nuestras instalaciones o escribe directamente a nuestro departamento escolar. Estamos atentos para resolver cualquiera de tus inquietudes sobre fichas, reportes o inscripciones.
          </p>
        </div>

        {/* Grid Structure */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact Details & Official Map (Left) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            
            {/* Cards Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-linen shadow-2xs flex items-start gap-3.5">
                <div className="p-2.5 bg-sage-light text-forest rounded-xl border border-sage-soft/50 flex-shrink-0">
                  <Phone className="h-5 w-5 stroke-[2]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-clay uppercase tracking-wider font-bold">Teléfono de Enlace</span>
                  <a href="tel:2281866075" className="text-sm font-extrabold text-pine block hover:underline">
                    228 186 6075
                  </a>
                  <span className="text-[10px] text-clay block font-medium">Atención: 08:00 AM - 02:00 PM</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-linen shadow-2xs flex items-start gap-3.5">
                <div className="p-2.5 bg-sage-light text-forest rounded-xl border border-sage-soft/50 flex-shrink-0">
                  <Mail className="h-5 w-5 stroke-[2]" />
                </div>
                <div className="space-y-0.5 col-span-1 min-w-0">
                  <span className="text-[10px] text-clay uppercase tracking-wider font-bold">E-mail Institucional</span>
                  <a href="mailto:tebaev_mahuixtlan@hotmail.com" className="text-sm font-extrabold text-pine block hover:underline truncate" title="tebaev_mahuixtlan@hotmail.com">
                    tebaev_mahuixtlan@hotmail.com
                  </a>
                  <span className="text-[10px] text-clay block font-medium">Respuesta ordinaria breve</span>
                </div>
              </div>
            </div>

            {/* Custom stylized local map mockup */}
            <div className="bg-white p-6 rounded-3xl border border-linen shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-linen pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-sage" />
                  <h4 className="font-serif font-bold text-pine text-base">Ubicación Geográfica Oficial</h4>
                </div>
                
                <a
                  href="https://www.google.com/maps/place/19.40902,-96.91588"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sage font-bold hover:text-forest transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Abrir Google Maps <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Exact Coordinate Badging */}
              <div className="bg-sage-light/35 p-4.5 rounded-xl border border-sage-soft/60 space-y-2 text-xs text-pine">
                <p className="font-semibold leading-relaxed">
                  Calle Miguel Alemán S/N, Localidad Mahuixtlán, Coatepec, Veracruz, México, C.P. 91608.
                </p>
                <p className="text-earthy leading-relaxed text-[11px] font-normal">
                  Ref: Situada junto al preescolar general Esperanza García C. de N. (a 41 Mts) y de la primaria federal Rafael Ramírez (a 176 Mts). A espaldas de la terminal ejidal y del Ingenio azucarero.
                </p>
              </div>

              {/* MOCK MAP GRAPHIC */}
              <div className="h-44 rounded-2xl bg-[#FAF9F5] border border-linen relative overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                {/* Simulated Grid Roads */}
                <div className="absolute inset-x-0 h-4 bg-[#EBE7DF] top-12 rotate-[-5deg]"></div>
                <div className="absolute inset-x-0 h-4 bg-[#EBE7DF] bottom-12 rotate-[-5deg]"></div>
                <div className="absolute inset-y-0 w-4 bg-[#EBE7DF] left-1/3 rotate-[10deg]"></div>
                <div className="absolute inset-y-0 w-4 bg-[#EBE7DF] right-1/4 rotate-[10deg]"></div>

                {/* Local Landmarks */}
                <div className="absolute top-2 left-6 bg-white border border-linen px-2 py-0.5 rounded-md shadow-2xs text-[9px] text-[#555048] flex items-center gap-1 font-semibold">
                  <Landmark className="h-2.5 w-2.5 text-sage" /> Primaria R. Ramírez
                </div>
                <div className="absolute bottom-3 left-16 bg-white border border-linen px-2 py-0.5 rounded-md shadow-2xs text-[9px] text-[#555048] flex items-center gap-1 font-semibold">
                  <Landmark className="h-2.5 w-2.5 text-sage" /> Preesc. G. Esperanza
                </div>
                <div className="absolute bottom-5 right-2 bg-sage-light/60 border border-sage-soft/50 px-2 py-0.5 rounded-md shadow-2xs text-[9px] text-forest font-bold font-serif whitespace-nowrap">
                  Ingenio Mahuixtlán
                </div>

                {/* TEBAEV MAHUISTLAN MAP PIN */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="bg-pine text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md border border-sage animate-bounce flex items-center gap-1 whitespace-nowrap">
                    <MapPin className="h-3.5 w-3.5 text-sage-soft" /> TEBAEV Mahuixtlán
                  </div>
                  <div className="w-2.5 h-2.5 bg-pine rounded-full border border-white mt-0.5 shadow-xs"></div>
                  <div className="w-5 h-1.5 bg-black/15 rounded-full blur-xs mt-0.5"></div>
                </div>

                {/* Coordinate text at corner */}
                <div className="relative z-10 self-end mt-auto text-[9px] font-mono text-clay bg-white/90 p-1.5 rounded-md border border-linen shadow-2xs">
                  GPS: 19.40902, -96.91588 • Coatepec
                </div>
              </div>

              {/* Direction simulator button */}
              <a
                href="https://www.google.com/maps/dir//19.40902,-96.91588/@19.40902,-96.91588,17z/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-sage hover:bg-forest text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-xs cursor-pointer"
              >
                <Navigation className="h-4 w-4" />
                Simular Ruta de Llegada desde Coatepec
              </a>
            </div>

          </div>

          {/* Contact and Query Form (Right) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-2xs border border-linen flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-pine">Envíanos un Mensaje</h3>
              <p className="text-xs text-earthy leading-relaxed font-normal">
                ¿Tienes dudas sobre los programas escolares, cuotas ejidales o las becas estatales? Llena este formulario y te responderemos a la brevedad posible.
              </p>

              {success && (
                <div className="p-3.5 bg-sage-light border border-sage-soft text-forest text-xs rounded-xl font-semibold animate-fade-in flex items-center gap-2.5">
                  <CheckCircle className="h-5 w-5 text-sage flex-shrink-0" />
                  <span>¡Mensaje enviado con éxito! Ha sido enrutado al departamento de Dirección escolar.</span>
                </div>
              )}

              <form onSubmit={contactSubmit} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Patricia García"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 font-medium text-pine"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-pine block">E-mail *</label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 font-medium text-pine"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-pine block">Teléfono</label>
                    <input
                      type="tel"
                      placeholder="10 dígitos"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 font-medium text-pine"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block">Asunto de Relevancia</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 font-medium text-pine"
                  >
                    <option>Consultas Generales</option>
                    <option>Proceso de Inscripción 2026/2027</option>
                    <option>Tramitación de Boletas o Constancias</option>
                    <option>Beca Universal Benito Juárez</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block">Escribe tu Mensaje de Consulta *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe de manera clara y respetuosa tu planteamiento..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sage hover:bg-forest text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Mail className="h-4.5 w-4.5" /> Enviar Consulta a la Dirección
                </button>
              </form>
            </div>

            {/* SEV confirmation footer */}
            <div className="mt-5 pt-4 border-t border-linen flex items-center gap-3 text-[10px] text-clay">
              <ShieldCheck className="h-5 w-5 text-sage flex-shrink-0" />
              <span className="font-medium leading-relaxed">Plantel registrado oficialmente ante la Dirección General de Telebachillerato de Veracruz (DGTEBAEV) de la SEV.</span>
            </div>
          </div>

        </div>

        {/* Directory details ribbon */}
        <section className="bg-pine text-[#FAF8F5] rounded-3xl p-6 md:p-8 space-y-6 border border-forest/30">
          <div className="border-b border-forest/50 pb-3 flex items-center justify-between">
            <h4 className="font-serif font-bold text-white text-sm md:text-base uppercase tracking-wider">
              Ficha Técnica de Información Institucional
            </h4>
            <span className="text-[10px] bg-forest/40 border border-forest/60 text-sage-soft px-3 py-1 rounded font-mono font-bold tracking-widest">
              SUPERVISIÓN ACTIVA Z-09
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolDetails.map((det, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] text-sage-soft block uppercase font-mono font-bold tracking-wider">{det.title}</span>
                <p className="text-sm font-serif font-extrabold text-white leading-tight">{det.value}</p>
                <span className="text-[10px] text-stone-300 italic block font-medium">Aval: {det.ref}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
