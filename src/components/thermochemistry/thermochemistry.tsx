import { useThermochemistryStore } from '../../stores/thermochemistry-store';
import SpecificHeatCalc from './specific-heat-calc';
import EnergyDiagram from './energy-diagram';

const Thermochemistry = () => {
  const { calculationType, dispatch } = useThermochemistryStore();

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Thermochemistry</h2>
        <p className="text-gray-600 mb-6">
          Calculate heat energy, explore energy diagrams, and understand exothermic vs endothermic reactions.
        </p>

        {/* Calculation Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'specific-heat', label: 'Specific Heat (q = mcΔT)' },
              { id: 'energy-diagram', label: 'Energy Diagrams' },
              { id: 'bond-energy', label: 'Bond Energy (Coming Soon)' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() =>
                  dispatch({
                    type: 'SET_CALCULATION_TYPE',
                    payload: type.id as typeof calculationType,
                  })
                }
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  calculationType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {calculationType === 'specific-heat' && <SpecificHeatCalc />}
          {calculationType === 'energy-diagram' && (
            <div className="space-y-6">
              <EnergyDiagram reactionType="exothermic" activationEnergy={50} enthalpyChange={-30} />
              <EnergyDiagram reactionType="endothermic" activationEnergy={60} enthalpyChange={40} />
            </div>
          )}
          {calculationType === 'bond-energy' && (
            <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
              <p className="text-yellow-800">
                Bond energy calculator coming soon. Use specific heat calculator for now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thermochemistry;
