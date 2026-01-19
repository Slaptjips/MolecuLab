import { useBondingStore } from '../../stores/bonding-store';
import { validateBond } from '../../utils/bonding-logic';
import { getMolecularShape } from '../../utils/bonding-logic';

const MoleculeInfo = () => {
  const { atoms, bonds, viewMode, dispatch, getMolecule } = useBondingStore();
  const molecule = getMolecule();

  if (atoms.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Molecule Information</h3>
        <p className="text-gray-500">Add atoms to build a molecule</p>
      </div>
    );
  }

  // Analyze bonds
  const bondAnalyses = bonds.map((bond) => {
    const atom1 = atoms.find((a) => a.id === bond.atom1Id);
    const atom2 = atoms.find((a) => a.id === bond.atom2Id);
    if (!atom1 || !atom2) return null;
    return {
      bond,
      analysis: validateBond(atom1.element, atom2.element),
      atom1,
      atom2,
    };
  }).filter(Boolean) as Array<{
    bond: typeof bonds[number];
    analysis: ReturnType<typeof validateBond>;
    atom1: typeof atoms[number];
    atom2: typeof atoms[number];
  }>;

  // Calculate molecular shape (simplified - assume first atom is central)
  const centralAtom = atoms[0];
  const bondedAtoms = bonds.filter((b) => b.atom1Id === centralAtom?.id || b.atom2Id === centralAtom?.id).length;
  const shape = centralAtom
    ? getMolecularShape(centralAtom.element, bondedAtoms, 0)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Molecule Information</h3>

      {/* Formula */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-500">Formula</span>
        <p className="text-2xl font-bold text-gray-800 mt-1">{molecule.formula}</p>
      </div>

      {/* Stability */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-500">Stability</span>
        <div className="mt-1 flex items-center gap-2">
          {molecule.isStable ? (
            <>
              <span className="text-green-600 text-xl">✓</span>
              <span className="text-green-700 font-medium">Stable compound</span>
            </>
          ) : (
            <>
              <span className="text-yellow-600 text-xl">⚠</span>
              <span className="text-yellow-700 font-medium">
                Charge: {molecule.charge > 0 ? '+' : ''}{molecule.charge}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Molecular Shape */}
      {shape && (
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-500">Molecular Shape</span>
          <p className="text-lg font-medium text-gray-800 mt-1">{shape}</p>
        </div>
      )}

      {/* Bond Information */}
      {bondAnalyses.length > 0 && (
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-500">Bonds</span>
          <div className="mt-2 space-y-2">
            {bondAnalyses.map(({ bond, analysis, atom1, atom2 }) => (
              <div
                key={bond.id}
                className="bg-gray-50 rounded p-2 text-sm"
              >
                <div className="font-medium">
                  {atom1.element.symbol} - {atom2.element.symbol}
                </div>
                <div className="text-gray-600">{analysis.bondType} bond</div>
                <div className="text-xs text-gray-500 mt-1">{analysis.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Mode Toggle */}
      <div className="mb-4 pt-4 border-t border-gray-200">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={viewMode === 'lewis'}
            onChange={() => dispatch({ type: 'TOGGLE_VIEW' })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Lewis Dot Structure View</span>
        </label>
      </div>

      {/* Controls */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => dispatch({ type: 'CLEAR_MOLECULE' })}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
        >
          Clear Molecule
        </button>
      </div>

      {/* Example Molecules */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <span className="text-sm font-semibold text-gray-500 block mb-2">Example Molecules</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { name: 'H₂O', atoms: [{ symbol: 'H', x: 200, y: 200 }, { symbol: 'O', x: 250, y: 200 }, { symbol: 'H', x: 300, y: 200 }] },
            { name: 'CO₂', atoms: [{ symbol: 'C', x: 250, y: 200 }, { symbol: 'O', x: 200, y: 200 }, { symbol: 'O', x: 300, y: 200 }] },
            { name: 'NH₃', atoms: [{ symbol: 'N', x: 250, y: 250 }, { symbol: 'H', x: 200, y: 200 }, { symbol: 'H', x: 250, y: 200 }, { symbol: 'H', x: 300, y: 200 }] },
            { name: 'CH₄', atoms: [{ symbol: 'C', x: 250, y: 250 }, { symbol: 'H', x: 200, y: 200 }, { symbol: 'H', x: 300, y: 200 }, { symbol: 'H', x: 200, y: 300 }, { symbol: 'H', x: 300, y: 300 }] },
          ].map((example) => (
            <button
              key={example.name}
              onClick={() => {
                // Load example (simplified - would need proper bond generation)
                const exampleAtoms = example.atoms.map((a, i) => ({
                  id: `atom-${i}-${Date.now()}`,
                  element: atoms.find((at) => at.element.symbol === a.symbol)?.element || atoms[0]?.element,
                  x: a.x,
                  y: a.y,
                }));
                if (exampleAtoms[0]?.element) {
                  dispatch({ type: 'LOAD_EXAMPLE', payload: { atoms: exampleAtoms, bonds: [] } });
                }
              }}
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium transition-colors"
            >
              {example.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoleculeInfo;
