import { create } from 'zustand';
import type { Element } from '../types/element';

type TrendType = 'atomic-radius' | 'ionization-energy' | 'electronegativity' | 'electron-affinity' | null;
type FilterType = Element['category'] | 'metal' | 'nonmetal' | 'metalloid' | null;

type PeriodicTableState = {
  readonly selectedElement: Element | null;
  readonly activeTrend: TrendType;
  readonly filter: FilterType;
  readonly searchQuery: string;
  readonly selectedGroup: number | null;
  readonly selectedPeriod: number | null;
};

type PeriodicTableAction =
  | { type: 'SELECT_ELEMENT'; payload: Element | null }
  | { type: 'SHOW_TREND'; payload: TrendType }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SELECT_GROUP'; payload: number | null }
  | { type: 'SELECT_PERIOD'; payload: number | null }
  | { type: 'CLEAR_FILTERS' };

const initialState: PeriodicTableState = {
  selectedElement: null,
  activeTrend: null,
  filter: null,
  searchQuery: '',
  selectedGroup: null,
  selectedPeriod: null,
};

const update = (state: PeriodicTableState, action: PeriodicTableAction): PeriodicTableState => {
  switch (action.type) {
    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElement: action.payload,
      };
    case 'SHOW_TREND':
      return {
        ...state,
        activeTrend: action.payload === state.activeTrend ? null : action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload === state.filter ? null : action.payload,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'SELECT_GROUP':
      return {
        ...state,
        selectedGroup: action.payload === state.selectedGroup ? null : action.payload,
        selectedPeriod: null, // Clear period when group is selected
      };
    case 'SELECT_PERIOD':
      return {
        ...state,
        selectedPeriod: action.payload === state.selectedPeriod ? null : action.payload,
        selectedGroup: null, // Clear group when period is selected
      };
    case 'CLEAR_FILTERS':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

type PeriodicTableStore = PeriodicTableState & {
  dispatch: (action: PeriodicTableAction) => void;
};

export const usePeriodicTableStore = create<PeriodicTableStore>((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => update(state, action)),
}));
