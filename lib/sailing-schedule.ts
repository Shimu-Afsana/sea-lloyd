import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { SCHEDULE_PDF_PATH } from '@/app/data/network/schedule-config'

export function isSailingScheduleAvailable() {
  return existsSync(join(process.cwd(), 'public', SCHEDULE_PDF_PATH.slice(1)))
}
