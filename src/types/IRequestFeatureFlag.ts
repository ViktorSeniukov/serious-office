interface IRequestFeature {
  id: number;
  name: string;
  type: string;
}

export interface IRequestFeatureFlag {
  feature: IRequestFeature;
  enabled: boolean;
  feature_state_value: string;
}


