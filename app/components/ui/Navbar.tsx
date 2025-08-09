'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenuGroup } from '@/components/ui/dropdown-menu'
import { useUser, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Loader2, LogOut, Monitor, Moon, Settings, Sun, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


export const Navbar = () => {
    // Ensure user is authenticated before rendering the navbar

    const { user, isLoaded } = useUser()
    const [query, setQuery] = useState('');
    const router = useRouter();


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/pins?search=${encodeURIComponent(query.trim())}`)
        } else {
            router.push('/pins');
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    return (
        <div>
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white shadow-sm">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <h1 className="text-xl font-bold text-red-600">Pictify</h1>
                    </Link>
                </div>
                <div className="flex-1 max-w-2xl mx-8">
                    <form onSubmit={handleSearch}>
                        <input
                            value={query}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Search for ideas"
                            className="w-full px-4 py-2 bg-gray-100 rounded-full border-none outline-none focus:bg-white focus:shadow-md"
                        />
                    </form>

                </div>
                <div className="flex gap-4">
                    <div className='flex items-center space-x-2'>
                        <SignedIn>
                            <ClerkLoading>
                                <Loader2 className="animate-spin" />
                            </ClerkLoading>
                            <ClerkLoaded>
                                <div className='flex items-center space-x-2'>
                                    {/* profile Dropdwon */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="flex items-center space-x-2">
                                                <UserButton />
                                                <span>{user?.fullName || user?.emailAddresses?.[0]?.emailAddress}</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56 " align='end' forceMount>
                                            <DropdownMenuLabel className='font-normal'>
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {user?.fullName}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/profile/post" className="flex items-center space-x-2">
                                                        <User className="w-4 h-4" />
                                                        <span>Profile</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/settings" className="cursor-pointer">
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        <span>Settings</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel>Theme</DropdownMenuLabel>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <Sun className="mr-2 h-4 w-4" />
                                                    <span>Light</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Moon className="mr-2 h-4 w-4" />
                                                    <span>Dark</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Monitor className="mr-2 h-4 w-4" />
                                                    <span>System</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <div className="cursor-pointer">
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    <SignOutButton>
                                                        <span>Log out</span>
                                                    </SignOutButton>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </ClerkLoaded>
                        </SignedIn>
                        <SignedOut>
                            <div className="flex items-center space-x-2">
                                <Button size="lg" variant="outline">
                                    <Link href='/auth/sign-in'>
                                        Sign in
                                    </Link>
                                </Button>
                                <Button size="lg">
                                    <Link href='/auth/sign-up'>
                                        Sign Up
                                    </Link>
                                </Button>

                            </div>
                        </SignedOut>
                    </div>
                </div>
            </header >
        </div >
    )
}

export default Navbar