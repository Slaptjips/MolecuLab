export type ReactionType =
  | 'combination'
  | 'decomposition'
  | 'single-replacement'
  | 'double-replacement'
  | 'combustion'
  | null;

export type BalancedEquation = {
  readonly reactants: readonly { readonly formula: string; readonly coefficient: number }[];
  readonly products: readonly { readonly formula: string; readonly coefficient: number }[];
  readonly isBalanced: boolean;
};

export type Reaction = {
  readonly reactants: readonly string[];
  readonly products: readonly string[];
  readonly balancedEquation: BalancedEquation | null;
  readonly reactionType: ReactionType;
  readonly isEndothermic: boolean | null;
};
