import { revalidatePath } from 'next/cache'

export function revalidatePublicEvents(): void {
  revalidatePath('/mm/schedule')
  revalidatePath('/en/schedule')
  revalidatePath('/de/schedule')
}
