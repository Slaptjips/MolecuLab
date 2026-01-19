import { useGasLawsStore } from '../../stores/gas-laws-store';
import { Line } from 'react-chartjs-2';
import { kelvinToCelsius } from '../../utils/units';

const CharlesLaw = () => {
  const { charlesValues, dispatch, calculateCharlesLaw } = useGasLawsStore();
  const result = calculateCharlesLaw();

  // Generate data for graph (V vs T)
  const temperatures = Array.from({ length: 20 }, (_, i) => 200 + i * 20);
  const volumes = charlesValues.volume1 && charlesValues.temperature1
    ? temperatures.map((t) => (charlesValues.volume1! * t) / charlesValues.temperature1!)
    : temperatures.map(() => 1);

  const chartData = {
    labels: temperatures.map((t) => t.toFixed(0)),
    datasets: [
      {
        label: 'Volume (L)',
        data: volumes,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Charles's Law: V ∝ T",
        font: { size: 16, weight: 'bold' as const },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Temperature (K)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Volume (L)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Charles's Law (V₁/T₁ = V₂/T₂)</h3>
      <p className="text-sm text-gray-600 mb-4">
        At constant pressure, volume and temperature are directly proportional. Temperature must be in Kelvin!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">V₁ (L)</label>
          <input
            type="number"
            step="0.01"
            value={charlesValues.volume1 ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_CHARLES_V1', payload: value });
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">T₁ (K)</label>
          <input
            type="number"
            step="0.01"
            value={charlesValues.temperature1 ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_CHARLES_T1', payload: value });
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {charlesValues.temperature1 && (
            <p className="text-xs text-gray-500 mt-1">
              {kelvinToCelsius(charlesValues.temperature1).toFixed(2)} °C
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">V₂ (L)</label>
          <input
            type="number"
            step="0.01"
            value={charlesValues.volume2 ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_CHARLES_V2', payload: value });
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">T₂ (K)</label>
          <input
            type="number"
            step="0.01"
            value={charlesValues.temperature2 ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_CHARLES_T2', payload: value });
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {charlesValues.temperature2 && (
            <p className="text-xs text-gray-500 mt-1">
              {kelvinToCelsius(charlesValues.temperature2).toFixed(2)} °C
            </p>
          )}
        </div>
      </div>

      {result && (
        <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200 mb-4">
          <h4 className="font-semibold text-green-800 mb-2">Solution</h4>
          <div className="space-y-1 text-sm text-green-700 font-mono">
            {result.steps.map((step, index) => (
              <div key={index}>{step}</div>
            ))}
          </div>
          {result.volume2 !== undefined && (
            <div className="mt-2 text-lg font-bold text-green-800">
              V₂ = {result.volume2.toFixed(2)} L
            </div>
          )}
          {result.temperature2 !== undefined && (
            <div className="mt-2 text-lg font-bold text-green-800">
              T₂ = {result.temperature2.toFixed(2)} K (
              {kelvinToCelsius(result.temperature2).toFixed(2)} °C)
            </div>
          )}
        </div>
      )}

      {/* Graph */}
      {charlesValues.volume1 && charlesValues.temperature1 && (
        <div className="h-64 mt-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default CharlesLaw;
