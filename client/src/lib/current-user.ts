import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

export const currentUser = async () => {
  const { userId } = auth()

  if (!userId) return null

  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    // 未登録だったら登録する
  }

  return user
}
