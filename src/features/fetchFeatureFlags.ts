import type { FeatureFlagType } from '@/types/FeatureFlagType.ts';
import { BASE_API_URL } from '@/constants/baseUrl.ts';

export const fetchFeatureFlags = async (): Promise<FeatureFlagType> => {
  let data = {} as FeatureFlagType;

  await fetch(`${BASE_API_URL}/config`, {
    method: 'GET'
  }).then((res) => res.json())
    .then((res) => data = res)
    .catch((error) => {
      throw error;
    });



  return data;
};
