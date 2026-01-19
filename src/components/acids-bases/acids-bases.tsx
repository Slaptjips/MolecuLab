import PHScale from './ph-scale';
import PHCalculator from './ph-calculator';
import TitrationCurve from './titration-curve';

const AcidsBases = () => {
  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Acids & Bases</h2>
        <p className="text-gray-600 mb-6">
          Calculate pH, explore the pH scale, and visualize titration curves.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <PHScale />
            <PHCalculator />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TitrationCurve />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcidsBases;
