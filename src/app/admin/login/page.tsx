'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@bevvlen.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const supabase = createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center font-serif text-3xl font-bold tracking-tight text-black italic">
          Admin Portal
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-zinc-200 shadow-sm sm:rounded-sm sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-medium text-zinc-700 uppercase tracking-widest">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  disabled // Disabled because only the admin email is used
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-none border border-zinc-200 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-[#ff3355] focus:outline-none focus:ring-[#ff3355] sm:text-sm bg-zinc-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 uppercase tracking-widest">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-none border border-zinc-200 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-[#ff3355] focus:outline-none focus:ring-[#ff3355] sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-[#ff3355] text-xs">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-none border border-transparent bg-black py-2 px-4 text-xs font-medium text-white shadow-sm hover:bg-[#ff3355] focus:outline-none focus:ring-2 focus:ring-[#ff3355] focus:ring-offset-2 uppercase tracking-widest transition-colors"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
