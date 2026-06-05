import React from 'react';
import { School, GraduationCap, Calendar, FileText, Phone, MapPin, Image as ImageIcon } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: School },
    { id: 'academia', label: 'Académico', icon: GraduationCap },
    { id: 'comunidad', label: 'Comunidad', icon: MapPin },
    { id: 'galeria', label: 'Galería', icon: ImageIcon },
    { id: 'portal', label: 'Portal Estudiante', icon: FileText },
    { id: 'contacto', label: 'Contacto/Ubicación', icon: Phone },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white text-earthy shadow-xs border-b border-linen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('inicio')}>
            <div className="bg-sage text-white p-2.5 rounded-xl shadow-xs border border-sage-soft">
              <School className="h-6.5 w-6.5 stroke-[2]" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight leading-tight flex items-center gap-1.5 text-pine">
                TEBAEV <span className="text-forest">Mahuixtlán</span>
              </div>
              <div className="text-[10px] text-clay font-mono tracking-widest font-semibold">
                CCT 30ETH0627X • SEV
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-sage-light text-pine border-b-2 border-sage shadow-xs scale-[1.02] font-bold'
                      : 'hover:bg-alabaster hover:text-pine text-earthy'
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile indicator of school status */}
          <div className="flex items-center md:hidden">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-sage-light border border-sage-soft text-forest">
              <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-sage animate-pulse"></span>
              CCT Activo
            </span>
          </div>
        </div>
      </div>

      {/* Mobile navigation bottom bar */}
      <div className="md:hidden bg-white py-1 border-t border-linen">
        <div className="grid grid-cols-6 text-center">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center justify-center py-2 text-[10px] font-semibold tracking-wide transition-all ${
                  isActive ? 'text-sage font-bold' : 'text-earthy'
                }`}
              >
                <IconComp className={`h-5 w-5 mb-0.5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                <span className="truncate w-full px-1">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
