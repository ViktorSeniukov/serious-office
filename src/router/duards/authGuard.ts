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
    neededRoles?: Roles[]
) => {
    const cookies = useCookies();

    const token = cookies.get('access_token');

    if (!token) {
        return next({
            path: '/login',
            query: {
                redirectTo: to.fullPath
            }
        });
    }

    const {payload} = useJwt<IJWTPayload>(token);

    const exp = unref(payload)?.exp;
    const roles = unref(payload)?.roles;

    if (Date.now() >= (exp || 0) * 1000) {
        return next({
            path: '/login',
            query: {
                redirectTo: to.fullPath
            }
        });
    }

    if (!neededRoles || neededRoles.length === 0) {
        return next();
    }

    const hasRequiredRoles = neededRoles.every((role) => roles?.includes(role));

    if (!hasRequiredRoles) {
        return next({
            path: '/access-define',
            query: {
                redirectTo: to.fullPath
            }
        });
    }

    return next();
};
