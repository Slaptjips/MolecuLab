import { useGasLawsStore } from '../../stores/gas-laws-store';

const IdealGasLaw = () => {
  const { idealGasValues, idealGasResult, dispatch } = useGasLawsStore();

  const handleCalculate = () => {
    dispatch({ type: 'CALCULATE_IDEAL_GAS' });
  };

  const knownCount = [
    idealGasValues.pressure,
    idealGasValues.volume,
    idealGasValues.moles,
    idealGasValues.temperature,
  ].filter((v) => v !== undefined).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ideal Gas Law (PV = nRT)</h3>
      <p className="text-sm text-gray-600 mb-4">
        Enter three variables to calculate the fourth. R = 0.0821 L·atm/(mol·K)
      </p>

      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pressure (atm)</label>
          <input
            type="number"
            step="0.01"
            value={idealGasValues.pressure ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_IDEAL_PRESSURE', payload: value });
              }
            }}
            placeholder="Enter pressure"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Volume (L)</label>
          <input
            type="number"
            step="0.01"
            value={idealGasValues.volume ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_IDEAL_VOLUME', payload: value });
              }
            }}
            placeholder="Enter volume"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Moles (mol)</label>
          <input
            type="number"
            step="0.01"
            value={idealGasValues.moles ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_IDEAL_MOLES', payload: value });
              }
            }}
            placeholder="Enter moles"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature (K)
          </label>
          <input
            type="number"
            step="0.01"
            value={idealGasValues.temperature ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_IDEAL_TEMPERATURE', payload: value });
              }
            }}
            placeholder="Enter temperature in Kelvin"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
          />
          <p className="text-xs text-gray-500">
            Note: Temperature must be in Kelvin. Convert from Celsius: K = °C + 273.15
          </p>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={knownCount < 3}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium mb-4"
      >
        Calculate
      </button>

      {idealGasResult?.success && (
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Solution</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-blue-700 font-medium">Pressure:</span>{' '}
              <span className="font-bold text-blue-800">
                {idealGasResult.data.pressure.toFixed(2)} atm
              </span>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Volume:</span>{' '}
              <span className="font-bold text-blue-800">
                {idealGasResult.data.volume.toFixed(2)} L
              </span>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Moles:</span>{' '}
              <span className="font-bold text-blue-800">
                {idealGasResult.data.moles.toFixed(4)} mol
              </span>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Temperature:</span>{' '}
              <span className="font-bold text-blue-800">
                {idealGasResult.data.temperature.toFixed(2)} K
              </span>
            </div>
          </div>
        </div>
      )}

      {idealGasResult && !idealGasResult.success && (
        <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
          <p className="text-red-800 font-medium">Error: {idealGasResult.error}</p>
        </div>
      )}
    </div>
  );
};

export default IdealGasLaw;
