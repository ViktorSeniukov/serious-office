import {useRouter} from 'vue-router';
import { unref } from 'vue';
import { useFeatureFlags } from '@/features/useFeatureFlags.ts';

interface IUseQrCodeRedirectReturn {
    redirect: () => void;
}

export const useQrCodeRedirect = (): IUseQrCodeRedirectReturn => {
    const { data: flags } = useFeatureFlags();

    const router = useRouter();

    const redirect = () => {
        router.push({ path: String(unref(flags)?.qrcode_redirect) })
          .catch((error: Error) => {
              throw error;
          });
    };

    return {
        redirect
    };
};
