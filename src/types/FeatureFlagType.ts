import { UiLoaderTypes } from '@/enums/UiLoaderTypes.ts';

export interface IFeatureFlags {
    qrcode_redirect: string
    ui_loader_type: UiLoaderTypes
    ui_loader_text: string
}

export type FeatureFlagType = IFeatureFlags
