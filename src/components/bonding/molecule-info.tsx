import { useEffect, useState } from 'react';
import { useBondingStore } from '../../stores/bonding-store';
import { validateBond } from '../../utils/bonding-logic';
import { getIUPACName } from '../../utils/iupac-naming';

const MoleculeInfo = () => {
  const { atoms, bonds, viewMode, dispatch, getMolecule } = useBondingStore();
  const molecule = getMolecule();
  const [iupacName, setIupacName] = useState<string | null>(null);
  const [loadingName, setLoadingName] = useState(false);

  // Fetch IUPAC name when molecule changes
  useEffect(() => {
    if (atoms.length === 0) {
      setIupacName(null);
      return;
    }

    setLoadingName(true);
    getIUPACName(atoms, bonds)
      .then((name) => {
        setIupacName(name);
        setLoadingName(false);
      })
      .catch(() => {
        setIupacName(null);
        setLoadingName(false);
      });
  }, [atoms, bonds]);

  if (atoms.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
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

  const bondOrderLabels = {
    1: 'Single',
    2: 'Double',
    3: 'Triple',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Molecule Information</h3>

      {/* Formula */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-500">Formula</span>
        <p className="text-2xl font-bold text-gray-800 mt-1">{molecule.formula}</p>
      </div>

      {/* IUPAC Name */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-500">IUPAC Name</span>
        {loadingName ? (
          <p className="text-gray-500 italic mt-1">Loading...</p>
        ) : iupacName ? (
          <p className="text-lg font-medium text-gray-800 mt-1">{iupacName}</p>
        ) : (
          <p className="text-gray-500 italic mt-1">Name not available</p>
        )}
      </div>

      {/* Compound Type (Ionic/Covalent) */}
      {molecule.compoundType && (
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-500">Compound Type</span>
          <p className="text-lg font-medium text-gray-800 mt-1 capitalize">
            {molecule.compoundType}
          </p>
        </div>
      )}

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

      {/* Bond Information */}
      {bondAnalyses.length > 0 && (
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-500">Bonds</span>
          <div className="mt-2 space-y-2">
            {bondAnalyses.map(({ bond, analysis, atom1, atom2 }) => (
              <div
                key={bond.id}
                className="bg-gray-50 rounded p-3 text-sm"
              >
                <div className="font-medium mb-1">
                  {atom1.element.symbol} - {atom2.element.symbol}
                </div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-gray-600 capitalize">
                    {bondOrderLabels[bond.order]} {analysis.bondType} bond
                  </span>
                  {bond.isManual && (
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Manual</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mb-2">{analysis.explanation}</div>
                {/* Manual bond order control */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-600">Bond order:</span>
                  {([1, 2, 3] as const).map((order) => (
                    <button
                      key={order}
                      onClick={() => dispatch({ type: 'SET_BOND_ORDER', payload: { bondId: bond.id, order } })}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        bond.order === order
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {order}
                    </button>
                  ))}
                </div>
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
