import { db } from '@/lib/db'
import { initialUser } from '@/lib/initial-user'
import { auth } from '@clerk/nextjs/server'

export const currentUser = async () => {
  const { userId } = auth()

  if (!userId) return null

  let user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    // 未登録だったらDB登録する
    user = await initialUser()
  }

  return user
}
