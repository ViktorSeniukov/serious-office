import {useQuery} from '@tanstack/vue-query';
import { fetchFeatureFlags } from '@/features/fetchFeatureFlags.ts';

export const useFeatureFlags = () => {
  return useQuery({
    queryKey: ['flags'],
    queryFn: fetchFeatureFlags
  });
};
