import { create } from 'zustand';
import { specificHeatCalculation } from '../utils/calculations';
import { getSpecificHeat } from '../data/specific-heats';
import type { SpecificHeatResult } from '../types/calculation';

type ThermochemistryState = {
  readonly calculationType: 'specific-heat' | 'energy-diagram' | 'bond-energy';
  readonly specificHeatValues: {
    readonly mass?: number; // g
    readonly specificHeat?: number; // J/(g·°C)
    readonly temperatureChange?: number; // °C
    readonly heat?: number; // J
  };
  readonly substance: string;
  readonly result: SpecificHeatResult | null;
};

type ThermochemistryAction =
  | { type: 'SET_CALCULATION_TYPE'; payload: ThermochemistryState['calculationType'] }
  | { type: 'SET_SUBSTANCE'; payload: string }
  | { type: 'SET_SPECIFIC_HEAT_MASS'; payload: number }
  | { type: 'SET_SPECIFIC_HEAT_C'; payload: number }
  | { type: 'SET_SPECIFIC_HEAT_DELTA_T'; payload: number }
  | { type: 'SET_SPECIFIC_HEAT_HEAT'; payload: number }
  | { type: 'CALCULATE_SPECIFIC_HEAT' }
  | { type: 'CLEAR_CALCULATIONS' };

const initialState: ThermochemistryState = {
  calculationType: 'specific-heat',
  specificHeatValues: {},
  substance: '',
  result: null,
};

const update = (state: ThermochemistryState, action: ThermochemistryAction): ThermochemistryState => {
  switch (action.type) {
    case 'SET_CALCULATION_TYPE':
      return {
        ...state,
        calculationType: action.payload,
      };

    case 'SET_SUBSTANCE': {
      const specificHeat = getSpecificHeat(action.payload);
      return {
        ...state,
        substance: action.payload,
        specificHeatValues: {
          ...state.specificHeatValues,
          specificHeat: specificHeat ?? undefined,
        },
        result: null,
      };
    }

    case 'SET_SPECIFIC_HEAT_MASS':
      return {
        ...state,
        specificHeatValues: { ...state.specificHeatValues, mass: action.payload },
        result: null,
      };

    case 'SET_SPECIFIC_HEAT_C':
      return {
        ...state,
        specificHeatValues: { ...state.specificHeatValues, specificHeat: action.payload },
        result: null,
      };

    case 'SET_SPECIFIC_HEAT_DELTA_T':
      return {
        ...state,
        specificHeatValues: { ...state.specificHeatValues, temperatureChange: action.payload },
        result: null,
      };

    case 'SET_SPECIFIC_HEAT_HEAT':
      return {
        ...state,
        specificHeatValues: { ...state.specificHeatValues, heat: action.payload },
        result: null,
      };

    case 'CALCULATE_SPECIFIC_HEAT': {
      const result = specificHeatCalculation({
        mass: state.specificHeatValues.mass,
        specificHeat: state.specificHeatValues.specificHeat,
        temperatureChange: state.specificHeatValues.temperatureChange,
        heat: state.specificHeatValues.heat,
      });
      return {
        ...state,
        result,
      };
    }

    case 'CLEAR_CALCULATIONS':
      return initialState;

    default:
      return state;
  }
};

type ThermochemistryStore = ThermochemistryState & {
  dispatch: (action: ThermochemistryAction) => void;
};

export const useThermochemistryStore = create<ThermochemistryStore>((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => update(state, action)),
}));
