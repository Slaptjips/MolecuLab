import { create } from 'zustand';
import { calculateMolarMass } from '../utils/chemical-formulas';
import { molesToMass, massToMoles, molesToParticles, particlesToMoles, calculateMoleRatio } from '../utils/calculations';

type StoichiometryState = {
  readonly calculationType: 'mole' | 'mole-to-mole' | 'mass-to-mass' | 'limiting-reactant' | 'avogadro';
  readonly equation: readonly { readonly formula: string; readonly coefficient: number }[];
  readonly moleValues: {
    readonly mass?: number;
    readonly molarMass?: number;
    readonly moles?: number;
    readonly particles?: number;
  };
  readonly stoichiometryValues: {
    readonly startingMoles?: number;
    readonly startingCoefficient?: number;
    readonly targetCoefficient?: number;
  };
  readonly limitingReactant: {
    readonly reactants: readonly { readonly formula: string; readonly mass: number }[];
  };
};

type StoichiometryAction =
  | { type: 'SET_CALCULATION_TYPE'; payload: StoichiometryState['calculationType'] }
  | { type: 'SET_EQUATION'; payload: StoichiometryState['equation'] }
  | { type: 'SET_MOLE_MASS'; payload: number }
  | { type: 'SET_MOLE_MOLAR_MASS'; payload: number }
  | { type: 'SET_MOLE_MOLES'; payload: number }
  | { type: 'SET_MOLE_PARTICLES'; payload: number }
  | { type: 'SET_STOICHIOMETRY_MOLES'; payload: number }
  | { type: 'SET_STOICHIOMETRY_COEFFICIENTS'; payload: { starting: number; target: number } }
  | { type: 'SET_LIMITING_REACTANT'; payload: StoichiometryState['limitingReactant']['reactants'] }
  | { type: 'CLEAR_CALCULATIONS' };

const initialState: StoichiometryState = {
  calculationType: 'mole',
  equation: [],
  moleValues: {},
  stoichiometryValues: {},
  limitingReactant: { reactants: [] },
};

const update = (state: StoichiometryState, action: StoichiometryAction): StoichiometryState => {
  switch (action.type) {
    case 'SET_CALCULATION_TYPE':
      return {
        ...state,
        calculationType: action.payload,
      };

    case 'SET_EQUATION':
      return {
        ...state,
        equation: action.payload,
      };

    case 'SET_MOLE_MASS':
      return {
        ...state,
        moleValues: { ...state.moleValues, mass: action.payload },
      };

    case 'SET_MOLE_MOLAR_MASS':
      return {
        ...state,
        moleValues: { ...state.moleValues, molarMass: action.payload },
      };

    case 'SET_MOLE_MOLES':
      return {
        ...state,
        moleValues: { ...state.moleValues, moles: action.payload },
      };

    case 'SET_MOLE_PARTICLES':
      return {
        ...state,
        moleValues: { ...state.moleValues, particles: action.payload },
      };

    case 'SET_STOICHIOMETRY_MOLES':
      return {
        ...state,
        stoichiometryValues: { ...state.stoichiometryValues, startingMoles: action.payload },
      };

    case 'SET_STOICHIOMETRY_COEFFICIENTS':
      return {
        ...state,
        stoichiometryValues: {
          ...state.stoichiometryValues,
          startingCoefficient: action.payload.starting,
          targetCoefficient: action.payload.target,
        },
      };

    case 'SET_LIMITING_REACTANT':
      return {
        ...state,
        limitingReactant: { reactants: action.payload },
      };

    case 'CLEAR_CALCULATIONS':
      return initialState;

    default:
      return state;
  }
};

type StoichiometryStore = StoichiometryState & {
  dispatch: (action: StoichiometryAction) => void;
  calculateMole: () => { mass?: number; molarMass?: number; moles?: number; particles?: number; steps: string[] } | null;
  calculateStoichiometry: () => number | null;
  calculateLimitingReactant: () => { limiting: string; theoreticalYield: number; excess: Record<string, number> } | null;
};

export const useStoichiometryStore = create<StoichiometryStore>((set, get) => ({
  ...initialState,
  dispatch: (action) => set((state) => update(state, action)),
  calculateMole: () => {
    const state = get();
    const { mass, molarMass, moles, particles } = state.moleValues;
    const steps: string[] = [];

    // Calculate moles from mass and molar mass
    if (mass !== undefined && molarMass !== undefined && moles === undefined) {
      const calculatedMoles = massToMoles(mass, molarMass);
      steps.push(`n = m / M`);
      steps.push(`n = ${mass.toFixed(2)} g / ${molarMass.toFixed(2)} g/mol`);
      steps.push(`n = ${calculatedMoles.toFixed(4)} mol`);
      return { ...state.moleValues, moles: calculatedMoles, steps };
    }

    // Calculate mass from moles and molar mass
    if (moles !== undefined && molarMass !== undefined && mass === undefined) {
      const calculatedMass = molesToMass(moles, molarMass);
      steps.push(`m = n × M`);
      steps.push(`m = ${moles.toFixed(4)} mol × ${molarMass.toFixed(2)} g/mol`);
      steps.push(`m = ${calculatedMass.toFixed(2)} g`);
      return { ...state.moleValues, mass: calculatedMass, steps };
    }

    // Calculate molar mass from mass and moles
    if (mass !== undefined && moles !== undefined && molarMass === undefined) {
      const calculatedMolarMass = mass / moles;
      steps.push(`M = m / n`);
      steps.push(`M = ${mass.toFixed(2)} g / ${moles.toFixed(4)} mol`);
      steps.push(`M = ${calculatedMolarMass.toFixed(2)} g/mol`);
      return { ...state.moleValues, molarMass: calculatedMolarMass, steps };
    }

    // Calculate particles from moles
    if (moles !== undefined && particles === undefined) {
      const calculatedParticles = molesToParticles(moles);
      steps.push(`Particles = n × N_A`);
      steps.push(`Particles = ${moles.toFixed(4)} mol × 6.022 × 10²³`);
      steps.push(`Particles = ${calculatedParticles.toExponential(2)}`);
      return { ...state.moleValues, particles: calculatedParticles, steps };
    }

    // Calculate moles from particles
    if (particles !== undefined && moles === undefined) {
      const calculatedMoles = particlesToMoles(particles);
      steps.push(`n = Particles / N_A`);
      steps.push(`n = ${particles.toExponential(2)} / 6.022 × 10²³`);
      steps.push(`n = ${calculatedMoles.toFixed(4)} mol`);
      return { ...state.moleValues, moles: calculatedMoles, steps };
    }

    return null;
  },
  calculateStoichiometry: () => {
    const state = get();
    const { startingMoles, startingCoefficient, targetCoefficient } = state.stoichiometryValues;
    if (startingMoles !== undefined && startingCoefficient !== undefined && targetCoefficient !== undefined) {
      return calculateMoleRatio(startingMoles, startingCoefficient, targetCoefficient);
    }
    return null;
  },
  calculateLimitingReactant: () => {
    const state = get();
    const { reactants } = state.limitingReactant;
    if (reactants.length < 2) return null;

    // Simplified limiting reactant calculation
    // Would need equation coefficients in full implementation
    const firstReactant = reactants[0];
    const molarMassResult = calculateMolarMass(firstReactant.formula);
    if (!molarMassResult.success) return null;

    return {
      limiting: firstReactant.formula,
      theoreticalYield: 0,
      excess: {},
    };
  },
}));
