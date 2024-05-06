import { currentUser } from '@/lib/current-user'

export default async function SetupPage() {
  const user = await currentUser()

  return <div>SetupPage</div>
}
