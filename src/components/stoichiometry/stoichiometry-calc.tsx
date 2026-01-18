import { useState } from 'react';
import { useStoichiometryStore } from '../../stores/stoichiometry-store';

const StoichiometryCalc = () => {
  const { stoichiometryValues, dispatch, calculateStoichiometry } = useStoichiometryStore();
  const [startingFormula, setStartingFormula] = useState('');
  const [targetFormula, setTargetFormula] = useState('');

  const result = calculateStoichiometry();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Mole-to-Mole Stoichiometry</h3>
      <p className="text-sm text-gray-600 mb-4">
        Calculate moles of products/reactants using balanced equation coefficients
      </p>

      {/* Equation Setup */}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Starting Substance</label>
          <input
            type="text"
            value={startingFormula}
            onChange={(e) => setStartingFormula(e.target.value)}
            placeholder="e.g., H₂O"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Starting Coefficient</label>
          <input
            type="number"
            value={stoichiometryValues.startingCoefficient ?? ''}
            onChange={(e) => {
              const starting = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
              const target = stoichiometryValues.targetCoefficient;
              if (starting !== undefined && target !== undefined) {
                dispatch({
                  type: 'SET_STOICHIOMETRY_COEFFICIENTS',
                  payload: { starting, target },
                });
              } else if (starting !== undefined) {
                dispatch({
                  type: 'SET_STOICHIOMETRY_COEFFICIENTS',
                  payload: { starting, target: 1 },
                });
              }
            }}
            placeholder="Coefficient in balanced equation"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Substance</label>
          <input
            type="text"
            value={targetFormula}
            onChange={(e) => setTargetFormula(e.target.value)}
            placeholder="e.g., O₂"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Coefficient</label>
          <input
            type="number"
            value={stoichiometryValues.targetCoefficient ?? ''}
            onChange={(e) => {
              const target = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
              const starting = stoichiometryValues.startingCoefficient;
              if (target !== undefined && starting !== undefined) {
                dispatch({
                  type: 'SET_STOICHIOMETRY_COEFFICIENTS',
                  payload: { starting, target },
                });
              } else if (target !== undefined) {
                dispatch({
                  type: 'SET_STOICHIOMETRY_COEFFICIENTS',
                  payload: { starting: 1, target },
                });
              }
            }}
            placeholder="Coefficient in balanced equation"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Starting Moles (mol)
          </label>
          <input
            type="number"
            value={stoichiometryValues.startingMoles ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_STOICHIOMETRY_MOLES', payload: value });
              }
            }}
            placeholder="Enter starting moles"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">Solution</h4>
          <div className="text-sm text-green-700 space-y-1">
            <div className="font-mono">
              Moles of {targetFormula} = (Moles of {startingFormula} / {stoichiometryValues.startingCoefficient}) ×{' '}
              {stoichiometryValues.targetCoefficient}
            </div>
            <div className="font-mono">
              Moles of {targetFormula} = ({stoichiometryValues.startingMoles?.toFixed(4)} mol /{' '}
              {stoichiometryValues.startingCoefficient}) × {stoichiometryValues.targetCoefficient}
            </div>
            <div className="font-mono font-bold text-lg mt-2">
              Moles of {targetFormula} = {result.toFixed(4)} mol
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoichiometryCalc;
