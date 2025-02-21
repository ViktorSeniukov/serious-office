export interface IFeatureFlags {
    qrcode_redirect: string
}

export type FeatureFlagType = IFeatureFlags | Record<string, unknown>
