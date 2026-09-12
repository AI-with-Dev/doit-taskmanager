'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';
import { useTaskStore } from '../store/useTaskStore';
import { Button } from './Button';
import { CheckSquare, Plus, Menu, X, LogOut, User, BarChart3, LayoutDashboard, ListTodo, Info } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, initAuth, signInDemo } = useAuthStore();
  const { openCreateModal } = useTaskStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Tasks', href: '/tasks', icon: <ListTodo className="w-4 h-4" /> },
    { label: 'Productivity', href: '/productivity', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fcfbf9]/95 backdrop-blur-md border-b-[2.5px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-[#7c3aed] text-white rounded-xl neo-border neo-shadow-sm flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <CheckSquare className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tighter text-black">
              DO<span className="text-[#7c3aed]">.</span>IT
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-black tracking-wider uppercase bg-[#a3e635] text-black rounded-md neo-border-sm tilt-right">
              Gen-Z Pro
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm transition-all ${
                  isActive
                    ? 'bg-[#fde047] text-black neo-border-sm neo-shadow-sm font-black'
                    : 'text-zinc-700 hover:text-black hover:bg-black/5'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Auth Area */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Button
                variant="lime"
                size="sm"
                leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
                onClick={openCreateModal}
                className="hidden lg:inline-flex"
              >
                New Task
              </Button>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl neo-border-sm neo-shadow-sm text-xs font-bold text-black max-w-[180px] truncate">
                <User className="w-3.5 h-3.5 text-[#7c3aed]" />
                <span className="truncate">{user.email?.split('@')[0] || 'User'}</span>
              </div>

              <Button
                variant="white"
                size="sm"
                onClick={handleSignOut}
                leftIcon={<LogOut className="w-3.5 h-3.5" />}
                title="Sign Out"
              >
                Exit
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  signInDemo();
                  router.push('/dashboard');
                }}
                className="text-xs text-zinc-600 underline"
              >
                Quick Demo
              </Button>
              <Link href="/login">
                <Button variant="white" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl neo-border-sm bg-white text-black neo-shadow-sm"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Collapsible Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-[#fcfbf9] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm ${
                    isActive
                      ? 'bg-[#fde047] text-black neo-border-sm'
                      : 'text-zinc-800 hover:bg-black/5'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-black/10 flex flex-col gap-2">
            {user ? (
              <>
                <Button
                  variant="lime"
                  size="md"
                  leftIcon={<Plus className="w-4 h-4 stroke-[3]" />}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCreateModal();
                  }}
                  className="w-full"
                >
                  New Task
                </Button>
                <div className="flex items-center justify-between px-2 py-1 text-xs text-zinc-600 font-bold">
                  <span>Logged in as: {user.email}</span>
                </div>
                <Button
                  variant="white"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  leftIcon={<LogOut className="w-4 h-4" />}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="lime"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signInDemo();
                    router.push('/dashboard');
                  }}
                  className="w-full"
                >
                  Explore Demo
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="white" size="md" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
