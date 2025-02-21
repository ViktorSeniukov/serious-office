import { useFeatureFlagsStore } from '@/stores/featureFlagsStore.ts';
import {useRouter} from 'vue-router';
import { unref } from 'vue';

interface IUseQrCodeRedirectReturn {
    redirect: () => void;
}

export const useQrCodeRedirect = (): IUseQrCodeRedirectReturn => {
    const {flags} = useFeatureFlagsStore();

    const router = useRouter();

    const redirect = () => {
        router.push({ path: String(unref(flags).qrcode_redirect) })
          .catch((error: Error) => {
              throw error;
          });
    };

    return {
        redirect
    };
};
