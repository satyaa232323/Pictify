'use client'

import { Toaster } from '@/components/ui/sonner'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function LayoutProfile({ children }: { children: React.ReactNode }) {
  const tabs = [
    { name: 'My Content', href: '/profile/post' },
    { name: 'Saves', href: '/profile/saves' },
  ]

  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        duration={3000}
        closeButton={false}
      />
      <div className="p-6">
        <h1 className="text-4xl font-semibold">My Profile</h1>
        <p className="text-gray-500 mt-2">Manage your profile settings and preferences.</p>

        {/* Tab Navigation ala Pinterest */}
        <div className="mt-10 flex gap-4">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
                <Link
                key={tab.name}
                href={tab.href}
                className={clsx(
                  'px-6 py-2 rounded-full text-lg font-semibold border transition duration-150',
                  isActive
                  ? 'text-white border-red-600 bg-red-600'
                  : 'text-gray-500 border-transparent hover:text-red-500 hover:border-red-200'
                )}
                >
                {tab.name}
                </Link>
            )
          })}
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  )
}
