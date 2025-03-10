'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { supabase } from './supabase/client'
import { toast } from 'sonner'

type AuthContextType = {
  user: User | null
  loading: boolean
  error: AuthError | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  useEffect(() => {
    try {
      // Check active sessions and sets the user
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error) {
          console.error('Error fetching session:', error.message)
          setError(error)
          toast.error('Error fetching session')
        }
        setUser(session?.user ?? null)
        setLoading(false)
      })

      // Listen for changes on auth state (signed in, signed out, etc.)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
        setError(null)
      })

      return () => subscription.unsubscribe()
    } catch (err) {
      console.error('Error in auth setup:', err)
      setError(err as AuthError)
      setLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        setError(error)
        toast.error(error.message)
        throw error
      }
      toast.success('Check your email for the confirmation link')
    } catch (err) {
      console.error('Error in signUp:', err)
      throw err
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setError(error)
        toast.error(error.message)
        throw error
      }
      toast.success('Successfully signed in')
    } catch (err) {
      console.error('Error in signIn:', err)
      throw err
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setError(error)
        toast.error(error.message)
        throw error
      }
      toast.success('Successfully signed out')
    } catch (err) {
      console.error('Error in signOut:', err)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 