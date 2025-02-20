import { fetchFeutureFlags } from '@/features/fetchFeutureFlags.ts';
import { unref } from 'vue';

export const useQrCodeRedirect = (): string => {
  console.log('useQrCodeRedirect', unref(fetchFeutureFlags())?.find((item) => item?.feature.name === 'qrcode_redirect'));

  return '/';
};
