import { useState } from 'react';
import { useStoichiometryStore } from '../../stores/stoichiometry-store';
import { calculateMolarMass } from '../../utils/chemical-formulas';

const MoleCalculator = () => {
  const { moleValues, dispatch, calculateMole } = useStoichiometryStore();
  const [formula, setFormula] = useState('');
  const [autoMolarMass, setAutoMolarMass] = useState<number | null>(null);

  const result = calculateMole();

  const handleFormulaChange = (value: string) => {
    setFormula(value);
    const molarMassResult = calculateMolarMass(value);
    if (molarMassResult.success) {
      setAutoMolarMass(molarMassResult.data.molarMass);
      dispatch({ type: 'SET_MOLE_MOLAR_MASS', payload: molarMassResult.data.molarMass });
    } else {
      setAutoMolarMass(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Mole Calculations</h3>
      <p className="text-sm text-gray-600 mb-4">Calculate moles, mass, or molar mass using n = m/M</p>

      {/* Formula Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chemical Formula (auto-calculates molar mass)
        </label>
        <input
          type="text"
          value={formula}
          onChange={(e) => handleFormulaChange(e.target.value)}
          placeholder="e.g., H₂O"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {autoMolarMass !== null && (
          <p className="text-sm text-green-600 mt-1">
            Molar Mass: {autoMolarMass.toFixed(2)} g/mol
          </p>
        )}
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mass (g)</label>
          <input
            type="number"
            value={moleValues.mass ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_MOLE_MASS', payload: value });
              }
            }}
            placeholder="Enter mass"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Molar Mass (g/mol)</label>
          <input
            type="number"
            value={moleValues.molarMass ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_MOLE_MOLAR_MASS', payload: value });
              }
            }}
            placeholder="Enter molar mass"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Moles (mol)</label>
          <input
            type="number"
            value={moleValues.moles ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_MOLE_MOLES', payload: value });
              }
            }}
            placeholder="Enter moles"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Particles</label>
          <input
            type="number"
            value={moleValues.particles ? moleValues.particles.toExponential() : ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_MOLE_PARTICLES', payload: value });
              }
            }}
            placeholder="Enter number of particles"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Use scientific notation (e.g., 6.022e23)</p>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Solution</h4>
          <div className="space-y-1">
            {result.steps.map((step, index) => (
              <div key={index} className="text-sm text-blue-700 font-mono">
                {step}
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200">
            {result.mass !== undefined && (
              <div className="text-lg font-bold text-blue-800">Mass: {result.mass.toFixed(2)} g</div>
            )}
            {result.moles !== undefined && (
              <div className="text-lg font-bold text-blue-800">Moles: {result.moles.toFixed(4)} mol</div>
            )}
            {result.molarMass !== undefined && (
              <div className="text-lg font-bold text-blue-800">
                Molar Mass: {result.molarMass.toFixed(2)} g/mol
              </div>
            )}
            {result.particles !== undefined && (
              <div className="text-lg font-bold text-blue-800">
                Particles: {result.particles.toExponential(2)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoleCalculator;
