import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, X, Image as ImageIcon, Heart, Camera, Trash2, Maximize2, 
  FileWarning, Sprout, Landmark, GraduationCap, Check, Plus, Pencil,
  Download, Save, FileUp
} from 'lucide-react';

// Import images so Vite processes them into valid URLs for dev & production builds
// @ts-ignore
import sugarcaneFields from '../assets/images/sugarcane_fields_1780674708773.png';
// @ts-ignore
import veracruzFolkDance from '../assets/images/veracruz_folk_dance_1780674721671.png';
// @ts-ignore
import schoolClassroom from '../assets/images/school_classroom_1780674737243.png';
// @ts-ignore
import coffeeCherries from '../assets/images/coffee_cherries_1780674749779.png';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'academic' | 'community' | 'agriculture' | 'user';
  description: string;
  date: string;
  likes: number;
  isOfficial: boolean;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'academic' | 'community' | 'agriculture' | 'user'>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [imageTitle, setImageTitle] = useState<string>('');
  const [imageDesc, setImageDesc] = useState<string>('');
  const [imageCat, setImageCat] = useState<'academic' | 'community' | 'agriculture' | 'user'>('academic');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit State variables
  const [editingImage, setEditingImage] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDesc, setEditDesc] = useState<string>('');
  const [editCategory, setEditCategory] = useState<'academic' | 'community' | 'agriculture' | 'user'>('academic');
  const [editSrc, setEditSrc] = useState<string>('');

  // Load baseline images + user uploads with full edit persistence
  useEffect(() => {
    const defaultGallery: GalleryItem[] = [
      {
        id: 'official-1',
        src: sugarcaneFields,
        title: 'Campos de Caña de Azúcar',
        category: 'agriculture',
        description: 'Vistas panorámicas de los sembradíos ejidales de caña de azúcar que rodean las instalaciones de Mahuixtlán.',
        date: '2026-05-12',
        likes: 24,
        isOfficial: true
      },
      {
        id: 'official-2',
        src: veracruzFolkDance,
        title: 'Festival de la Jarocha',
        category: 'community',
        description: 'Alumnos vistiendo el tradicional traje de jarocho blanco de Veracruz durante las asambleas ejidales y festejos patrios.',
        date: '2026-05-20',
        likes: 42,
        isOfficial: true
      },
      {
        id: 'official-3',
        src: schoolClassroom,
        title: 'Aulas de Informática Dinámica',
        category: 'academic',
        description: 'El alumnado cooperando activamente en el módulo de capacitación laboral para la administración y bases de datos.',
        date: '2026-05-28',
        likes: 18,
        isOfficial: true
      },
      {
        id: 'official-4',
        src: coffeeCherries,
        title: 'Cafetales de Coatepec',
        category: 'agriculture',
        description: 'Cultivo local de café cereza de altura, un símbolo de profunda tradición que fomenta el orgullo de nuestra cuenca ecológica.',
        date: '2026-06-02',
        likes: 31,
        isOfficial: true
      }
    ];

    const savedFullGallery = localStorage.getItem('tebaev_full_gallery');
    if (savedFullGallery) {
      try {
        const parsed = JSON.parse(savedFullGallery) as GalleryItem[];
        // Auto-heal logic: ensure official keys use active Vite imported assets in case they were stored as broken paths
        const healed = parsed.map(item => {
          if (item.isOfficial) {
            const match = defaultGallery.find(dg => dg.id === item.id);
            if (match) {
              return { ...item, src: match.src };
            }
          }
          return item;
        });
        setItems(healed);
        localStorage.setItem('tebaev_full_gallery', JSON.stringify(healed));
      } catch (e) {
        setItems(defaultGallery);
      }
    } else {
      const savedUserImages = localStorage.getItem('tebaev_user_gallery');
      if (savedUserImages) {
        try {
          const parsedUser = JSON.parse(savedUserImages) as GalleryItem[];
          const initialMerged = [...defaultGallery, ...parsedUser];
          setItems(initialMerged);
          localStorage.setItem('tebaev_full_gallery', JSON.stringify(initialMerged));
        } catch (e) {
          setItems(defaultGallery);
        }
      } else {
        setItems(defaultGallery);
        localStorage.setItem('tebaev_full_gallery', JSON.stringify(defaultGallery));
      }
    }
  }, []);

  const updateGalleryState = (updatedItems: GalleryItem[]) => {
    setItems(updatedItems);
    localStorage.setItem('tebaev_full_gallery', JSON.stringify(updatedItems));
  };

  // Like system
  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = items.map(item => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    });
    updateGalleryState(updated);
  };

  // Delete user image
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImage?.id === id) {
      setActiveImage(null);
    }
    const updated = items.filter(item => item.id !== id);
    updateGalleryState(updated);
  };

  // Open Edit Dialog
  const handleOpenEdit = (item: GalleryItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingImage(item);
    setEditTitle(item.title);
    setEditDesc(item.description);
    setEditCategory(item.category);
    setEditSrc(item.src);
  };

  // Save changes
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    const updated = items.map(item => {
      if (item.id === editingImage.id) {
        return {
          ...item,
          title: editTitle.trim() || 'Foto sin título',
          description: editDesc.trim(),
          category: editCategory,
          src: editSrc,
        };
      }
      return item;
    });

    updateGalleryState(updated);

    if (activeImage && activeImage.id === editingImage.id) {
      setActiveImage({
        ...activeImage,
        title: editTitle.trim() || 'Foto sin título',
        description: editDesc.trim(),
        category: editCategory,
        src: editSrc,
      });
    }

    setEditingImage(null);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un formato de imagen válido (PNG, JPEG, WEBP).');
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        alert('La imagen es demasiado pesada (Máximo 4MB recomendado para fluidez del navegador).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Src = event.target?.result as string;
        setEditSrc(base64Src);
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert File to Base64
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un formato de imagen válido (PNG, JPEG, WEBP).');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert('La imagen es demasiado pesada (Máximo 4MB recomendado para fluidez del navegador).');
      return;
    }

    setUploadProgress(10);
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 90) + 10;
        setUploadProgress(percent);
      }
    };

    reader.onload = (e) => {
      const base64Src = e.target?.result as string;
      
      const newItem: GalleryItem = {
        id: 'user-' + Date.now(),
        src: base64Src,
        title: imageTitle.trim() || file.name.split('.')[0] || 'Foto aportada',
        category: imageCat,
        description: imageDesc.trim() || 'Imagen subida desde la galería del usuario.',
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        isOfficial: false
      };

      const updated = [newItem, ...items];
      updateGalleryState(updated);

      setUploadProgress(null);
      setImageTitle('');
      setImageDesc('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.readAsDataURL(file);
  };

  // File triggers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const importFileInputRef = useRef<HTMLInputElement>(null);

  // Export customized gallery as JSON
  const handleExportGallery = () => {
    try {
      const dataStr = JSON.stringify(items, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `galeria_tebaev_mahuixtlan_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Error al intentar exportar las fotos: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  // Import customized gallery back from JSON
  const handleImportGallery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            const isValid = parsed.every(item => item && typeof item === 'object' && 'id' in item && 'src' in item && 'title' in item);
            if (!isValid) {
              alert('El archivo no tiene el formato de copia de seguridad de galería correcto.');
              return;
            }
            // Update and save State
            updateGalleryState(parsed);
            alert('¡Álbum cargado con éxito! Tus fotos y cambios han sido restaurados completamente.');
          } else {
            alert('El archivo de respaldo no es válido.');
          }
        } catch (err) {
          alert('Hubo un error al leer el archivo. Asegúrate que sea un respaldo válido .json.');
        }
        if (importFileInputRef.current) importFileInputRef.current.value = '';
      };
      reader.readAsText(file);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : selectedCategory === 'user'
      ? items.filter(i => !i.isOfficial || i.category === 'user')
      : items.filter(i => i.category === selectedCategory);

  return (
    <div className="bg-alabaster py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Gallery Intro Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-sage font-extrabold text-xs uppercase tracking-widest font-mono">Galería del Plantel</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-pine tracking-tight font-normal">
            Álbum de Recuerdos Comunitario
          </h2>
          <p className="text-earthy text-sm sm:text-base font-normal">
            Explora las fotos oficiales del Telebachillerato Mahuixtlán o contribuye subiendo tus propias capturas de eventos escolares, desfiles ejidales y proyectos cañeros.
          </p>
        </div>

        {/* Upload contribution block */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs border border-linen grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Instructions and Meta input fields */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-sage-light text-forest rounded-xl border border-sage-soft">
                <Camera className="h-5 w-5 text-sage" />
              </div>
              <h3 className="text-lg font-serif font-bold text-pine">Aporta una Foto de tu Galería</h3>
            </div>
            
            <p className="text-xs text-earthy leading-relaxed font-normal">
              Comparte momentos significativos, trabajos comunitarios o memorias con tus compañeros. Tus imágenes se guardarán localmente en la memoria de tu navegador de manera segura.
            </p>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-pine block">Título de la Foto (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. Desfile de Independencia 2026"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-pine block">Pie de Foto / Descripción (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Ej. Alumnos de sexto semestre participando con gran entusiasmo."
                  value={imageDesc}
                  onChange={(e) => setImageDesc(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine font-normal"
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-pine block">Categoría de Visualización *</label>
                <select
                  value={imageCat}
                  onChange={(e) => setImageCat(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-2 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine font-medium cursor-pointer"
                >
                  <option value="academic">Académicas (Aulas, Talleres)</option>
                  <option value="community">Cultura y Comunidad (Festivales, Fiestas)</option>
                  <option value="agriculture">Cafetales y Caña (Campo de Mahuixtlán)</option>
                  <option value="user">Mis Fotos (Álbum de Usuario)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drag and Drop Zone Container */}
          <div className="lg:col-span-7">
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] transition-all cursor-pointer relative ${
                isDragActive 
                  ? 'border-sage bg-sage-light/40 scale-[0.99] shadow-inner' 
                  : 'border-sage-soft hover:border-sage hover:bg-alabaster/40 bg-alabaster/10'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {uploadProgress !== null ? (
                <div className="space-y-3 w-full max-w-[240px]">
                  <div className="flex justify-between text-xs text-pine font-bold">
                    <span>Procesando imagen...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-linen h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sage h-1.5 transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-full shadow-2xs inline-block text-sage border border-linen">
                    <Upload className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-pine">
                      Arrastra y suelta tu foto aquí, o haz clic para explorar
                    </p>
                    <p className="text-[10px] text-clay font-mono mt-1 font-medium">
                      Formatos soportados: JPG, PNG, WEBP (Hasta 4 MB)
                    </p>
                  </div>
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] bg-sage-light text-forest font-bold border border-sage-soft">
                    <Check className="h-3.5 w-3.5" /> Selección Segura Offline
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Persistence / Backup / Multi-device Sync tools for User Gallery */}
        <div className="bg-gradient-to-r from-sage-light/30 to-sage-light/10 border border-sage-soft rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-sage animate-pulse"></span>
              <h4 className="text-sm font-bold text-pine font-mono uppercase tracking-wider">Copia de Seguridad & Sincronización del Álbum</h4>
            </div>
            <h3 className="text-xl font-serif font-bold text-pine">Conserva tus Fotos en el Enlace de Compartimento</h3>
            <p className="text-xs sm:text-sm text-earthy leading-relaxed font-normal">
              Dado que tu navegador guarda las fotos de manera segura y local (offline), al abrir el enlace compartido por primera vez verás el álbum en su estado original. 
              <strong> ¡No te preocupes!</strong> Descarga tu copia con <strong>Exportar Álbum</strong>, abre el enlace compartido, e <strong>Impórtalo</strong> para recuperar todas tus fotos y títulos para siempre.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 w-full md:w-auto shrink-0 justify-start sm:justify-center">
            {/* Hidden Input for Importing .json */}
            <input
              type="file"
              ref={importFileInputRef}
              onChange={handleImportGallery}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={handleExportGallery}
              className="flex items-center gap-2 px-5 py-2.5 bg-pine hover:bg-forest text-white text-xs font-bold rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" /> Exportar Álbum (.json)
            </button>
            <button
              onClick={() => importFileInputRef.current?.click()}
              className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-alabaster text-pine border border-linen text-xs font-bold rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <FileUp className="h-4 w-4 text-sage" /> Importar Álbum (.json)
            </button>
          </div>
        </div>

        {/* Filter Navigation and Gallery Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-linen pb-3">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-pine text-xl">Galería Fotográfica ({filteredItems.length})</h3>
              <p className="text-xs text-clay">Visualiza recuerdos organizados por categorías de interés regional.</p>
            </div>

            {/* Navigation Tabs for categories */}
            <div className="flex flex-wrap gap-1 bg-white/60 border border-linen p-1 rounded-xl">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-sage text-white shadow-2xs'
                    : 'text-earthy hover:bg-sage-light'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setSelectedCategory('academic')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'academic'
                    ? 'bg-sage text-white shadow-2xs'
                    : 'text-earthy hover:bg-sage-light'
                }`}
              >
                Académicas
              </button>
              <button
                onClick={() => setSelectedCategory('community')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'community'
                    ? 'bg-sage text-white shadow-2xs'
                    : 'text-earthy hover:bg-sage-light'
                }`}
              >
                Comunidad
              </button>
              <button
                onClick={() => setSelectedCategory('agriculture')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === 'agriculture'
                    ? 'bg-sage text-white shadow-2xs'
                    : 'text-earthy hover:bg-sage-light'
                }`}
              >
                Cafetales/Caña
              </button>
              <button
                onClick={() => setSelectedCategory('user')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 cursor-pointer ${
                  selectedCategory === 'user'
                    ? 'bg-sage text-white shadow-2xs'
                    : 'text-earthy hover:bg-sage-light'
                }`}
              >
                Mis Fotos
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          {filteredItems.length === 0 ? (
            <div className="bg-white border border-linen rounded-3xl p-12 text-center max-w-md mx-auto space-y-3 shadow-2xs">
              <div className="p-3 bg-red-50 text-red-700/80 rounded-full inline-block border border-red-100">
                <FileWarning className="h-6 w-6" />
              </div>
              <h4 className="font-serif font-bold text-pine text-base">No hay imágenes en esta sección</h4>
              <p className="text-xs text-earthy leading-relaxed font-normal">
                {selectedCategory === 'user' 
                  ? 'Aún no has aportado capturas tuyas. Utiliza el cargador superior para integrar fotos desde la galería de tu celular o computadora.'
                  : 'No se encontraron fotos bajo esta etiqueta en el servidor.'}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setActiveImage(item)}
                  className="bg-white rounded-2xl overflow-hidden border border-linen shadow-2xs hover:-translate-y-1 hover:shadow-xs transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Photo area */}
                  <div className="relative overflow-hidden aspect-4/3 bg-alabaster flex items-center justify-center">
                    <img 
                      src={item.src}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    
                    {/* Source label */}
                    <span className={`absolute top-3 left-3 text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                      item.isOfficial 
                        ? 'bg-pine text-white border border-forest' 
                        : 'bg-sage-light text-forest border border-sage-soft'
                    }`}>
                      {item.isOfficial ? 'Oficial TEBAEV' : 'Colaborador'}
                    </span>

                    {/* Quick overlay actions */}
                    <div className="absolute inset-0 bg-pine/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 bg-white rounded-full shadow-md text-pine transform scale-90 group-hover:scale-100 transition-transform duration-200">
                        <Maximize2 className="h-4.5 w-4.5" />
                      </div>
                    </div>
                  </div>

                  {/* Info description area */}
                  <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-extrabold text-pine text-sm sm:text-base leading-tight group-hover:text-sage transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-earthy line-clamp-2 leading-relaxed font-normal mt-1 opacity-90">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-linen flex items-center justify-between text-[11px] text-clay">
                      <span className="font-mono font-medium">{item.date}</span>
                      
                      <div className="flex items-center gap-2">
                        {/* Edit button for any photograph */}
                        <button
                          onClick={(e) => handleOpenEdit(item, e)}
                          className="p-1 px-1.5 bg-sage-light hover:bg-sage text-forest hover:text-white border border-sage-soft rounded-lg transition cursor-pointer"
                          title="Editar foto"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>

                        {/* Delete trigger for user photos */}
                        {!item.isOfficial && (
                          <button
                            onClick={(e) => handleDelete(item.id, e)}
                            className="p-1 px-1.5 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg border border-red-200 transition cursor-pointer"
                            title="Eliminar foto"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}

                        {/* Likes button */}
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          className="flex items-center gap-1 p-1 px-2.5 bg-sage-light text-forest hover:bg-sage border border-sage-soft rounded-lg transition group/btn font-bold cursor-pointer hover:text-white"
                          title="Me gusta"
                        >
                          <Heart className="h-3 w-3 text-red-500 fill-red-500 shrink-0" />
                          <span className="font-mono text-[10px]">{item.likes}</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Lightbox view for image enlargement */}
        {activeImage && (
          <div className="fixed inset-0 bg-pine/85 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setActiveImage(null)}>
            <div 
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden border border-linen shadow-2xl relative animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button overlay */}
              <button 
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-2xl transition cursor-pointer z-35"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Photo Area */}
              <div className="bg-[#FAF9F5] aspect-16/9 flex items-center justify-center border-b border-linen overflow-hidden">
                <img 
                  src={activeImage.src} 
                  alt={activeImage.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              {/* Details bar inside lightbox */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${
                      activeImage.isOfficial 
                        ? 'bg-pine text-white' 
                        : 'bg-sage-light text-forest border border-sage-soft'
                    }`}>
                      {activeImage.isOfficial ? 'Oficial TEBAEV Mahuixtlán' : 'Colaboración de Galería'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-pine leading-tight">{activeImage.title}</h3>
                  </div>

                  <button
                    onClick={(e) => handleLike(activeImage.id, e)}
                    className="flex items-center gap-1.5 p-2 px-4 bg-sage-light text-forest hover:bg-sage hover:text-white border border-sage-soft rounded-xl transition duration-150 font-bold font-mono text-xs cursor-pointer inline-flex self-start"
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-red-500 shrink-0" />
                    <span>{activeImage.likes} Likes</span>
                  </button>
                </div>

                <p className="text-sm text-earthy leading-relaxed font-normal">
                  {activeImage.description}
                </p>

                <div className="pt-4 border-t border-linen flex items-center justify-between text-xs text-clay">
                  <span className="font-medium font-mono">Compartido el: {activeImage.date}</span>
                  
                  {activeImage.category === 'agriculture' && (
                    <span className="flex items-center gap-1 font-bold text-[#455D45]">
                      <Sprout className="h-4 w-4 text-sage" /> Agricultura Local
                    </span>
                  )}
                  {activeImage.category === 'community' && (
                    <span className="flex items-center gap-1 font-bold text-[#455D45]">
                      <Landmark className="h-4 w-4 text-sage" /> Tradición & Cultura
                    </span>
                  )}
                  {activeImage.category === 'academic' && (
                    <span className="flex items-center gap-1 font-bold text-[#455D45]">
                      <GraduationCap className="h-4 w-4 text-sage" /> Excelencia Académica
                    </span>
                  )}
                  {activeImage.category === 'user' && (
                    <span className="flex items-center gap-1 font-bold text-[#455D45]">
                      <Camera className="h-4 w-4 text-sage" /> Archivo de Visitantes
                    </span>
                  )}
                </div>

                {/* Direct Action buttons footer of Lightbox */}
                <div className="pt-2 flex justify-end gap-2 text-xs">
                  <button
                    onClick={(e) => handleOpenEdit(activeImage, e)}
                    className="px-4 py-2 bg-sage-light hover:bg-sage hover:text-white text-forest border border-sage-soft rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Pencil className="h-4 w-4" /> Editar Información
                  </button>

                  {!activeImage.isOfficial && (
                    <button
                      onClick={(e) => {
                        handleDelete(activeImage.id, e);
                        setActiveImage(null);
                      }}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-800 rounded-xl font-bold border border-red-200 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 className="h-4 w-4" /> Eliminar de la Galería
                    </button>
                  )}
                  <button
                    onClick={() => setActiveImage(null)}
                    className="px-5 py-2 bg-sage hover:bg-forest text-white rounded-xl font-bold transition cursor-pointer"
                  >
                    Cerrar Vista
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Modal for Editing Image Metadata */}
        {editingImage && (
          <div className="fixed inset-0 bg-pine/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setEditingImage(null)}>
            <div 
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-linen shadow-2xl relative animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setEditingImage(null)}
                className="absolute top-4 right-4 p-1.5 text-earthy hover:text-pine hover:bg-alabaster rounded-xl transition cursor-pointer z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="space-y-1">
                <span className="text-[10px] text-sage font-extrabold font-mono uppercase tracking-widest flex items-center gap-1.5">
                  <Pencil className="h-3.5 w-3.5" /> Edición del Elemento
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-pine leading-tight">
                  Editar Datos de la Imagen
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveEdit} className="space-y-4">
                
                {/* Image Preview and swap option */}
                <div className="flex items-center gap-4 bg-alabaster/50 p-3 rounded-2xl border border-linen">
                  <div className="w-20 h-16 bg-white rounded-xl border border-linen overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <img 
                      src={editSrc} 
                      alt="Previsualización" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] text-clay block font-bold uppercase tracking-wider">Reemplazar Archivo (Opcional)</span>
                    <label className="text-xs text-sage font-extrabold hover:text-forest transition cursor-pointer inline-flex items-center gap-1">
                      <Upload className="h-3.5 w-3.5 text-sage" /> Seleccionar nueva foto
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleEditFileChange}
                        className="hidden" 
                      />
                    </label>
                    <p className="text-[9px] text-earthy truncate">Cambia la imagen sin afectar los likes.</p>
                  </div>
                </div>

                {/* Title input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block">Título de la Foto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Escribe un título claro..."
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine font-medium"
                  />
                </div>

                {/* Category input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block">Categoría de Visualización</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine font-medium"
                  >
                    <option value="academic">Académicas (Módulos, Aulas)</option>
                    <option value="community">Cultura y Comunidad (Festividades, Tequio)</option>
                    <option value="agriculture">Cafetales/Caña de Azúcar (Entorno Rural)</option>
                    <option value="user">Mis Fotos (Aportaciones del Usuario)</option>
                  </select>
                </div>

                {/* Picture source input option */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block">Ubicación de la Foto (Dirección URL o Base64)</label>
                  <input
                    type="text"
                    placeholder="https://ejemplo.com/ruta-imagen.jpg"
                    value={editSrc}
                    onChange={(e) => setEditSrc(e.target.value)}
                    className="w-full text-[10px] font-mono px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine"
                  />
                </div>

                {/* Description textarea */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-pine block">Descripción / Pie de Foto *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Agrega un relato u opinión explicativa..."
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-linen rounded-xl focus:outline-none focus:border-sage bg-alabaster/40 text-pine font-normal leading-relaxed"
                  ></textarea>
                </div>

                {/* Buttons footer */}
                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingImage(null)}
                    className="flex-1 py-2.5 border border-linen hover:bg-alabaster text-pine font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer font-sans"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-sage hover:bg-forest text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-2xs font-sans"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
