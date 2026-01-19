import FunctionalGroups from './functional-groups';

const Organic = () => {
  return (
    <div className="p-4 md:p-8 space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Organic Chemistry</h2>
        <p className="text-gray-600 mb-6">
          Explore functional groups and biological macromolecules.
        </p>

        <FunctionalGroups />

        <div className="mt-6 p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Additional Features Coming Soon
          </h3>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            <li>Biological Macromolecules (Carbohydrates, Proteins, Lipids, Nucleic Acids)</li>
            <li>Isomer Explorer</li>
            <li>IUPAC Naming Tool</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Organic;
