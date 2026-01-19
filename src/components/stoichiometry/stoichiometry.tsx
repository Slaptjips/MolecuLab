import { useStoichiometryStore } from '../../stores/stoichiometry-store';
import MoleCalculator from './mole-calculator';
import StoichiometryCalc from './stoichiometry-calc';

const Stoichiometry = () => {
  const { calculationType, dispatch } = useStoichiometryStore();

  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Stoichiometry Calculator</h2>
        <p className="text-gray-600 mb-6">
          Perform mole calculations, stoichiometric conversions, and limiting reactant analysis.
        </p>

        {/* Calculation Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'mole', label: 'Mole Calculations (n = m/M)' },
              { id: 'mole-to-mole', label: 'Mole-to-Mole Stoichiometry' },
              { id: 'mass-to-mass', label: 'Mass-to-Mass (Coming Soon)' },
              { id: 'limiting-reactant', label: 'Limiting Reactant (Coming Soon)' },
              { id: 'avogadro', label: 'Avogadro Conversions (Included in Mole Calc)' },
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
        <div>
          {calculationType === 'mole' && <MoleCalculator />}
          {calculationType === 'mole-to-mole' && <StoichiometryCalc />}
          {(calculationType === 'mass-to-mass' ||
            calculationType === 'limiting-reactant') && (
            <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
              <p className="text-yellow-800">
                This calculator is coming soon. Use the Mole Calculator and Mole-to-Mole
                Stoichiometry for now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stoichiometry;
