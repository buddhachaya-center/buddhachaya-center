import { revalidatePath } from 'next/cache'

export function revalidatePublicCourses(): void {
  revalidatePath('/mm/courses')
  revalidatePath('/en/courses')
  revalidatePath('/de/courses')
}
