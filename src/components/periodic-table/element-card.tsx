import { motion } from 'framer-motion';
import { usePeriodicTableStore } from '../../stores/periodic-table-store';
import type { Element } from '../../types/element';

type ElementCardProps = {
  element: Element;
};

const ElementCard = ({ element }: ElementCardProps) => {
  const { dispatch } = usePeriodicTableStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-3xl font-bold text-gray-800">{element.name}</h3>
          <p className="text-2xl text-gray-600 mt-1">{element.symbol}</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SELECT_ELEMENT', payload: null })}
          className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
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
  );
};

export default ElementCard;
