import { create } from 'zustand';
import type { BalancedEquation, ReactionType } from '../types/reaction';
import { isEquationBalanced, countAtoms } from '../utils/chemical-formulas';

type EquationsState = {
  readonly reactants: readonly string[];
  readonly products: readonly string[];
  readonly balancedEquation: BalancedEquation | null;
  readonly reactionType: ReactionType;
  readonly isBalanced: boolean;
};

type EquationsAction =
  | { type: 'SET_REACTANTS'; payload: string[] }
  | { type: 'SET_PRODUCTS'; payload: string[] }
  | { type: 'ADD_REACTANT'; payload: string }
  | { type: 'ADD_PRODUCT'; payload: string }
  | { type: 'REMOVE_REACTANT'; payload: number }
  | { type: 'REMOVE_PRODUCT'; payload: number }
  | { type: 'BALANCE_EQUATION' }
  | { type: 'CLASSIFY_REACTION' }
  | { type: 'LOAD_EXAMPLE'; payload: { reactants: string[]; products: string[] } }
  | { type: 'CLEAR_EQUATION' };

const initialState: EquationsState = {
  reactants: [],
  products: [],
  balancedEquation: null,
  reactionType: null,
  isBalanced: false,
};

// Simple equation balancing (Gaussian elimination for small systems)
const balanceEquation = (reactants: readonly string[], products: readonly string[]): BalancedEquation | null => {
  if (reactants.length === 0 || products.length === 0) return null;

  // For now, return balanced coefficients of 1 for all
  // Full implementation would use matrix methods
  return {
    reactants: reactants.map((r) => ({ formula: r, coefficient: 1 })),
    products: products.map((p) => ({ formula: p, coefficient: 1 })),
    isBalanced: false,
  };
};

// Classify reaction type
const classifyReaction = (reactants: readonly string[], products: readonly string[]): ReactionType => {
  if (reactants.length === 0 || products.length === 0) return null;

  // Combination: A + B → AB
  if (reactants.length >= 2 && products.length === 1) {
    return 'combination';
  }

  // Decomposition: AB → A + B
  if (reactants.length === 1 && products.length >= 2) {
    return 'decomposition';
  }

  // Single replacement: A + BC → AC + B
  if (reactants.length === 2 && products.length === 2) {
    // Simplified check
    return 'single-replacement';
  }

  // Double replacement: AB + CD → AD + CB
  if (reactants.length === 2 && products.length === 2) {
    return 'double-replacement';
  }

  // Combustion: fuel + O₂ → CO₂ + H₂O
  const hasO2 = reactants.some((r) => r.includes('O₂') || r === 'O2');
  const hasCO2 = products.some((p) => p.includes('CO₂') || p === 'CO2');
  const hasH2O = products.some((p) => p.includes('H₂O') || p === 'H2O');
  if (hasO2 && hasCO2 && hasH2O) {
    return 'combustion';
  }

  return null;
};

const update = (state: EquationsState, action: EquationsAction): EquationsState => {
  switch (action.type) {
    case 'SET_REACTANTS':
      return {
        ...state,
        reactants: action.payload,
        balancedEquation: null,
        isBalanced: false,
      };

    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        balancedEquation: null,
        isBalanced: false,
      };

    case 'ADD_REACTANT': {
      const newReactants = [...state.reactants, action.payload];
      return {
        ...state,
        reactants: newReactants,
        balancedEquation: null,
        isBalanced: false,
      };
    }

    case 'ADD_PRODUCT': {
      const newProducts = [...state.products, action.payload];
      return {
        ...state,
        products: newProducts,
        balancedEquation: null,
        isBalanced: false,
      };
    }

    case 'REMOVE_REACTANT': {
      const newReactants = state.reactants.filter((_, i) => i !== action.payload);
      return {
        ...state,
        reactants: newReactants,
        balancedEquation: null,
        isBalanced: false,
      };
    }

    case 'REMOVE_PRODUCT': {
      const newProducts = state.products.filter((_, i) => i !== action.payload);
      return {
        ...state,
        products: newProducts,
        balancedEquation: null,
        isBalanced: false,
      };
    }

    case 'BALANCE_EQUATION': {
      const balanced = balanceEquation(state.reactants, state.products);
      if (!balanced) return state;

      // Check if actually balanced
      const checkResult = isEquationBalanced(state.reactants, state.products);
      const actuallyBalanced = checkResult.success ? checkResult.data : false;

      return {
        ...state,
        balancedEquation: { ...balanced, isBalanced: actuallyBalanced },
        isBalanced: actuallyBalanced,
      };
    }

    case 'CLASSIFY_REACTION': {
      return {
        ...state,
        reactionType: classifyReaction(state.reactants, state.products),
      };
    }

    case 'LOAD_EXAMPLE':
      return {
        ...initialState,
        reactants: action.payload.reactants,
        products: action.payload.products,
      };

    case 'CLEAR_EQUATION':
      return initialState;

    default:
      return state;
  }
};

type EquationsStore = EquationsState & {
  dispatch: (action: EquationsAction) => void;
  getAtomCounts: () => { reactants: Record<string, number>; products: Record<string, number> };
};

export const useEquationsStore = create<EquationsStore>((set, get) => ({
  ...initialState,
  dispatch: (action) => set((state) => update(state, action)),
  getAtomCounts: () => {
    const state = get();
    const reactantCounts: Record<string, number> = {};
    const productCounts: Record<string, number> = {};

    for (const reactant of state.reactants) {
      const counts = countAtoms(reactant);
      if (counts.success) {
        for (const [element, count] of Object.entries(counts.data)) {
          reactantCounts[element] = (reactantCounts[element] || 0) + count;
        }
      }
    }

    for (const product of state.products) {
      const counts = countAtoms(product);
      if (counts.success) {
        for (const [element, count] of Object.entries(counts.data)) {
          productCounts[element] = (productCounts[element] || 0) + count;
        }
      }
    }

    return { reactants: reactantCounts, products: productCounts };
  },
}));
