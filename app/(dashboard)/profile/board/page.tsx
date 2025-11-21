import BoardCard from '@/app/components/ui/BoardCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Boards = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex gap-4 mb-6'>
        <Link href={'/profile/post/board'}>
          <Button variant="default">Create Board</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold">My Boards</h1>
      <p className="text-gray-500 mt-2">Manage your boards and organize your pins.</p>
      <BoardCard />
    </div>
  )
}

export default Boards
