import type { ToiletTypes } from '@/pages/Sos/enums/ToiletTypes.ts'
import type { SosRequestTypes } from '@/pages/Sos/enums/SosRequestTypes.ts'

export interface ISosRequest {
  toiletType: ToiletTypes
  roomNumber: number
  request: SosRequestTypes
  message: string
}
