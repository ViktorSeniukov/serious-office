import { defineStore } from 'pinia';
import type { FeatureFlagType } from '@/types/FeatureFlagType.ts';
import { useStoreAdapter } from '@/adapters/useStoreAdapter.ts';

interface IFeatureFlagsStore {
    flags: FeatureFlagType;
    isUpdate: boolean
}

const featureFlagsStore = defineStore('flags', {
    state: (): IFeatureFlagsStore => ({
        flags: {},
        isUpdate: false
    }),
    actions: {
        setIsUpdate(newState: boolean) {
            this.isUpdate = newState;
        },
        setFlags(flags: FeatureFlagType) {
            this.setIsUpdate(false);

            this.flags = flags;

            this.setIsUpdate(true);
        }
    }
});

export const useFeatureFlagsStore = () => useStoreAdapter(featureFlagsStore());
