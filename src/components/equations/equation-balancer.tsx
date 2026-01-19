import { useEquationsStore } from '../../stores/equations-store';

const EquationBalancer = () => {
  const { reactants, products, balancedEquation, isBalanced, getAtomCounts } = useEquationsStore();
  const atomCounts = getAtomCounts();

  if (reactants.length === 0 && products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Balanced Equation</h3>
        <p className="text-gray-500">Enter an equation to see the balanced version</p>
      </div>
    );
  }

  // Display equation
  const displayReactants = balancedEquation
    ? balancedEquation.reactants.map((r) => (r.coefficient > 1 ? `${r.coefficient}${r.formula}` : r.formula))
    : reactants;
  const displayProducts = balancedEquation
    ? balancedEquation.products.map((p) => (p.coefficient > 1 ? `${p.coefficient}${p.formula}` : p.formula))
    : products;

  // Get all unique elements
  const allElements = new Set([
    ...Object.keys(atomCounts.reactants),
    ...Object.keys(atomCounts.products),
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Balanced Equation</h3>

      {/* Equation Display */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {displayReactants.map((r, i) => (
            <span key={i} className="text-2xl font-mono font-semibold">
              {i > 0 && <span className="mx-2">+</span>}
              {r}
            </span>
          ))}
          <span className="text-2xl font-bold text-gray-600">→</span>
          {displayProducts.map((p, i) => (
            <span key={i} className="text-2xl font-mono font-semibold">
              {i > 0 && <span className="mx-2">+</span>}
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Balance Status */}
      <div className="mb-6">
        {isBalanced ? (
          <div className="flex items-center gap-2 text-green-600">
            <span className="text-2xl">✓</span>
            <span className="font-medium">Equation is balanced</span>
          </div>
        ) : balancedEquation ? (
          <div className="flex items-center gap-2 text-yellow-600">
            <span className="text-2xl">⚠</span>
            <span className="font-medium">Balancing attempted (may need manual adjustment)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
            <span className="font-medium">Click "Balance Equation" to balance</span>
          </div>
        )}
      </div>

      {/* Atom Counts */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Atom Counts</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Reactants</h5>
            <div className="space-y-1">
              {Array.from(allElements).map((element) => {
                const count = atomCounts.reactants[element] || 0;
                const productCount = atomCounts.products[element] || 0;
                const balanced = count === productCount;
                return (
                  <div
                    key={`reactant-${element}`}
                    className={`text-sm ${balanced ? 'text-green-700' : 'text-red-700'}`}
                  >
                    <span className="font-mono font-bold">{element}</span>: {count}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Products</h5>
            <div className="space-y-1">
              {Array.from(allElements).map((element) => {
                const count = atomCounts.products[element] || 0;
                const reactantCount = atomCounts.reactants[element] || 0;
                const balanced = count === reactantCount;
                return (
                  <div
                    key={`product-${element}`}
                    className={`text-sm ${balanced ? 'text-green-700' : 'text-red-700'}`}
                  >
                    <span className="font-mono font-bold">{element}</span>: {count}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquationBalancer;
