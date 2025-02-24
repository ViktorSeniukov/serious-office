import { UiLoaderTypes } from '@/enums/UiLoaderTypes.ts';

export interface IFeatureFlags {
    qrcode_redirect: string
    ui_loader_type: UiLoaderTypes
    ui_loader_text: string
    is_show_poo_animate: boolean
    available_routes: string[]
}

export type FeatureFlagType = IFeatureFlags
