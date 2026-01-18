import { create } from 'zustand';
import { calculatePH } from '../utils/calculations';
import type { PHResult } from '../types/calculation';

type AcidsBasesState = {
  readonly phValue: number | null;
  readonly hConcentration: number | null;
  readonly ohConcentration: number | null;
  readonly pohValue: number | null;
  readonly calculationResult: PHResult | null;
  readonly titrationParams: {
    readonly acidType: 'strong' | 'weak' | null;
    readonly baseType: 'strong' | 'weak' | null;
    readonly acidConcentration: number | null;
    readonly baseConcentration: number | null;
    readonly acidVolume: number | null;
    readonly baseVolume: number | null;
  };
};

type AcidsBasesAction =
  | { type: 'SET_PH'; payload: number }
  | { type: 'SET_H_CONCENTRATION'; payload: number }
  | { type: 'SET_OH_CONCENTRATION'; payload: number }
  | { type: 'SET_POH'; payload: number }
  | { type: 'CALCULATE_PH' }
  | { type: 'SET_TITRATION_ACID_TYPE'; payload: 'strong' | 'weak' | null }
  | { type: 'SET_TITRATION_BASE_TYPE'; payload: 'strong' | 'weak' | null }
  | { type: 'SET_TITRATION_ACID_CONCENTRATION'; payload: number | null }
  | { type: 'SET_TITRATION_BASE_CONCENTRATION'; payload: number | null }
  | { type: 'SET_TITRATION_ACID_VOLUME'; payload: number | null }
  | { type: 'SET_TITRATION_BASE_VOLUME'; payload: number | null }
  | { type: 'CLEAR_CALCULATIONS' };

const initialState: AcidsBasesState = {
  phValue: null,
  hConcentration: null,
  ohConcentration: null,
  pohValue: null,
  calculationResult: null,
  titrationParams: {
    acidType: null,
    baseType: null,
    acidConcentration: null,
    baseConcentration: null,
    acidVolume: null,
    baseVolume: null,
  },
};

const update = (state: AcidsBasesState, action: AcidsBasesAction): AcidsBasesState => {
  switch (action.type) {
    case 'SET_PH':
      return {
        ...state,
        phValue: action.payload,
        calculationResult: null,
      };

    case 'SET_H_CONCENTRATION':
      return {
        ...state,
        hConcentration: action.payload,
        calculationResult: null,
      };

    case 'SET_OH_CONCENTRATION':
      return {
        ...state,
        ohConcentration: action.payload,
        calculationResult: null,
      };

    case 'SET_POH':
      return {
        ...state,
        pohValue: action.payload,
        calculationResult: null,
      };

    case 'CALCULATE_PH': {
      const result = calculatePH({
        pH: state.phValue ?? undefined,
        pOH: state.pohValue ?? undefined,
        hConcentration: state.hConcentration ?? undefined,
        ohConcentration: state.ohConcentration ?? undefined,
      });
      return {
        ...state,
        calculationResult: result,
      };
    }

    case 'SET_TITRATION_ACID_TYPE':
      return {
        ...state,
        titrationParams: { ...state.titrationParams, acidType: action.payload },
      };

    case 'SET_TITRATION_BASE_TYPE':
      return {
        ...state,
        titrationParams: { ...state.titrationParams, baseType: action.payload },
      };

    case 'SET_TITRATION_ACID_CONCENTRATION':
      return {
        ...state,
        titrationParams: { ...state.titrationParams, acidConcentration: action.payload },
      };

    case 'SET_TITRATION_BASE_CONCENTRATION':
      return {
        ...state,
        titrationParams: { ...state.titrationParams, baseConcentration: action.payload },
      };

    case 'SET_TITRATION_ACID_VOLUME':
      return {
        ...state,
        titrationParams: { ...state.titrationParams, acidVolume: action.payload },
      };

    case 'SET_TITRATION_BASE_VOLUME':
      return {
        ...state,
        titrationParams: { ...state.titrationParams, baseVolume: action.payload },
      };

    case 'CLEAR_CALCULATIONS':
      return initialState;

    default:
      return state;
  }
};

type AcidsBasesStore = AcidsBasesState & {
  dispatch: (action: AcidsBasesAction) => void;
};

export const useAcidsBasesStore = create<AcidsBasesStore>((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => update(state, action)),
}));
