import { create } from 'zustand';
import type { Atom, Bond, Molecule } from '../types/molecule';
import type { Element } from '../types/element';

type BondingState = {
  readonly atoms: readonly Atom[];
  readonly bonds: readonly Bond[];
  readonly viewMode: 'standard' | 'lewis';
  readonly selectedAtomId: string | null;
};

type BondingAction =
  | { type: 'ADD_ATOM'; payload: { element: Element; x: number; y: number } }
  | { type: 'MOVE_ATOM'; payload: { id: string; x: number; y: number } }
  | { type: 'REMOVE_ATOM'; payload: string }
  | { type: 'FORM_BOND'; payload: { atom1Id: string; atom2Id: string } }
  | { type: 'REMOVE_BOND'; payload: string }
  | { type: 'TOGGLE_VIEW' }
  | { type: 'SELECT_ATOM'; payload: string | null }
  | { type: 'CLEAR_MOLECULE' }
  | { type: 'LOAD_EXAMPLE'; payload: { atoms: Atom[]; bonds: Bond[] } };

const initialState: BondingState = {
  atoms: [],
  bonds: [],
  viewMode: 'standard',
  selectedAtomId: null,
};

const BOND_DISTANCE_THRESHOLD = 100;

const update = (state: BondingState, action: BondingAction): BondingState => {
  switch (action.type) {
    case 'ADD_ATOM': {
      const newAtom: Atom = {
        id: `atom-${Date.now()}-${Math.random()}`,
        element: action.payload.element,
        x: action.payload.x,
        y: action.payload.y,
      };
      return {
        ...state,
        atoms: [...state.atoms, newAtom],
      };
    }

    case 'MOVE_ATOM': {
      const updatedAtoms = state.atoms.map((atom) =>
        atom.id === action.payload.id
          ? { ...atom, x: action.payload.x, y: action.payload.y }
          : atom
      );

      // Check for bond formation when atoms are close
      let newBonds = [...state.bonds];
      const movedAtom = updatedAtoms.find((a) => a.id === action.payload.id);
      if (movedAtom) {
        for (const otherAtom of updatedAtoms) {
          if (otherAtom.id !== movedAtom.id) {
            const distance = Math.sqrt(
              Math.pow(movedAtom.x - otherAtom.x, 2) + Math.pow(movedAtom.y - otherAtom.y, 2)
            );
            if (distance < BOND_DISTANCE_THRESHOLD) {
              // Check if bond already exists
              const bondExists = state.bonds.some(
                (b) =>
                  (b.atom1Id === movedAtom.id && b.atom2Id === otherAtom.id) ||
                  (b.atom1Id === otherAtom.id && b.atom2Id === movedAtom.id)
              );
              if (!bondExists) {
                newBonds.push({
                  id: `bond-${Date.now()}-${Math.random()}`,
                  atom1Id: movedAtom.id,
                  atom2Id: otherAtom.id,
                  type: null,
                  electrons: 2,
                });
              }
            }
          }
        }
      }

      return {
        ...state,
        atoms: updatedAtoms,
        bonds: newBonds,
      };
    }

    case 'REMOVE_ATOM': {
      return {
        ...state,
        atoms: state.atoms.filter((a) => a.id !== action.payload),
        bonds: state.bonds.filter(
          (b) => b.atom1Id !== action.payload && b.atom2Id !== action.payload
        ),
      };
    }

    case 'FORM_BOND': {
      const bondExists = state.bonds.some(
        (b) =>
          (b.atom1Id === action.payload.atom1Id && b.atom2Id === action.payload.atom2Id) ||
          (b.atom1Id === action.payload.atom2Id && b.atom2Id === action.payload.atom1Id)
      );
      if (bondExists) {
        return state;
      }
      return {
        ...state,
        bonds: [
          ...state.bonds,
          {
            id: `bond-${Date.now()}-${Math.random()}`,
            atom1Id: action.payload.atom1Id,
            atom2Id: action.payload.atom2Id,
            type: null,
            electrons: 2,
          },
        ],
      };
    }

    case 'REMOVE_BOND':
      return {
        ...state,
        bonds: state.bonds.filter((b) => b.id !== action.payload),
      };

    case 'TOGGLE_VIEW':
      return {
        ...state,
        viewMode: state.viewMode === 'standard' ? 'lewis' : 'standard',
      };

    case 'SELECT_ATOM':
      return {
        ...state,
        selectedAtomId: action.payload,
      };

    case 'CLEAR_MOLECULE':
      return initialState;

    case 'LOAD_EXAMPLE':
      return {
        ...state,
        atoms: action.payload.atoms,
        bonds: action.payload.bonds,
      };

    default:
      return state;
  }
};

type BondingStore = BondingState & {
  dispatch: (action: BondingAction) => void;
  getMolecule: () => Molecule;
};

export const useBondingStore = create<BondingStore>((set, get) => ({
  ...initialState,
  dispatch: (action) => set((state) => update(state, action)),
  getMolecule: () => {
    const state = get();
    // Calculate molecule properties from atoms and bonds
    const formula = calculateFormula(state.atoms);
    const charge = calculateCharge(state.atoms, state.bonds);
    const isStable = Math.abs(charge) === 0;

    return {
      atoms: state.atoms,
      bonds: state.bonds,
      charge,
      formula,
      name: null,
      isStable,
      shape: null,
      polarity: null,
    };
  },
}));

// Helper functions
const calculateFormula = (atoms: readonly Atom[]): string => {
  const counts: Record<string, number> = {};
  for (const atom of atoms) {
    counts[atom.element.symbol] = (counts[atom.element.symbol] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([symbol, count]) => (count > 1 ? `${symbol}${count}` : symbol))
    .join('');
};

const calculateCharge = (_atoms: readonly Atom[], _bonds: readonly Bond[]): number => {
  // Simplified charge calculation
  // In reality, this would analyze oxidation states and formal charges
  return 0;
};
