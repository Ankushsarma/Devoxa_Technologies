"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type UserRole = "client" | "developer" | "admin" | "manager" | null

interface User {
    id: string
    name: string
    email: string
    role: UserRole
    chatId?: string
}

interface AuthContextType {
    user: User | null
    role: UserRole
    loading: boolean
    login: (userData: User) => void
    logout: () => Promise<void>
    refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
    login: () => { },
    logout: async () => { },
    refresh: async () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const refresh = async () => {
        try {
            const res = await fetch("/api/auth/me")
            const data = await res.json()
            if (data.user) {
                setUser({
                    id: data.user._id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                    chatId: data.user.chatId,
                })
            } else {
                setUser(null)
            }
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refresh()
    }, [])

    const login = (userData: User) => {
        setUser(userData)
    }

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" })
        setUser(null)
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, role: user?.role || null, loading, login, logout, refresh }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
