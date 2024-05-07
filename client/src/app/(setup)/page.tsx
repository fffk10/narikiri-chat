import { currentUser } from '@/lib/current-user'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function SetupPage() {
  const user = await currentUser()

  if (!user) return auth().redirectToSignIn()

  return redirect('/home')
}
