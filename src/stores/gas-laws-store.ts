import { create } from 'zustand';
import { idealGasLaw } from '../utils/calculations';
import { kelvinToCelsius } from '../utils/units';
import type { GasLawResult } from '../types/calculation';

type GasLawsState = {
  readonly gasLawType: 'ideal' | 'boyles' | 'charles' | 'combined';
  readonly idealGasValues: {
    readonly pressure?: number; // atm
    readonly volume?: number; // L
    readonly moles?: number; // mol
    readonly temperature?: number; // K
  };
  readonly boylesValues: {
    readonly pressure1?: number;
    readonly volume1?: number;
    readonly pressure2?: number;
    readonly volume2?: number;
  };
  readonly charlesValues: {
    readonly volume1?: number;
    readonly temperature1?: number; // K
    readonly volume2?: number;
    readonly temperature2?: number; // K
  };
  readonly idealGasResult: GasLawResult | null;
};

type GasLawsAction =
  | { type: 'SET_GAS_LAW_TYPE'; payload: GasLawsState['gasLawType'] }
  | { type: 'SET_IDEAL_PRESSURE'; payload: number }
  | { type: 'SET_IDEAL_VOLUME'; payload: number }
  | { type: 'SET_IDEAL_MOLES'; payload: number }
  | { type: 'SET_IDEAL_TEMPERATURE'; payload: number }
  | { type: 'SET_BOYLES_P1'; payload: number }
  | { type: 'SET_BOYLES_V1'; payload: number }
  | { type: 'SET_BOYLES_P2'; payload: number }
  | { type: 'SET_BOYLES_V2'; payload: number }
  | { type: 'SET_CHARLES_V1'; payload: number }
  | { type: 'SET_CHARLES_T1'; payload: number }
  | { type: 'SET_CHARLES_V2'; payload: number }
  | { type: 'SET_CHARLES_T2'; payload: number }
  | { type: 'CALCULATE_IDEAL_GAS' }
  | { type: 'CLEAR_CALCULATIONS' };

const initialState: GasLawsState = {
  gasLawType: 'ideal',
  idealGasValues: {},
  boylesValues: {},
  charlesValues: {},
  idealGasResult: null,
};

const update = (state: GasLawsState, action: GasLawsAction): GasLawsState => {
  switch (action.type) {
    case 'SET_GAS_LAW_TYPE':
      return {
        ...state,
        gasLawType: action.payload,
      };

    case 'SET_IDEAL_PRESSURE':
      return {
        ...state,
        idealGasValues: { ...state.idealGasValues, pressure: action.payload },
        idealGasResult: null,
      };

    case 'SET_IDEAL_VOLUME':
      return {
        ...state,
        idealGasValues: { ...state.idealGasValues, volume: action.payload },
        idealGasResult: null,
      };

    case 'SET_IDEAL_MOLES':
      return {
        ...state,
        idealGasValues: { ...state.idealGasValues, moles: action.payload },
        idealGasResult: null,
      };

    case 'SET_IDEAL_TEMPERATURE':
      return {
        ...state,
        idealGasValues: { ...state.idealGasValues, temperature: action.payload },
        idealGasResult: null,
      };

    case 'SET_BOYLES_P1':
      return {
        ...state,
        boylesValues: { ...state.boylesValues, pressure1: action.payload },
      };

    case 'SET_BOYLES_V1':
      return {
        ...state,
        boylesValues: { ...state.boylesValues, volume1: action.payload },
      };

    case 'SET_BOYLES_P2':
      return {
        ...state,
        boylesValues: { ...state.boylesValues, pressure2: action.payload },
      };

    case 'SET_BOYLES_V2':
      return {
        ...state,
        boylesValues: { ...state.boylesValues, volume2: action.payload },
      };

    case 'SET_CHARLES_V1':
      return {
        ...state,
        charlesValues: { ...state.charlesValues, volume1: action.payload },
      };

    case 'SET_CHARLES_T1':
      return {
        ...state,
        charlesValues: { ...state.charlesValues, temperature1: action.payload },
      };

    case 'SET_CHARLES_V2':
      return {
        ...state,
        charlesValues: { ...state.charlesValues, volume2: action.payload },
      };

    case 'SET_CHARLES_T2':
      return {
        ...state,
        charlesValues: { ...state.charlesValues, temperature2: action.payload },
      };

    case 'CALCULATE_IDEAL_GAS': {
      const result = idealGasLaw({
        pressure: state.idealGasValues.pressure,
        volume: state.idealGasValues.volume,
        moles: state.idealGasValues.moles,
        temperature: state.idealGasValues.temperature,
      });
      return {
        ...state,
        idealGasResult: result,
      };
    }

    case 'CLEAR_CALCULATIONS':
      return initialState;

    default:
      return state;
  }
};

type GasLawsStore = GasLawsState & {
  dispatch: (action: GasLawsAction) => void;
  calculateBoylesLaw: () => { pressure2?: number; volume2?: number; steps: string[] } | null;
  calculateCharlesLaw: () => { volume2?: number; temperature2?: number; steps: string[] } | null;
};

export const useGasLawsStore = create<GasLawsStore>((set, get) => ({
  ...initialState,
  dispatch: (action) => set((state) => update(state, action)),
  calculateBoylesLaw: () => {
    const state = get();
    const { pressure1, volume1, pressure2, volume2 } = state.boylesValues;
    const steps: string[] = [];

    if (pressure1 !== undefined && volume1 !== undefined && pressure2 !== undefined && volume2 === undefined) {
      // Calculate V2
      const calculatedV2 = (pressure1 * volume1) / pressure2;
      steps.push(`P₁V₁ = P₂V₂`);
      steps.push(`${pressure1.toFixed(2)} atm × ${volume1.toFixed(2)} L = ${pressure2.toFixed(2)} atm × V₂`);
      steps.push(`V₂ = ${calculatedV2.toFixed(2)} L`);
      return { volume2: calculatedV2, steps };
    }

    if (pressure1 !== undefined && volume1 !== undefined && volume2 !== undefined && pressure2 === undefined) {
      // Calculate P2
      const calculatedP2 = (pressure1 * volume1) / volume2;
      steps.push(`P₁V₁ = P₂V₂`);
      steps.push(`${pressure1.toFixed(2)} atm × ${volume1.toFixed(2)} L = P₂ × ${volume2.toFixed(2)} L`);
      steps.push(`P₂ = ${calculatedP2.toFixed(2)} atm`);
      return { pressure2: calculatedP2, steps };
    }

    return null;
  },
  calculateCharlesLaw: () => {
    const state = get();
    const { volume1, temperature1, volume2, temperature2 } = state.charlesValues;
    const steps: string[] = [];

    if (volume1 !== undefined && temperature1 !== undefined && volume2 !== undefined && temperature2 === undefined) {
      // Calculate T2
      const calculatedT2 = (volume2 * temperature1) / volume1;
      steps.push(`V₁/T₁ = V₂/T₂`);
      steps.push(`${volume1.toFixed(2)} L / ${temperature1.toFixed(2)} K = ${volume2.toFixed(2)} L / T₂`);
      steps.push(`T₂ = ${calculatedT2.toFixed(2)} K (${kelvinToCelsius(calculatedT2).toFixed(2)} °C)`);
      return { temperature2: calculatedT2, steps };
    }

    if (volume1 !== undefined && temperature1 !== undefined && temperature2 !== undefined && volume2 === undefined) {
      // Calculate V2
      const calculatedV2 = (volume1 * temperature2) / temperature1;
      steps.push(`V₁/T₁ = V₂/T₂`);
      steps.push(`${volume1.toFixed(2)} L / ${temperature1.toFixed(2)} K = V₂ / ${temperature2.toFixed(2)} K`);
      steps.push(`V₂ = ${calculatedV2.toFixed(2)} L`);
      return { volume2: calculatedV2, steps };
    }

    return null;
  },
}));
