import { useCookies } from '@vueuse/integrations/useCookies';
import {useJwt} from '@vueuse/integrations/useJwt.mjs';
import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';
import { unref } from 'vue';
import { Roles } from '@/router/enums/Roles.ts';
import type { IJWTPayload } from '@/router/types/IJWTPayload.ts';

export const authGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedLoaded,
    next: NavigationGuardNext,
    neededRoles?: string[]
) => {
    const cookies = useCookies();

    const token = cookies.get('access_token');

    const {payload} = useJwt<IJWTPayload>(token);

    const exp = unref(payload)?.exp;
    const roles = unref(payload)?.roles;

    if (Date.now() >= (exp || 0) * 1000) {
        return next('/login');
    }

    if (neededRoles && !(roles?.filter((role: Roles) => neededRoles?.includes(role)).length === neededRoles?.length)) {
        return next('/login');
    }

    return next();
};
