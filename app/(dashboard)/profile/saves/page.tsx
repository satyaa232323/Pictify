import Content from '@/app/components/ui/Content'
import React from 'react'

const Saves = () => {
  return (
    <div className="min-h-screen">
      <div className=''>
        <h1 className="text-2xl font-bold mb-1">My Saves</h1>
        <p className="text-gray-600 mb-4">Here are the Save you have been saved.</p>
      </div>
      <Content endpoint="/api/save" />
      {/* <Content endpoint="/api/pins" /> */}
      {/* <Content endpoint="/api/saves" /> */}
    </div>
  )
}

export default Saves
