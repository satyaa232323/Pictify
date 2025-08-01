import Content from '@/app/components/ui/Content'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const PostPins = () => {
    return (
        <div className="min-h-screen">
            <div className='flex gap-4 mb-6'>
                <Link href={'/create'}>
                    <Button variant="default">Create Post</Button>
                </Link>
            </div>
            <div className=''>
                <h1 className="text-2xl font-bold mb-1">My Posts</h1>
                <p className="text-gray-600 mb-4">Here are the posts you have created.</p>
            </div>
            <Content endpoint="/api/pins/me" />
        </div>
    )
}

export default PostPins
