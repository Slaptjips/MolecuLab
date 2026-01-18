import { useThermochemistryStore } from '../../stores/thermochemistry-store';
import { SPECIFIC_HEATS } from '../../data/specific-heats';

const SpecificHeatCalc = () => {
  const { specificHeatValues, substance, result, dispatch } = useThermochemistryStore();

  const handleCalculate = () => {
    dispatch({ type: 'CALCULATE_SPECIFIC_HEAT' });
  };

  const knownCount = [
    specificHeatValues.mass,
    specificHeatValues.specificHeat,
    specificHeatValues.temperatureChange,
    specificHeatValues.heat,
  ].filter((v) => v !== undefined).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Specific Heat Calculator</h3>
      <p className="text-sm text-gray-600 mb-4">
        Calculate heat energy using q = mcΔT. Enter three values to calculate the fourth.
      </p>

      {/* Substance Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Substance (auto-fills specific heat)
        </label>
        <select
          value={substance}
          onChange={(e) => dispatch({ type: 'SET_SUBSTANCE', payload: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a substance...</option>
          {SPECIFIC_HEATS.map((sh) => (
            <option key={sh.substance} value={sh.substance}>
              {sh.substance} ({sh.specificHeat} J/(g·°C))
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mass (g)</label>
          <input
            type="number"
            step="0.01"
            value={specificHeatValues.mass ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_SPECIFIC_HEAT_MASS', payload: value });
              }
            }}
            placeholder="Enter mass"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specific Heat (J/(g·°C))
          </label>
          <input
            type="number"
            step="0.001"
            value={specificHeatValues.specificHeat ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_SPECIFIC_HEAT_C', payload: value });
              }
            }}
            placeholder="Enter specific heat"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature Change (ΔT in °C)
          </label>
          <input
            type="number"
            step="0.01"
            value={specificHeatValues.temperatureChange ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_SPECIFIC_HEAT_DELTA_T', payload: value });
              }
            }}
            placeholder="Enter temperature change"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Heat Energy (J)</label>
          <input
            type="number"
            step="0.01"
            value={specificHeatValues.heat ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_SPECIFIC_HEAT_HEAT', payload: value });
              }
            }}
            placeholder="Enter heat energy"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={knownCount < 3}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium mb-4"
      >
        Calculate
      </button>

      {result?.success && (
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Solution</h4>
          <div className="space-y-1 text-sm text-blue-700 font-mono">
            {result.data.steps.map((step, index) => (
              <div key={index}>{step}</div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <div className="text-lg font-bold text-blue-800">
              Heat: {result.data.heat.toFixed(2)} J
            </div>
          </div>
        </div>
      )}

      {result && !result.success && (
        <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
          <p className="text-red-800 font-medium">Error: {result.error}</p>
        </div>
      )}
    </div>
  );
};

export default SpecificHeatCalc;
