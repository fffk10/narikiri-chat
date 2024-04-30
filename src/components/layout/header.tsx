import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className='h-[70px] flex'>
      <div className='m-auto'>
        <p className='font-bold text-xl'>Narikiri Chat</p>
      </div>

      <div className='w-20 my-auto mr-4'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
