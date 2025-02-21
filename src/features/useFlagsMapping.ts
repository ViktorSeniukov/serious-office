import type { IRequestFeatureFlag } from '@/types/IRequestFeatureFlag.ts';
import type { FeatureFlagType } from '@/types/FeatureFlagType.ts';

interface IUseFlagMappingReturn {
    map: (_flagsData: IRequestFeatureFlag[]) => FeatureFlagType
}

export const useFlagsMapping = (): IUseFlagMappingReturn => ({
    map: (flagsData: IRequestFeatureFlag[]): FeatureFlagType => {
        const flags: FeatureFlagType = {};
        flagsData.forEach((flag: IRequestFeatureFlag) => {
            flags[flag.feature.name as string] = flag.feature_state_value;
        });

        return flags;
    }
});
