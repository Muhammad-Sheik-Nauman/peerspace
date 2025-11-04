'use client';

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Home, MessageSquare, Clock, Info, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#111] border-r border-gray-800 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <Link href="/dashboard" className="text-2xl font-bold text-yellow-400">
          PeerSpace
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {[
          { href: '/dashboard', icon: Home, label: 'Home' },
          { href: '/dashboard/my-posts', icon: MessageSquare, label: 'My Posts' },
          { href: '/dashboard/ai-history', icon: Clock, label: 'AI History' },
          { href: '/dashboard/about', icon: Info, label: 'About Us' },
          { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
        ].map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 hover:bg-[#1a1a1a] rounded-lg p-2 transition"
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-300">My Account</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
