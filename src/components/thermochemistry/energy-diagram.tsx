import { Line } from 'react-chartjs-2';

type EnergyDiagramProps = {
  reactionType: 'exothermic' | 'endothermic';
  activationEnergy?: number;
  enthalpyChange?: number;
};

const EnergyDiagram = ({ reactionType = 'exothermic', activationEnergy = 50, enthalpyChange = -30 }: EnergyDiagramProps) => {
  // Generate data points for energy diagram
  const progress = Array.from({ length: 50 }, (_, i) => i);
  const reactantsEnergy = 100;
  const productsEnergy = reactantsEnergy + enthalpyChange;
  const transitionStateEnergy = reactantsEnergy + activationEnergy;

  // Create smooth curve
  const energies = progress.map((p) => {
    const x = p / 49;
    if (x < 0.5) {
      // Rising to transition state
      return reactantsEnergy + (transitionStateEnergy - reactantsEnergy) * (x * 2);
    } else {
      // Falling to products
      const fallProgress = (x - 0.5) * 2;
      return transitionStateEnergy - (transitionStateEnergy - productsEnergy) * fallProgress;
    }
  });

  const chartData = {
    labels: progress.map(() => ''),
    datasets: [
      {
        label: 'Energy',
        data: energies,
        borderColor: reactionType === 'exothermic' ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)',
        backgroundColor: reactionType === 'exothermic' 
          ? 'rgba(239, 68, 68, 0.1)' 
          : 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.6,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${reactionType === 'exothermic' ? 'Exothermic' : 'Endothermic'} Reaction`,
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
          text: 'Reaction Progress',
        },
        ticks: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Energy (kJ/mol)',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Energy Diagram</h3>

      <div className="mb-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reaction Type</label>
          <select
            value={reactionType}
            onChange={() => {
              // This would be connected to state in full implementation
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled
          >
            <option value="exothermic">Exothermic (ΔH &lt; 0)</option>
            <option value="endothermic">Endothermic (ΔH &gt; 0)</option>
          </select>
        </div>
      </div>

      <div className="h-64 mb-4">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">Energy Analysis</h4>
        <div className="space-y-1 text-sm text-blue-700">
          <div>
            <span className="font-medium">Activation Energy:</span> {activationEnergy} kJ/mol
          </div>
          <div>
            <span className="font-medium">Enthalpy Change (ΔH):</span>{' '}
            {reactionType === 'exothermic' ? '-' : '+'}
            {Math.abs(enthalpyChange)} kJ/mol
          </div>
          {reactionType === 'exothermic' && (
            <div className="text-red-700 font-medium">Energy is released (products lower in energy)</div>
          )}
          {reactionType === 'endothermic' && (
            <div className="text-blue-700 font-medium">Energy is absorbed (products higher in energy)</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnergyDiagram;
