import { motion, AnimatePresence } from 'framer-motion';
import { usePeriodicTableStore } from '../../stores/periodic-table-store';
import type { Element } from '../../types/element';
import { useEffect } from 'react';

type ElementCardProps = {
  element: Element;
};

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'alkali-metal': { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700' },
  'alkaline-earth': { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-700' },
  'transition-metal': { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-700' },
  'post-transition': { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700' },
  'metalloid': { bg: 'bg-teal-50', border: 'border-teal-500', text: 'text-teal-700' },
  'nonmetal': { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700' },
  'halogen': { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-700' },
  'noble-gas': { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700' },
  'lanthanide': { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-700' },
  'actinide': { bg: 'bg-[#C64484]/10', border: 'border-[#C64484]', text: 'text-[#C64484]' },
  'unknown-properties': { bg: 'bg-gray-50', border: 'border-gray-500', text: 'text-gray-700' },
};

const ElementCard = ({ element }: ElementCardProps) => {
  const { dispatch } = usePeriodicTableStore();
  const colors = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['nonmetal'];

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch({ type: 'SELECT_ELEMENT', payload: null });
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => dispatch({ type: 'SELECT_ELEMENT', payload: null })}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-l-4 ${colors.border} ${colors.bg}`}
        >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 flex gap-4">
          <div>
            <h3 className="text-3xl font-bold text-gray-800">{element.name}</h3>
            <p className="text-2xl text-gray-600 mt-1">{element.symbol}</p>
          </div>
          {/* Alternative Names - moved to the right */}
          {element.alternativeNames && Object.keys(element.alternativeNames).length > 0 && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex-shrink-0">
              <p className="text-sm font-semibold text-gray-700 mb-2">Alternative Names:</p>
              <div className="space-y-1.5">
                {Object.entries(element.alternativeNames).map(([lang, name]) => (
                  <p key={lang} className="text-base text-gray-800">
                    <span className="font-semibold capitalize mr-2">
                      {lang === 'af' ? 'Afrikaans' : lang === 'latin' ? 'Latin' : lang}:
                    </span>
                    <span className="italic">{name}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => dispatch({ type: 'SELECT_ELEMENT', payload: null })}
          className={`${colors.text} hover:opacity-70 text-3xl font-bold leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-50 transition-colors flex-shrink-0 ml-4`}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Basic Information */}
        <div className="space-y-3">
          <div>
            <span className="text-sm font-semibold text-gray-500">Atomic Number</span>
            <p className="text-lg font-medium text-gray-800">{element.atomicNumber}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-500">Atomic Mass</span>
            <p className="text-lg font-medium text-gray-800">{element.atomicMass} u</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-500">Group</span>
            <p className="text-lg font-medium text-gray-800">{element.group ?? 'N/A'}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-500">Period</span>
            <p className="text-lg font-medium text-gray-800">{element.period}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-500">Category</span>
            <p className="text-lg font-medium text-gray-800 capitalize">
              {element.category.replace('-', ' ')}
            </p>
          </div>
        </div>

        {/* Electron Configuration */}
        <div className="space-y-3">
          <div>
            <span className="text-sm font-semibold text-gray-500">Electron Configuration</span>
            <p className="text-lg font-mono text-gray-800 break-all">{element.electronConfig}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-500">Valence Electrons</span>
            <p className="text-lg font-medium text-gray-800">{element.valenceElectrons}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-500">Oxidation States</span>
            <p className="text-lg font-medium text-gray-800">
              {element.oxidationStates.map((os) => (os > 0 ? `+${os}` : `${os}`)).join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div>
          <span className="text-sm font-semibold text-gray-500">Electronegativity</span>
          <p className="text-lg font-medium text-gray-800">
            {element.electronegativity?.toFixed(2) ?? 'N/A'}
          </p>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-500">Ionization Energy</span>
          <p className="text-lg font-medium text-gray-800">
            {element.ionizationEnergy ? `${element.ionizationEnergy} kJ/mol` : 'N/A'}
          </p>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-500">Electron Affinity</span>
          <p className="text-lg font-medium text-gray-800">
            {element.electronAffinity !== null ? `${element.electronAffinity} kJ/mol` : 'N/A'}
          </p>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-500">Atomic Radius</span>
          <p className="text-lg font-medium text-gray-800">
            {element.atomicRadius ? `${element.atomicRadius} pm` : 'N/A'}
          </p>
        </div>
      </div>

      {/* Uses */}
      {element.uses && element.uses.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <span className="text-sm font-semibold text-gray-500 block mb-2">Common Uses</span>
          <ul className="list-disc list-inside space-y-1">
            {element.uses.map((use, index) => (
              <li key={index} className="text-gray-700">
                {use}
              </li>
            ))}
          </ul>
        </div>
      )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ElementCard;
