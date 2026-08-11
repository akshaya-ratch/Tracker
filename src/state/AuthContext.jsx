import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'ratch.auth.v1'

/** Hardcoded prototype login — not real security. */
export const HARDCODED_USER = {
  email: 'akshaya@ratch.ai',
  password: '1234',
  name: 'Akshaya',
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.email === HARDCODED_USER.email) return parsed
    return null
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession())

  const login = useCallback((email, password) => {
    const e = String(email || '').trim().toLowerCase()
    const p = String(password || '')
    if (e !== HARDCODED_USER.email.toLowerCase() || p !== HARDCODED_USER.password) {
      return { ok: false, error: 'Invalid email or password' }
    }
    const session = {
      email: HARDCODED_USER.email,
      name: HARDCODED_USER.name,
      at: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
