import EquationBuilder from './equation-builder';
import EquationBalancer from './equation-balancer';
import ReactionClassifier from './reaction-classifier';

const Equations = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chemical Equations & Reactions</h2>
        <p className="text-gray-600 mb-6">
          Build chemical equations, balance them, and identify reaction types.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <EquationBuilder />
            <ReactionClassifier />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <EquationBalancer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equations;
