import { useGasLawsStore } from '../../stores/gas-laws-store';
import { Line } from 'react-chartjs-2';

const BoylesLaw = () => {
  const { boylesValues, dispatch, calculateBoylesLaw } = useGasLawsStore();
  const result = calculateBoylesLaw();

  // Generate data for graph (P vs V)
  const volumes = Array.from({ length: 20 }, (_, i) => (i + 1) * 0.5);
  const pressures = boylesValues.pressure1 && boylesValues.volume1
    ? volumes.map((v) => (boylesValues.pressure1! * boylesValues.volume1!) / v)
    : volumes.map(() => 1);

  const chartData = {
    labels: volumes.map((v) => v.toFixed(1)),
    datasets: [
      {
        label: 'Pressure (atm)',
        data: pressures,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
        text: "Boyle's Law: P ∝ 1/V",
        font: { size: 16, weight: 'bold' as const },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Volume (L)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Pressure (atm)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Boyle's Law (P₁V₁ = P₂V₂)</h3>
      <p className="text-sm text-gray-600 mb-4">
        At constant temperature, pressure and volume are inversely proportional
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">P₁ (atm)</label>
          <input
            type="number"
            step="0.01"
            value={boylesValues.pressure1 ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_BOYLES_P1', payload: value });
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">V₁ (L)</label>
          <input
            type="number"
            step="0.01"
            value={boylesValues.volume1 ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_BOYLES_V1', payload: value });
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">P₂ (atm)</label>
          <input
            type="number"
            step="0.01"
            value={boylesValues.pressure2 ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_BOYLES_P2', payload: value });
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">V₂ (L)</label>
          <input
            type="number"
            step="0.01"
            value={boylesValues.volume2 ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
              if (value !== undefined) {
                dispatch({ type: 'SET_BOYLES_V2', payload: value });
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
          {result.pressure2 !== undefined && (
            <div className="mt-2 text-lg font-bold text-green-800">
              P₂ = {result.pressure2.toFixed(2)} atm
            </div>
          )}
        </div>
      )}

      {/* Graph */}
      {boylesValues.pressure1 && boylesValues.volume1 && (
        <div className="h-64 mt-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default BoylesLaw;
