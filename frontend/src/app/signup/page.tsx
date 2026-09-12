'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/Button';
import { CheckSquare, Zap, AlertCircle, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, signInDemo, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    const res = await signUp(email, password);
    if (res.success) {
      router.push('/dashboard');
    }
  };

  const handleDemoSignIn = () => {
    signInDemo();
    router.push('/dashboard');
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl neo-border-thick neo-shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#a3e635] text-black rounded-2xl neo-border-sm neo-shadow-sm flex items-center justify-center mx-auto mb-3">
            <CheckSquare className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs font-bold text-zinc-500 mt-1">
            Get your tasks done with zero friction
          </p>
        </div>

        {/* Quick Demo Bypass */}
        <div className="mb-6 p-3.5 bg-[#fde047]/40 rounded-2xl neo-border-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-black text-black">Instant Developer Mode</p>
              <p className="text-[11px] font-medium text-zinc-600">Skip email verification and test right away</p>
            </div>
            <Button
              type="button"
              variant="lime"
              size="sm"
              onClick={handleDemoSignIn}
              leftIcon={<Zap className="w-3.5 h-3.5" />}
            >
              Demo Mode
            </Button>
          </div>
        </div>

        {/* Form Error */}
        {(localError || error) && (
          <div className="mb-4 p-3 bg-red-100 rounded-xl neo-border-sm border-red-800 text-red-900 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{localError || error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-zinc-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 rounded-xl neo-border-sm text-sm font-bold text-black focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#a3e635]"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-zinc-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 rounded-xl neo-border-sm text-sm font-bold text-black focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#a3e635]"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-zinc-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 rounded-xl neo-border-sm text-sm font-bold text-black focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#a3e635]"
            />
          </div>

          <Button
            type="submit"
            variant="lime"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-2"
            rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
          >
            Create Free Account
          </Button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-xs font-bold text-zinc-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[#7c3aed] underline font-black">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
