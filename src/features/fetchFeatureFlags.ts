import type { FeatureFlagType } from '@/types/FeatureFlagType.ts';

export const fetchFeatureFlags = async (): Promise<FeatureFlagType> => {
  let data = {} as FeatureFlagType;

  await fetch('http://localhost:3000/api/config', {
    method: 'GET'
  }).then((res) => res.json())
    .then((res) => data = res)
    .catch((error) => {
      throw error;
    });



  return data;
};
