import { useAcidsBasesStore } from '../../stores/acids-bases-store';

const PHCalculator = () => {
  const { phValue, hConcentration, ohConcentration, pohValue, calculationResult, dispatch } =
    useAcidsBasesStore();

  const handleCalculate = () => {
    dispatch({ type: 'CALCULATE_PH' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">pH Calculator</h3>
      <p className="text-sm text-gray-600 mb-4">
        Calculate pH, pOH, [H⁺], or [OH⁻] using: pH = -log[H⁺], pOH = -log[OH⁻], pH + pOH = 14
      </p>

      {/* Input Fields */}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">pH</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="14"
            value={phValue ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? null : parseFloat(e.target.value);
              dispatch({ type: 'SET_PH', payload: value ?? 0 });
            }}
            placeholder="Enter pH (0-14)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            [H⁺] Concentration (mol/L)
          </label>
          <input
            type="number"
            step="0.0001"
            min="0"
            value={hConcentration ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? null : parseFloat(e.target.value);
              dispatch({ type: 'SET_H_CONCENTRATION', payload: value ?? 0 });
            }}
            placeholder="Enter H+ concentration"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Use scientific notation if needed (e.g., 1e-7)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">pOH</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="14"
            value={pohValue ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? null : parseFloat(e.target.value);
              dispatch({ type: 'SET_POH', payload: value ?? 0 });
            }}
            placeholder="Enter pOH (0-14)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            [OH⁻] Concentration (mol/L)
          </label>
          <input
            type="number"
            step="0.0001"
            min="0"
            value={ohConcentration ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? null : parseFloat(e.target.value);
              dispatch({ type: 'SET_OH_CONCENTRATION', payload: value ?? 0 });
            }}
            placeholder="Enter OH- concentration"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Use scientific notation if needed</p>
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium mb-4"
      >
        Calculate
      </button>

      {/* Results */}
      {calculationResult?.success && (
        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Results</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700 font-medium">pH:</span>
              <div className="text-lg font-bold text-blue-800">{calculationResult.data.pH.toFixed(2)}</div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">pOH:</span>
              <div className="text-lg font-bold text-blue-800">
                {calculationResult.data.pOH.toFixed(2)}
              </div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">[H⁺]:</span>
              <div className="text-lg font-bold text-blue-800">
                {calculationResult.data.hConcentration.toExponential(2)} mol/L
              </div>
            </div>
            <div>
              <span className="text-blue-700 font-medium">[OH⁻]:</span>
              <div className="text-lg font-bold text-blue-800">
                {calculationResult.data.ohConcentration.toExponential(2)} mol/L
              </div>
            </div>
          </div>
        </div>
      )}

      {calculationResult && !calculationResult.success && (
        <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
          <p className="text-red-800 font-medium">Error: {calculationResult.error}</p>
        </div>
      )}
    </div>
  );
};

export default PHCalculator;
