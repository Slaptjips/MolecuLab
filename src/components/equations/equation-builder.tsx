import { useState } from 'react';
import { useEquationsStore } from '../../stores/equations-store';

const COMMON_COMPOUNDS = [
  'H₂O', 'CO₂', 'NH₃', 'CH₄', 'NaCl', 'HCl', 'H₂SO₄', 'NaOH', 'CaCO₃',
  'O₂', 'H₂', 'N₂', 'Cl₂', 'Fe₂O₃', 'Al₂O₃', 'MgO', 'CaO',
];

const EquationBuilder = () => {
  const { reactants, products, dispatch } = useEquationsStore();
  const [reactantInput, setReactantInput] = useState('');
  const [productInput, setProductInput] = useState('');

  const addReactant = () => {
    if (reactantInput.trim()) {
      dispatch({ type: 'ADD_REACTANT', payload: reactantInput.trim() });
      setReactantInput('');
    }
  };

  const addProduct = () => {
    if (productInput.trim()) {
      dispatch({ type: 'ADD_PRODUCT', payload: productInput.trim() });
      setProductInput('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Equation Builder</h3>

      {/* Reactants */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Reactants</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={reactantInput}
            onChange={(e) => setReactantInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addReactant();
              }
            }}
            placeholder="Enter compound (e.g., H₂O)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={addReactant}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {reactants.map((reactant, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-md"
            >
              <span className="font-mono">{reactant}</span>
              <button
                onClick={() => dispatch({ type: 'REMOVE_REACTANT', payload: index })}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="text-center my-4">
        <span className="text-2xl font-bold text-gray-600">→</span>
      </div>

      {/* Products */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={productInput}
            onChange={(e) => setProductInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addProduct();
              }
            }}
            placeholder="Enter compound (e.g., CO₂)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={addProduct}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-md"
            >
              <span className="font-mono">{product}</span>
              <button
                onClick={() => dispatch({ type: 'REMOVE_PRODUCT', payload: index })}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Common Compounds */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Common Compounds</label>
        <div className="flex flex-wrap gap-2">
          {COMMON_COMPOUNDS.map((compound) => (
            <button
              key={compound}
              onClick={() => {
                setReactantInput(compound);
              }}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm transition-colors"
            >
              {compound}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex gap-2">
        <button
          onClick={() => dispatch({ type: 'BALANCE_EQUATION' })}
          disabled={reactants.length === 0 || products.length === 0}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Balance Equation
        </button>
        <button
          onClick={() => dispatch({ type: 'CLASSIFY_REACTION' })}
          disabled={reactants.length === 0 || products.length === 0}
          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Classify Reaction
        </button>
        <button
          onClick={() => dispatch({ type: 'CLEAR_EQUATION' })}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default EquationBuilder;
