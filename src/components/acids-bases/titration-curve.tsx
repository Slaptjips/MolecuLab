import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAcidsBasesStore } from '../../stores/acids-bases-store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TitrationCurve = () => {
  const { titrationParams, dispatch } = useAcidsBasesStore();

  // Generate titration curve data
  const generateTitrationData = () => {
    const dataPoints: { volume: number; pH: number }[] = [];
    const volumes: number[] = [];
    const pHs: number[] = [];

    // Simplified titration curve calculation
    // For strong acid - strong base titration
    if (titrationParams.acidType === 'strong' && titrationParams.baseType === 'strong') {
      const equivalencePointVolume =
        ((titrationParams.acidConcentration ?? 0) * (titrationParams.acidVolume ?? 0)) /
        (titrationParams.baseConcentration ?? 1);

      for (let volume = 0; volume <= equivalencePointVolume * 2; volume += equivalencePointVolume / 20) {
        volumes.push(volume);
        let pH: number;

        if (volume < equivalencePointVolume) {
          // Before equivalence point - acidic
          const excessAcid = (titrationParams.acidConcentration ?? 0) * (titrationParams.acidVolume ?? 0) -
            (titrationParams.baseConcentration ?? 0) * volume;
          const totalVolume = (titrationParams.acidVolume ?? 0) + volume;
          const hConcentration = excessAcid / totalVolume;
          pH = -Math.log10(Math.max(hConcentration, 1e-14));
        } else if (volume > equivalencePointVolume) {
          // After equivalence point - basic
          const excessBase = (titrationParams.baseConcentration ?? 0) * volume -
            (titrationParams.acidConcentration ?? 0) * (titrationParams.acidVolume ?? 0);
          const totalVolume = (titrationParams.acidVolume ?? 0) + volume;
          const ohConcentration = excessBase / totalVolume;
          const pOH = -Math.log10(Math.max(ohConcentration, 1e-14));
          pH = 14 - pOH;
        } else {
          // At equivalence point - neutral (pH = 7 for strong-strong)
          pH = 7;
        }

        pHs.push(pH);
        dataPoints.push({ volume, pH });
      }
    } else {
      // For weak acid/base, generate simplified curve
      for (let i = 0; i <= 50; i++) {
        const volume = i;
        volumes.push(volume);
        pHs.push(4 + (i / 50) * 10); // Simplified curve
      }
    }

    return { volumes, pHs };
  };

  const { volumes, pHs } = generateTitrationData();

  const chartData = {
    labels: volumes.map((v) => v.toFixed(1)),
    datasets: [
      {
        label: 'pH',
        data: pHs,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
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
        text: 'Titration Curve',
        font: { size: 16, weight: 'bold' as const },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Volume of Base Added (mL)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'pH',
        },
        min: 0,
        max: 14,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Titration Curve Simulator</h3>

      {/* Input Parameters */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Acid Type</label>
          <select
            value={titrationParams.acidType ?? ''}
            onChange={(e) =>
              dispatch({
                type: 'SET_TITRATION_ACID_TYPE',
                payload: (e.target.value || null) as 'strong' | 'weak' | null,
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="strong">Strong Acid</option>
            <option value="weak">Weak Acid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Base Type</label>
          <select
            value={titrationParams.baseType ?? ''}
            onChange={(e) =>
              dispatch({
                type: 'SET_TITRATION_BASE_TYPE',
                payload: (e.target.value || null) as 'strong' | 'weak' | null,
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="strong">Strong Base</option>
            <option value="weak">Weak Base</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Acid Concentration (M)
          </label>
          <input
            type="number"
            step="0.01"
            value={titrationParams.acidConcentration ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? null : parseFloat(e.target.value);
              dispatch({ type: 'SET_TITRATION_ACID_CONCENTRATION', payload: value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Concentration (M)
          </label>
          <input
            type="number"
            step="0.01"
            value={titrationParams.baseConcentration ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? null : parseFloat(e.target.value);
              dispatch({ type: 'SET_TITRATION_BASE_CONCENTRATION', payload: value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Acid Volume (mL)</label>
          <input
            type="number"
            step="0.1"
            value={titrationParams.acidVolume ?? ''}
            onChange={(e) => {
              const value = e.target.value === '' ? null : parseFloat(e.target.value);
              dispatch({ type: 'SET_TITRATION_ACID_VOLUME', payload: value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Chart */}
      <div className="h-96">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TitrationCurve;
