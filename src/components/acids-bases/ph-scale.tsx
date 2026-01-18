const PH_SCALE = Array.from({ length: 15 }, (_, i) => i);
const PH_COLORS: Record<number, string> = {
  0: 'bg-red-600',
  1: 'bg-red-500',
  2: 'bg-red-400',
  3: 'bg-orange-500',
  4: 'bg-orange-400',
  5: 'bg-yellow-400',
  6: 'bg-yellow-300',
  7: 'bg-green-400',
  8: 'bg-green-500',
  9: 'bg-blue-400',
  10: 'bg-blue-500',
  11: 'bg-indigo-500',
  12: 'bg-indigo-600',
  13: 'bg-purple-600',
  14: 'bg-purple-700',
};

const PH_EXAMPLES: Record<number, string> = {
  0: 'Battery acid',
  1: 'Stomach acid',
  2: 'Lemon juice',
  3: 'Vinegar',
  4: 'Tomato juice',
  5: 'Black coffee',
  6: 'Urine',
  7: 'Pure water',
  8: 'Seawater',
  9: 'Baking soda',
  10: 'Milk of magnesia',
  11: 'Ammonia',
  12: 'Soapy water',
  13: 'Bleach',
  14: 'Sodium hydroxide',
};

const PHScale = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">pH Scale</h3>
      <p className="text-sm text-gray-600 mb-4">Interactive pH scale from 0-14</p>

      <div className="space-y-4">
        {/* pH Scale Bar */}
        <div className="relative h-12 rounded-lg overflow-hidden border-2 border-gray-300">
          {PH_SCALE.map((ph) => (
            <div
              key={ph}
              className={`absolute h-full ${PH_COLORS[ph] || 'bg-gray-300'}`}
              style={{
                left: `${(ph / 14) * 100}%`,
                width: `${(1 / 14) * 100}%`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white drop-shadow-md">{ph}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Labels */}
        <div className="flex justify-between text-xs text-gray-600">
          <span className="font-medium">Acidic (0-7)</span>
          <span className="font-medium">Neutral (7)</span>
          <span className="font-medium">Basic (7-14)</span>
        </div>

        {/* Examples */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Acidic Examples</h4>
            <div className="space-y-1 text-sm">
              {Object.entries(PH_EXAMPLES)
                .filter(([ph]) => parseInt(ph) < 7)
                .map(([ph, example]) => (
                  <div key={ph} className="text-gray-600">
                    <span className="font-mono font-bold">pH {ph}:</span> {example}
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Neutral</h4>
            <div className="text-sm text-gray-600">
              <span className="font-mono font-bold">pH 7:</span> {PH_EXAMPLES[7]}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Basic Examples</h4>
            <div className="space-y-1 text-sm">
              {Object.entries(PH_EXAMPLES)
                .filter(([ph]) => parseInt(ph) > 7)
                .map(([ph, example]) => (
                  <div key={ph} className="text-gray-600">
                    <span className="font-mono font-bold">pH {ph}:</span> {example}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHScale;
