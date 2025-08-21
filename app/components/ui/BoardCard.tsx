import Image from 'next/image'
import React from 'react'

const BoardCard = () => {
    const images = [
        'https://picsum.photos/300/400?random=1',
        'https://picsum.photos/300/400?random=2',
        'https://picsum.photos/300/400?random=3',
        'https://picsum.photos/300/400?random=4',
    ]

    return (
        <div className='w-64 rounded-xl overflow-hidden shadow hover:shadow-lg transition'>
            <div className='grid grid-cols-2 grid-rows-2 h-40'>
                {images.slice(0, 4).map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt='images'
                        width={20}
                        height={20}
                        className='object-cover w-full h-full'
                    />
                ))}
            </div>
            <div className='p-5'>
                <h2 className='text-2xl font-semibold '>Batukam</h2>
            </div>

        </div>
    )
}

export default BoardCard
