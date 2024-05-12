import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export const initialUser = async () => {
  const user = await currentUser()

  if (!user) return auth().redirectToSignIn()

  const existUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  })

  if (existUser) return existUser

  const newUser = await db.user.create({
    data: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  })

  return newUser
}
