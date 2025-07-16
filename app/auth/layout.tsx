import React from 'react'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 p-4 md:p-8'>
      <div className='w-full max-w-md lg:max-w-lg flex-shrink-0 order-2 lg:order-1'>
        <div className="rounded-2xl  p-6 md:p-8">
          {children}
        </div>
      </div>
      <div className='text-center flex flex-col items-center justify-center min-h-[200px] lg:min-h-full order-1 lg:order-2 lg:flex-1 max-w-md lg:max-w-none'>
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600">Pictify</h1>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">Your creative idea hub</p>
          <p className="text-gray-500 text-xs md:text-sm lg:text-base">Sign in to explore and share your ideas</p>
        </div>
      </div>
    </div>
  )
}

