import { useGasLawsStore } from '../../stores/gas-laws-store';
import IdealGasLaw from './ideal-gas-law';
import BoylesLaw from './boyles-law';
import CharlesLaw from './charles-law';

const GasLaws = () => {
  const { gasLawType, dispatch } = useGasLawsStore();

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Gas Laws Simulator</h2>
        <p className="text-gray-600 mb-6">
          Explore ideal gas law, Boyle's law, and Charles's law with interactive calculators and visualizations.
        </p>

        {/* Gas Law Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Gas Law</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ideal', label: 'Ideal Gas Law (PV = nRT)' },
              { id: 'boyles', label: "Boyle's Law (P₁V₁ = P₂V₂)" },
              { id: 'charles', label: "Charles's Law (V₁/T₁ = V₂/T₂)" },
              { id: 'combined', label: 'Combined Gas Law (Coming Soon)' },
            ].map((law) => (
              <button
                key={law.id}
                onClick={() =>
                  dispatch({
                    type: 'SET_GAS_LAW_TYPE',
                    payload: law.id as typeof gasLawType,
                  })
                }
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  gasLawType === law.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {law.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Calculator */}
        <div>
          {gasLawType === 'ideal' && <IdealGasLaw />}
          {gasLawType === 'boyles' && <BoylesLaw />}
          {gasLawType === 'charles' && <CharlesLaw />}
          {gasLawType === 'combined' && (
            <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
              <p className="text-yellow-800">
                Combined Gas Law calculator coming soon. Use individual gas laws for now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GasLaws;
