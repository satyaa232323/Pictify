import BoardCard from '@/app/components/ui/BoardCard'
import React from 'react'

const Boards = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">My Boards</h1>
      <p className="text-gray-500 mt-2">Manage your boards and organize your pins.</p>

      <BoardCard/>
    </div>
  )
}

export default Boards
