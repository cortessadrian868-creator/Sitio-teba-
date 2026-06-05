import React, { useState, useEffect } from 'react';
import { 
  FileText, Calendar, Calculator, BookOpen, AlertTriangle, 
  CheckCircle, Download, Send, Plus, Trash2, Printer, Compass, Lightbulb, UserCheck
} from 'lucide-react';
import { PreRegistroRecord, GradeSubject } from '../types';

export default function StudentHub() {
  const [activeTab, setActiveTab] = useState<'preregistro' | 'simulador' | 'recursos' | 'buzon'>('preregistro');

  // Inline Notification State to replace window.alert
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // PRE-REGISTRO STATE
  const [preRecords, setPreRecords] = useState<PreRegistroRecord[]>([]);
  const [newRecord, setNewRecord] = useState<Partial<PreRegistroRecord>>({
    fullName: '',
    birthDate: '',
    curp: '',
    middleSchool: '',
    gpa: 8.5,
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    selectedArea: 'Químico-Biólogo'
  });
  const [registeredFicha, setRegisteredFicha] = useState<PreRegistroRecord | null>(null);

  // SIMULADOR STATE
  const [subjects, setSubjects] = useState<GradeSubject[]>([
    { name: 'Matemáticas Avanzadas', p1: 8, p2: 9, p3: 7, exam: 8 },
    { name: 'Física Clásica', p1: 7, p2: 7, p3: 8, exam: 7 },
    { name: 'Química Aplicada', p1: 9, p2: 10, p3: 9, exam: 9 },
    { name: 'Taller de Redacción', p1: 10, p2: 9, p3: 10, exam: 10 }
  ]);
  const [newSubName, setNewSubName] = useState('');
  
  // BUZON STATE
  const [messages, setMessages] = useState<{ id: string; name: string; type: string; content: string; date: string; reply?: string }[]>([]);
  const [buzonForm, setBuzonForm] = useState({ name: '', type: 'Sugerencia Académica', content: '' });

  // SAMPLES/INITIAL STORAGE
  useEffect(() => {
    const savedMessages = localStorage.getItem('tebaev_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const initial = [
        {
          id: '1',
          name: 'Sofía Cabrera',
          type: 'Consulta Académica',
          content: '¿Cuándo se entregan las guías del tercer parcial de Química?',
          date: '2026-06-02',
          reply: 'Hola Sofía. Las guías impresas estarán disponibles en la dirección del plantel a partir del lunes a las 8:00 AM. Recuerda traer tu libreta.'
        },
        {
          id: '2',
          name: 'Padre de Familia',
          type: 'Sugerencia de Infraestructura',
          content: 'Sería excelente programar una jornada voluntaria para pintar las bancas de las aulas de tercer grado.',
          date: '2026-06-04',
          reply: 'Excelente iniciativa. La Dirección coordinará con el comité de padres de familia para programar el tequio el próximo sábado. ¡Gracias por participar!'
        }
      ];
      localStorage.setItem('tebaev_messages', JSON.stringify(initial));
      setMessages(initial);
    }

    const savedPre = localStorage.getItem('tebaev_preregistros');
    if (savedPre) {
      setPreRecords(JSON.parse(savedPre));
    }
  }, []);

  // Action: Add pre-registro
  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecord.fullName || !newRecord.curp || !newRecord.guardianPhone) {
      showNotification('Por favor, completa los campos requeridos con asterisco (*).', 'error');
      return;
    }
    const record: PreRegistroRecord = {
      fullName: newRecord.fullName || '',
      birthDate: newRecord.birthDate || '',
      curp: newRecord.curp || '',
      middleSchool: newRecord.middleSchool || '',
      gpa: Number(newRecord.gpa) || 8.0,
      guardianName: newRecord.guardianName || '',
      guardianPhone: newRecord.guardianPhone || '',
      guardianEmail: newRecord.guardianEmail || '',
      selectedArea: newRecord.selectedArea || 'Químico-Biólogo'
    };

    const list = [...preRecords, record];
    setPreRecords(list);
    localStorage.setItem('tebaev_preregistros', JSON.stringify(list));
    setRegisteredFicha(record);
    showNotification('¡Ficha de pre-registro generada con éxito!', 'success');
    
    setNewRecord({
      fullName: '',
      birthDate: '',
      curp: '',
      middleSchool: '',
      gpa: 8.5,
      guardianName: '',
      guardianPhone: '',
      guardianEmail: '',
      selectedArea: 'Químico-Biólogo'
    });
  };

  // Action: Add subject to Simulator
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;
    const newSub: GradeSubject = {
      name: newSubName.trim(),
      p1: 8,
      p2: 8,
      p3: 8,
      exam: 8
    };
    setSubjects([...subjects, newSub]);
    setNewSubName('');
    showNotification(`Materia "${newSub.name}" agregada al simulador.`, 'success');
  };

  const handleGradeChange = (index: number, field: keyof GradeSubject, value: number) => {
    const newVal = Math.min(10, Math.max(0, Number(value)));
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: newVal };
    setSubjects(updated);
  };

  const deleteSubject = (index: number) => {
    const deletedName = subjects[index].name;
    setSubjects(subjects.filter((_, i) => i !== index));
    showNotification(`Se eliminó "${deletedName}" del simulador.`, 'info');
  };

  // Standard TEBAEV weighting model: 60% parciales average + 40% final exam
  const getFinalSubjectGrade = (sub: GradeSubject) => {
    const avgParcial = (sub.p1 + sub.p2 + sub.p3) / 3;
    const finalG = (avgParcial * 0.6) + (sub.exam * 0.4);
    return Number(finalG.toFixed(1));
  };

  // Overall average
  const getOverallAverage = () => {
    if (subjects.length === 0) return 0;
    const sum = subjects.reduce((acc, sub) => acc + getFinalSubjectGrade(sub), 0);
    return Number((sum / subjects.length).toFixed(2));
  };

  // Action: Add message to Suggestion Box
  const handleBuzonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buzonForm.content.trim()) {
      showNotification('Por favor escribe el contenido de tu sugerencia.', 'error');
      return;
    }

    const newMsg = {
      id: Date.now().toString(),
      name: buzonForm.name.trim() || 'Anónimo',
      type: buzonForm.type,
      content: buzonForm.content.trim(),
      date: new Date().toISOString().split('T')[0],
      reply: 'Recibido en buzón. Un asesor o el Director revisará esto en breve.'
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('tebaev_messages', JSON.stringify(updated));
    setBuzonForm({ name: '', type: 'Sugerencia Académica', content: '' });
    showNotification('Sugerencia enviada correctamente. Se ha publicado abajo.', 'success');
  };

  const triggerPrintFicha = () => {
    window.print();
  };

  return (
    <div className="bg-alabaster py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-sage font-extrabold text-xs uppercase tracking-widest font-mono">Espacio Estudiantil</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-pine tracking-tight font-normal">
            Portal Digital del Alumno
          </h2>
          <p className="text-earthy text-sm sm:text-base font-normal">
            Herramientas y servicios digitales diseñados para simplificar tu vida académica en el TEBAEV Mahuixtlán. Pre-regístrate, calcula tus calificaciones y accede a recursos institucionales.
          </p>
        </div>

        {/* Global Notification Panel */}
        {notification && (
          <div className={`max-w-xl mx-auto p-4 rounded-xl border text-xs font-semibold flex items-center gap-3 shadow-2xs transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-sage-light border-sage-soft text-forest' 
              : notification.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-alabaster border-linen text-pine'
          }`}>
            <CheckCircle className="h-4.5 w-4.5 flex-shrink-0" />
            <span>{notification.text}</span>
          </div>
        )}

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-linen pb-3">
          <button
            onClick={() => setActiveTab('preregistro')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'preregistro'
                ? 'bg-sage text-white shadow-xs scale-[1.02]'
                : 'bg-white hover:bg-sage-light/40 text-earthy border border-linen'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            Pre-registro 2026/2027
          </button>

          <button
            onClick={() => setActiveTab('simulador')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'simulador'
                ? 'bg-sage text-white shadow-xs scale-[1.02]'
                : 'bg-white hover:bg-sage-light/40 text-earthy border border-linen'
            }`}
          >
            <Calculator className="h-4 w-4" />
            Simulador de Promedio
          </button>

          <button
            onClick={() => setActiveTab('recursos')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'recursos'
                ? 'bg-sage text-white shadow-xs scale-[1.02]'
                : 'bg-white hover:bg-sage-light/40 text-earthy border border-linen'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Descarga de Guías
          </button>

          <button
            onClick={() => setActiveTab('buzon')}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'buzon'
                ? 'bg-sage text-white shadow-xs scale-[1.02]'
                : 'bg-white hover:bg-sage-light/40 text-earthy border border-linen'
            }`}
          >
            <Send className="h-4 w-4" />
            Buzón de Opiniones
          </button>
        </div>

        {/* Tab Contents: PRE-REGISTRO */}
        {activeTab === 'preregistro' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-2xs border border-linen">
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-serif font-bold text-pine">Admisión & Pre-registro</h3>
                <p className="text-xs text-earthy leading-relaxed font-normal">
                  Completa esta ficha digital para iniciar tu simulación de ingreso al ciclo escolar 2026 - 2027. Al finalizar, podrás visualizar e imprimir tu solicitud foliada para validarla en el plantel de Mahuixtlán.
                </p>
              </div>

              <form onSubmit={handlePreSubmit} className="space-y-6">
                
                {/* Section A: Datos Personales */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-sage uppercase tracking-widest border-b border-linen pb-1.5">
                    A. Datos del Estudiante
                  </h4>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-pine block">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez Gómez"
                        value={newRecord.fullName}
                        onChange={(e) => setNewRecord({ ...newRecord, fullName: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/50 text-pine font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-pine block">CURP (Clave Única) *</label>
                      <input
                        type="text"
                        required
                        maxLength={18}
                        placeholder="18 caracteres"
                        value={newRecord.curp}
                        onChange={(e) => setNewRecord({ ...newRecord, curp: e.target.value.toUpperCase() })}
                        className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/50 text-pine font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-pine block">Fecha Nacimiento</label>
                      <input
                        type="date"
                        value={newRecord.birthDate}
                        onChange={(e) => setNewRecord({ ...newRecord, birthDate: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/50 text-pine"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-pine block">Secundaria Procedencia</label>
                      <input
                        type="text"
                        placeholder="Ej. Telesecundaria Mahuixtlán"
                        value={newRecord.middleSchool}
                        onChange={(e) => setNewRecord({ ...newRecord, middleSchool: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/50 text-pine font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-pine block">Promedio Secundaria</label>
                      <input
                        type="number"
                        step="0.1"
                        min="5"
                        max="10"
                        value={newRecord.gpa}
                        onChange={(e) => setNewRecord({ ...newRecord, gpa: Number(e.target.value) })}
                        className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/50 text-pine font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Tutores */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-semibold text-sage uppercase tracking-widest border-b border-linen pb-1.5">
                    B. Datos del Padre o Tutor
                  </h4>
                  
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-1">
                      <label className="text-xs font-bold text-pine block">Nombre del Tutor</label>
                      <input
                        type="text"
                        placeholder="Madre, Padre o Tutor"
                        value={newRecord.guardianName}
                        onChange={(e) => setNewRecord({ ...newRecord, guardianName: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/50 text-pine font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-pine block">Teléfono Contacto *</label>
                      <input
                        type="tel"
                        required
                        placeholder="10 dígitos celular"
                        value={newRecord.guardianPhone}
                        onChange={(e) => setNewRecord({ ...newRecord, guardianPhone: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/50 text-pine font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-pine block">E-mail Tutor</label>
                      <input
                        type="email"
                        placeholder="ejemplo@mail.com"
                        value={newRecord.guardianEmail}
                        onChange={(e) => setNewRecord({ ...newRecord, guardianEmail: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/50 text-pine"
                      />
                    </div>
                  </div>
                </div>

                {/* Section C: Área de Especialización */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-semibold text-sage uppercase tracking-widest border-b border-linen pb-1.5">
                    C. Conveniencia Propedéutica Inicial
                  </h4>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-earthy block font-semibold">Selecciona el Área de interés preliminar:</label>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {['Químico-Biólogo', 'Físico-Matemático', 'Humanidades y Ciencias Sociales'].map((area) => (
                        <label
                          key={area}
                          className={`border rounded-xl p-3.5 flex items-center gap-2 cursor-pointer transition-all duration-150 ${
                            newRecord.selectedArea === area
                              ? 'border-sage bg-sage-light/40 text-pine font-bold shadow-2xs'
                              : 'border-linen hover:bg-sage-light/20 text-earthy'
                          }`}
                        >
                          <input
                            type="radio"
                            name="selectedArea"
                            checked={newRecord.selectedArea === area}
                            onChange={() => setNewRecord({ ...newRecord, selectedArea: area })}
                            className="text-sage focus:ring-sage"
                          />
                          <span className="text-xs">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-sage hover:bg-forest text-white font-bold rounded-xl shadow-xs transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Registrar y Generar Ficha Oficial
                  </button>
                </div>
              </form>
            </div>

            {/* Display generated Ficha Column */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* If Ficha has been submitted */}
              {registeredFicha ? (
                <div className="bg-pine text-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-xs border border-forest/30 relative overflow-hidden" id="print-area">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sage/10 rounded-full blur-2xl"></div>
                  
                  {/* Ficha Header */}
                  <div className="border-b border-forest/50 pb-4 text-center space-y-1">
                    <div className="text-[10px] font-bold text-sage-soft font-mono tracking-widest uppercase">TELEBACHILLERATO MAHUIXTLÁN</div>
                    <h4 className="text-lg font-serif font-black tracking-tight text-white uppercase">Pre-registro Digital</h4>
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold bg-forest/40 border border-forest/65 text-sage-soft font-mono">
                      FOLIO: TEB-2026-0{(preRecords.length + 154)}
                    </span>
                  </div>

                  {/* Ficha Body */}
                  <div className="py-5 space-y-4 text-xs">
                    <div className="space-y-1 bg-forest/30 p-3 rounded-xl border border-forest/50">
                      <span className="text-[10px] text-sage-soft font-bold block uppercase tracking-wider">Nombre Aspirante</span>
                      <p className="font-serif font-extrabold text-sm text-white">{registeredFicha.fullName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-sage-soft block uppercase">CURP</span>
                        <p className="font-semibold text-white font-mono uppercase">{registeredFicha.curp}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-sage-soft block uppercase">Fecha Nacimiento</span>
                        <p className="font-semibold text-white">{registeredFicha.birthDate || 'No capturada'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-sage-soft block uppercase">Secundaria</span>
                        <p className="font-semibold text-white">{registeredFicha.middleSchool || 'Por definir'}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-sage-soft block uppercase">Promedio</span>
                        <p className="font-semibold text-white font-mono">{registeredFicha.gpa} / 10.0</p>
                      </div>
                    </div>

                    <div className="space-y-1 bg-forest/30 p-3 rounded-xl border border-forest/50">
                      <span className="text-[10px] text-sage-soft font-bold block uppercase tracking-wider">Área propedéutica preliminar</span>
                      <p className="font-bold text-white italic">{registeredFicha.selectedArea}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-sage-soft block uppercase">Padre, Madre o Tutor</span>
                      <p className="font-semibold text-white">{registeredFicha.guardianName || 'Ninguno'} ({registeredFicha.guardianPhone})</p>
                    </div>
                  </div>

                  {/* Stamp/Instructions */}
                  <div className="border-t border-forest/50 pt-4 text-[10px] text-sage-soft leading-relaxed space-y-1.5">
                    <span className="font-bold text-white uppercase block tracking-wider">Siguientes Pasos:</span>
                    <ol className="list-decimal pl-4 space-y-1 text-[#E5E3D8]">
                      <li>Imprime esta ficha utilizando el botón inferior.</li>
                      <li>Acude al plantel del TEBAEV Mahuixtlán para validación.</li>
                      <li>Entrega copias de CURP, Boleta Escolar y Acta de Nacimiento.</li>
                    </ol>
                  </div>

                  {/* Print trigger button */}
                  <div className="mt-5 pt-3 border-t border-forest/50 flex justify-between gap-2.5">
                    <button
                      onClick={() => setRegisteredFicha(null)}
                      className="px-3 py-2 bg-forest/40 hover:bg-forest/60 border border-forest text-xs text-white font-medium rounded-xl cursor-pointer"
                    >
                      Nuevo Pre-registro
                    </button>
                    <button
                      onClick={triggerPrintFicha}
                      className="px-4 py-2 bg-sage hover:bg-forest text-white border border-sage-soft font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="h-4 w-4" />
                      Imprimir Ficha (PDF)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-sage-light/45 rounded-3xl p-6 sm:p-8 border border-sage-soft space-y-4">
                  <div className="bg-sage p-3 rounded-xl text-white inline-block shadow-2xs">
                    <UserCheck className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <h4 className="text-pine font-serif font-semibold text-lg">¿Listo para matricularte?</h4>
                  <p className="text-xs text-earthy leading-relaxed font-normal">
                    Llena el formulario a tu izquierda para crear tu ficha. Es un pre-registro digital interactivo preliminar oficial. No genera costos, te aparta un lugar informativo y agiliza tu inscripción definitiva en el plantel.
                  </p>
                  
                  <div className="pt-2">
                    <span className="text-xs text-pine block font-bold mb-1">Documentos Básicos Solicitados:</span>
                    <ul className="text-xs text-earthy space-y-1 list-disc pl-4 font-normal">
                      <li>Certificado de Secundaria (completo con promedio)</li>
                      <li>Acta de Nacimiento original legible</li>
                      <li>Clave Única de Registro de Población (CURP) impresa</li>
                      <li>6 fotos tamaño infantil del alumno (estudio b/n)</li>
                      <li>Comprobante de domicilio reciente (Mahuixtlán o Coatepec)</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-linen mt-4 text-[11px] font-mono flex items-center justify-between text-earthy">
                    <span>Estatus del Portal:</span>
                    <span className="font-bold text-forest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse inline-block border border-sage-soft"></span>
                      Operando 2026
                    </span>
                  </div>
                </div>
              )}

              {/* Show counter of simulated records */}
              <div className="bg-white rounded-xl p-4 border border-linen shadow-2xs text-xs">
                <div className="flex items-center justify-between text-earthy">
                  <span>Pre-registros simulados este ciclo:</span>
                  <span className="font-bold text-pine bg-sage-light/50 px-2.5 py-1 rounded-full border border-sage-soft/60 font-mono">
                    {preRecords.length + 14} Aspirantes
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab Contents: GRADES SIMULATOR */}
        {activeTab === 'simulador' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            {/* Calculator Control Panel (Left) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-2xs border border-linen space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-linen pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-pine flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-sage" />
                    Simulador de Calificación Semestral
                  </h3>
                  <p className="text-xs text-clay mt-1">
                    Ingresa o modifica los parciales y el examen de tus asignaturas para calcular tu nota final ponderada oficial del TEBAEV.
                  </p>
                </div>

                {/* Add new mock subject Form */}
                <form onSubmit={handleAddSubject} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Escribe otra materia..."
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    className="text-xs px-3 py-2 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 font-medium text-pine max-w-[170px]"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-sage hover:bg-forest text-white rounded-xl transition-all duration-200 cursor-pointer shadow-2xs"
                    title="Añadir materia"
                  >
                    <Plus className="h-4.5 w-4.5" />
                  </button>
                </form>
              </div>

              {/* Subject grade sliders / number inputs */}
              <div className="space-y-4">
                {subjects.map((sub, sIdx) => {
                  const finalG = getFinalSubjectGrade(sub);
                  const passes = finalG >= 6.0;

                  return (
                    <div key={sIdx} className="bg-sage-light/10 p-4.5 sm:p-5 border border-sage-soft/40 rounded-2xl grid md:grid-cols-12 gap-4 items-center">
                      {/* Name of subject */}
                      <div className="md:col-span-4">
                        <span className="font-serif font-bold text-sm sm:text-base block text-pine truncate" title={sub.name}>
                          {sub.name}
                        </span>
                        <button
                          onClick={() => deleteSubject(sIdx)}
                          className="text-[10px] text-red-700 uppercase font-semibold font-mono hover:underline flex items-center gap-0.5 mt-1 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Eliminar Materia
                        </button>
                      </div>

                      {/* Parcial Inputs */}
                      <div className="md:col-span-5 grid grid-cols-4 gap-2 text-center text-xs">
                        <div>
                          <span className="text-[9px] text-[#7A7A7A] block font-bold mb-1">PARCIAL 1</span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.5"
                            value={sub.p1}
                            onChange={(e) => handleGradeChange(sIdx, 'p1', Number(e.target.value))}
                            className="bg-white border border-linen rounded-lg p-1.5 w-11 sm:w-12 text-center text-xs font-bold text-pine shadow-inner focus:outline-none focus:border-sage"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-[#7A7A7A] block font-bold mb-1">PARCIAL 2</span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.5"
                            value={sub.p2}
                            onChange={(e) => handleGradeChange(sIdx, 'p2', Number(e.target.value))}
                            className="bg-white border border-linen rounded-lg p-1.5 w-11 sm:w-12 text-center text-xs font-bold text-pine shadow-inner focus:outline-none focus:border-sage"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-[#7A7A7A] block font-bold mb-1">PARCIAL 3</span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.5"
                            value={sub.p3}
                            onChange={(e) => handleGradeChange(sIdx, 'p3', Number(e.target.value))}
                            className="bg-white border border-linen rounded-lg p-1.5 w-11 sm:w-12 text-center text-xs font-bold text-pine shadow-inner focus:outline-none focus:border-sage"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-sage block font-extrabold mb-1">EXAMEN (40%)</span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.5"
                            value={sub.exam}
                            onChange={(e) => handleGradeChange(sIdx, 'exam', Number(e.target.value))}
                            className="bg-white border border-sage rounded-lg p-1.5 w-11 sm:w-12 text-center text-xs font-extrabold text-[#294B29] shadow-inner focus:outline-none focus:border-sage"
                          />
                        </div>
                      </div>

                      {/* Display calculations */}
                      <div className="md:col-span-3 text-right bg-white p-2.5 rounded-xl border border-linen flex items-center justify-between md:flex-col md:items-end">
                        <span className="text-[9px] text-clay font-mono uppercase font-semibold">Nota Ponderada</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-base sm:text-lg font-bold font-mono ${passes ? 'text-forest' : 'text-red-700'}`}>
                            {finalG}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            passes ? 'bg-sage-light text-forest' : 'bg-red-50 text-red-800'
                          }`}>
                            {passes ? 'Aprobada' : 'Reprobada'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* GPA Summary Board (Right) */}
            <div className="lg:col-span-4 bg-pine text-[#ECE9E1] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-lg font-serif font-bold text-alabaster border-b border-forest/50 pb-3">Resumen Escolar</h3>

              {/* Circular Indicator */}
              <div className="flex flex-col items-center justify-center p-6 bg-forest/20 rounded-2xl border border-forest/60 text-center space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#DFDCD2] font-semibold">Promedio Ponderado</span>
                
                <div className="w-28 h-28 rounded-full border-4 border-sage flex flex-col items-center justify-center bg-forest/30 shadow-inner">
                  <span className="text-3xl font-bold text-white font-mono">
                    {getOverallAverage()}
                  </span>
                  <span className="text-[9px] italic text-sage-soft">Escala 10.0</span>
                </div>

                <div className="pt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold leading-none ${
                    getOverallAverage() >= 8.5 
                      ? 'bg-sage text-white' 
                      : getOverallAverage() >= 6.0 
                      ? 'bg-forest text-alabaster border border-forest/50' 
                      : 'bg-red-900 text-white'
                  }`}>
                    {getOverallAverage() >= 9.0 
                      ? 'Desempeño Excelente ✨' 
                      : getOverallAverage() >= 8.0 
                      ? 'Desempeño Sobresaliente 👍' 
                      : getOverallAverage() >= 6.0 
                      ? 'Aprobado del Ciclo ✔️' 
                      : 'Atención Académica Requerida ⚠️'}
                  </span>
                </div>
              </div>

              {/* Recommendation Tips Box */}
              <div className="space-y-3 bg-forest/15 p-4 rounded-xl border border-forest/30">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wide">
                  <Lightbulb className="h-4 w-4 text-sage-soft" />
                  Comprensión Didáctica
                </h4>

                <p className="text-xs text-[#DCD9CE] leading-relaxed font-normal">
                  {getOverallAverage() >= 8.5 
                    ? '¡Excelente rendimiento académico! Tu ponderación califica satisfactoriamente de cara al programa de Becas Benito Juárez y avala tu solicitud pre-universitaria.'
                    : getOverallAverage() >= 6.0
                    ? 'Estás aprobado de forma regular. Ten presente que el Examen de Semestre final constituye el 40% de la nota final: repasar las guías impresas aumentará poderosamente tu promedio.'
                    : 'Pérdida de promedio aprobatorio. Te recomendamos encarecidamente consultar a tu profesor o al Prof. Antonio Hernández Carmona para coordinar tutorías personalizadas gratuitas.'}
                </p>
              </div>

              {/* Informative breakdown rules */}
              <div className="bg-forest/20 p-3.5 rounded-xl text-xs space-y-1.5 text-[#ECE9E1] border border-forest/30">
                <div className="font-semibold text-white uppercase text-[9px] tracking-widest mb-1 font-mono">Ponderación Oficial SEV</div>
                <div className="flex justify-between items-center text-[11px] text-stone-200">
                  <span>Evaluaciones parciales (P1, P2, P3):</span>
                  <span className="font-bold text-white">60%</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-stone-200">
                  <span>Examen Semestral Final:</span>
                  <span className="font-bold text-white">40%</span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1.5 border-t border-forest/50 text-white font-semibold">
                  <span>Promedio aprobatorio básico:</span>
                  <span className="text-sage-soft font-bold">6.0 puntos</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab Contents: GUIDES DOWNLOADS */}
        {activeTab === 'recursos' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-pine text-white p-6 rounded-3xl shadow-2xs border border-forest/30 flex items-center gap-4">
              <div className="p-3 bg-sage-light text-forest rounded-xl hidden sm:block">
                <BookOpen className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-white">Biblioteca del Telebachillerato</h3>
                <p className="text-xs text-stone-350 opacity-90 leading-relaxed font-normal">
                  Descarga módulos pedagógicos autorizados por la Dirección General de Telebachillerato de Veracruz. Materiales listos para consulta digital en formato PDF fuera de línea.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Estadística y Probabilidad (6º Sem)', level: 'Sexto Semestre', size: '4.8 MB', icon: FileText, desc: 'Temario completo de probabilidad, toma de decisiones financieras y análisis descriptivo.' },
                { title: 'Biología y Ecología Regional (6º Sem)', level: 'Sexto Semestre', size: '3.1 MB', icon: BookOpen, desc: 'Análisis y preservación de ecosistemas agrícolas y flora en la zona montañosa baja de Coatepec.' },
                { title: 'Guía de Admisión Universitaria (EXANI-II)', level: 'Preparación', size: '2.5 MB', icon: Compass, desc: 'Estructura de reactivos, lógica analítica e instructivos formales para el ingreso superior.' },
                { title: 'Ofimática y Base de Datos Aplicada', level: 'Quinto Semestre', size: '5.2 MB', icon: FileText, desc: 'Capacitación para el trabajo enfocado en hojas numéricas Excel y diseño de bases de información.' },
                { title: 'Taller de Lectura y Redacción II (2º Sem)', level: 'Segundo Semestre', size: '1.9 MB', icon: BookOpen, desc: 'Construcción discursiva, tipología de textos científicos, y corrección lingüística del alumno.' },
                { title: 'Reglamento de Convivencia Plantel Mahuixtlán', level: 'Normativo', size: '1.1 MB', icon: FileText, desc: 'Acuerdo de disciplina, horarios formales, justificación de inasistencias y asambleas escolares.' }
              ].map((rec, rIdx) => {
                const IconComp = rec.icon;
                return (
                  <div key={rIdx} className="bg-white rounded-2xl p-5 shadow-2xs border border-linen flex flex-col justify-between hover:shadow-sm transition-all duration-200">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="px-2.5 py-0.5 rounded text-[10px] bg-sage-light text-forest border border-sage-soft font-extrabold uppercase tracking-wide">
                          {rec.level}
                        </span>
                        <span className="text-[10px] text-clay font-mono font-medium">{rec.size}</span>
                      </div>
                      
                      <h4 className="font-serif font-bold text-pine text-sm sm:text-base leading-snug">{rec.title}</h4>
                      <p className="text-xs text-earthy leading-relaxed font-normal">{rec.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-linen mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-clay font-bold tracking-wide">PDF Oficial SEV</span>
                      <button
                        onClick={() => showNotification(`Descargando "${rec.title}" en formato PDF...`, 'success')}
                        className="p-2 text-sage hover:text-forest hover:bg-sage-light/35 rounded-xl transition-all duration-150 cursor-pointer border border-transparent hover:border-sage-soft"
                        title="Descargar archivo"
                      >
                        <Download className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Contents: VIRTUAL MAILBOX */}
        {activeTab === 'buzon' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            {/* Box Form (Left) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-2xs border border-linen space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-pine">Buzón Escolar de Opinión</h3>
                <p className="text-xs text-earthy mt-1 leading-relaxed font-normal">
                  ¿Tienes dudas, sugerencias cívicas, propuestas deportivas o inquietudes para el Directorio del TEBAEV Mahuixtlán? Tu voz impulsa mejoras constantes en el plantel.
                </p>
              </div>

              <form onSubmit={handleBuzonSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block block">Tu Nombre (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej. Anónimo, o tu nombre"
                    value={buzonForm.name}
                    onChange={(e) => setBuzonForm({ ...buzonForm, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block block">Categoría de Mensaje</label>
                  <select
                    value={buzonForm.type}
                    onChange={(e) => setBuzonForm({ ...buzonForm, type: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine font-medium"
                  >
                    <option>Sugerencia Académica</option>
                    <option>Consulta de Calendario</option>
                    <option>Sugerencia de Infraestructura</option>
                    <option>Mensaje al Director</option>
                    <option>Comité de Padres de Familia</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block block">Texto del Mensaje *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Escribe aquí con detalle y respeto..."
                    value={buzonForm.content}
                    onChange={(e) => setBuzonForm({ ...buzonForm, content: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sage hover:bg-forest text-white font-bold rounded-xl shadow-2xs transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  Enviar al Buzón
                </button>
              </form>
            </div>

            {/* List entries of opinions (Right) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-2xs border border-linen space-y-6">
              <h3 className="text-lg font-serif font-bold text-pine flex items-center gap-2 border-b border-linen pb-3">
                <Compass className="h-5 w-5 text-sage" />
                Mensajes Recientes & Respuestas
              </h3>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {messages.length === 0 ? (
                  <p className="text-xs text-clay italic text-center py-6">No hay sugerencias en el buzón todavía.</p>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="bg-alabaster/60 p-4 border border-linen rounded-2xl space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="font-serif font-extrabold text-sm text-pine block">{msg.name}</span>
                          <span className="inline-block mt-1 text-[9px] font-bold bg-[#E8DDD5] text-stone-700 px-2.5 py-0.5 rounded-lg">
                            {msg.type}
                          </span>
                        </div>
                        <span className="text-[10px] text-clay font-mono">{msg.date}</span>
                      </div>

                      <p className="text-xs text-earthy font-normal leading-relaxed">
                        "{msg.content}"
                      </p>

                      {/* Display replies if exist */}
                      {msg.reply && (
                        <div className="bg-sage-light/35 p-3 rounded-xl border border-sage-soft/60 space-y-1">
                          <div className="flex items-center gap-1 text-[10px] text-forest font-bold font-mono uppercase tracking-wider">
                            <CheckCircle className="h-3.5 w-3.5 text-sage" /> Respuesta de Dirección
                          </div>
                          <p className="text-xs text-[#3E4A3E] italic">
                            {msg.reply}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
