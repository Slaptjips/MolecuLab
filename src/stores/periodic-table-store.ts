import { create } from 'zustand';
import type { Element } from '../types/element';

type TrendType = 'atomic-radius' | 'ionization-energy' | 'electronegativity' | 'electron-affinity' | null;
type FilterType = Element['category'] | 'metal' | 'nonmetal' | 'metalloid' | null;

type PeriodicTableState = {
  readonly selectedElement: Element | null;
  readonly activeTrend: TrendType;
  readonly filter: FilterType;
  readonly searchQuery: string;
};

type PeriodicTableAction =
  | { type: 'SELECT_ELEMENT'; payload: Element | null }
  | { type: 'SHOW_TREND'; payload: TrendType }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'CLEAR_FILTERS' };

const initialState: PeriodicTableState = {
  selectedElement: null,
  activeTrend: null,
  filter: null,
  searchQuery: '',
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
