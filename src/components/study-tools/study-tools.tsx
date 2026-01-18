import FlashcardComponent from './flashcard';

const StudyTools = () => {
  const formulas = [
    { name: 'Mole Calculation', formula: 'n = m/M' },
    { name: 'Ideal Gas Law', formula: 'PV = nRT' },
    { name: "Boyle's Law", formula: 'P₁V₁ = P₂V₂' },
    { name: "Charles's Law", formula: 'V₁/T₁ = V₂/T₂' },
    { name: 'Specific Heat', formula: 'q = mcΔT' },
    { name: 'pH', formula: 'pH = -log[H⁺]' },
    { name: 'pOH', formula: 'pOH = -log[OH⁻]' },
    { name: 'pH + pOH', formula: 'pH + pOH = 14' },
    { name: 'Avogadro Number', formula: 'N_A = 6.022 × 10²³' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Study Tools</h2>
        <p className="text-gray-600 mb-6">
          Flashcards and formula reference sheet for chemistry study.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flashcards */}
          <FlashcardComponent />

          {/* Formula Sheet */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Formula Sheet</h3>
            <div className="space-y-3">
              {formulas.map((formula) => (
                <div
                  key={formula.name}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="font-semibold text-gray-700 mb-1">{formula.name}</div>
                  <div className="font-mono text-blue-600 text-lg">{formula.formula}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.print()}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Print Formula Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTools;
