import type { Roles } from '@/router/enums/Roles.ts';

export interface IJWTPayload {
    iat: number
    exp: number
    username: string
    access_token: string
    roles: Roles[]
}
