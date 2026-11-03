import { revalidatePath } from 'next/cache'

export function revalidatePublicPosts(): void {
  revalidatePath('/mm/teachings')
  revalidatePath('/en/teachings')
  revalidatePath('/de/teachings')
}
