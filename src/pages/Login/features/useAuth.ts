import type { ITgWidgetLogin } from '@/pages/Login/types/ITgWidgetLogin.ts';
import axios from 'axios';
import { BASE_API_URL } from '@/constants/baseUrl.ts';
import { useCookies } from '@vueuse/integrations/useCookies';
import router from '@/router';

export const useAuth = () => {
    const auth = async (user: ITgWidgetLogin) => {
        const cookies = useCookies();
        const query = new URLSearchParams(Object.entries(user)).toString();

        const {data} = await axios.get(`${BASE_API_URL}/auth?${query}`);

        cookies.set('access_token', data?.data?.access_token);

        return await router.push('/');
    };

    const authCb = (user: ITgWidgetLogin) => {
        try {
            auth(user);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        authCb
    };
};
