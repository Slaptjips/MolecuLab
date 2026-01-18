import { useEquationsStore } from '../../stores/equations-store';

const REACTION_DESCRIPTIONS: Record<string, { name: string; pattern: string; example: string }> = {
  combination: {
    name: 'Combination (Synthesis)',
    pattern: 'A + B → AB',
    example: '2H₂ + O₂ → 2H₂O',
  },
  decomposition: {
    name: 'Decomposition',
    pattern: 'AB → A + B',
    example: '2H₂O → 2H₂ + O₂',
  },
  'single-replacement': {
    name: 'Single Replacement',
    pattern: 'A + BC → AC + B',
    example: 'Zn + 2HCl → ZnCl₂ + H₂',
  },
  'double-replacement': {
    name: 'Double Replacement',
    pattern: 'AB + CD → AD + CB',
    example: 'AgNO₃ + NaCl → AgCl + NaNO₃',
  },
  combustion: {
    name: 'Combustion',
    pattern: 'Fuel + O₂ → CO₂ + H₂O',
    example: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
  },
};

const ReactionClassifier = () => {
  const { reactants, products, reactionType, dispatch } = useEquationsStore();

  const examples = [
    { name: 'Combustion', reactants: ['CH₄', 'O₂'], products: ['CO₂', 'H₂O'] },
    { name: 'Combination', reactants: ['H₂', 'O₂'], products: ['H₂O'] },
    { name: 'Decomposition', reactants: ['H₂O'], products: ['H₂', 'O₂'] },
    { name: 'Single Replacement', reactants: ['Zn', 'HCl'], products: ['ZnCl₂', 'H₂'] },
    { name: 'Double Replacement', reactants: ['AgNO₃', 'NaCl'], products: ['AgCl', 'NaNO₃'] },
  ];

  if (reactants.length === 0 && products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reaction Type</h3>
        <p className="text-gray-500 mb-4">Enter an equation and click "Classify Reaction"</p>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-3">Example Reactions</h4>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  dispatch({
                    type: 'LOAD_EXAMPLE',
                    payload: { reactants: example.reactants, products: example.products },
                  });
                  dispatch({ type: 'CLASSIFY_REACTION' });
                }}
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
              >
                <div className="font-medium text-gray-800">{example.name}</div>
                <div className="text-sm text-gray-600">
                  {example.reactants.join(' + ')} → {example.products.join(' + ')}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Reaction Type</h3>

      {reactionType ? (
        <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
          <div className="text-2xl font-bold text-purple-800 mb-2">
            {REACTION_DESCRIPTIONS[reactionType]?.name || reactionType}
          </div>
          <div className="text-purple-700 mb-2">
            Pattern: {REACTION_DESCRIPTIONS[reactionType]?.pattern}
          </div>
          <div className="text-sm text-purple-600">
            Example: {REACTION_DESCRIPTIONS[reactionType]?.example}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">Click "Classify Reaction" to identify the reaction type</p>
        </div>
      )}
    </div>
  );
};

export default ReactionClassifier;
