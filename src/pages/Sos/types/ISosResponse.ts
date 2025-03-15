import type { ISosRequest } from '@/pages/Sos/types/ISosRequest.ts';

export interface ISosResponse {
  code: number
  message: string
  data?: ISosRequest
}
