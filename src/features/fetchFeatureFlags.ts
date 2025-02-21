import { ref, unref } from 'vue';
import type { IRequestFeatureFlag } from '@/types/IRequestFeatureFlag.ts';

export const fetchFeatureFlags = async (): Promise<IRequestFeatureFlag[] | null> => {
  const data = ref<IRequestFeatureFlag[] | null>(null);

  await fetch('https://edge.api.flagsmith.com/api/v1/flags', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-Environment-Key': '5xDnMbNrDbMcyhpKwC8VPZ'
    }
  }).then((res) => res.json())
    .then((res) => data.value = res)
    .catch((error) => {
      throw error;
    });



  return unref(data);
};
