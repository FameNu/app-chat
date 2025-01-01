import { create } from 'zustand'
import type User from '@/models/User'
import { getCookie, setCookie, deleteCookie } from '@/services/cookie'

interface UserStore {
  currentUser: User | null
  userList: User[]
  getCookieUser: (keyOfCookie: 'user' | 'users') => Promise<User | User[] | null>
  loadUser: () => void
  setCurrentUser: (username: string) => void
  logoutUser: () => void
  clearUsers: () => void
}

// collect user list on local storage
// collect user (current user) on cookie

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  userList: [],
  getCookieUser: async (keyOfCookie): Promise<User | User[] | null> => {
    const userCookie: string | null = getCookie(keyOfCookie)
    if (!userCookie) {
      return null
    }
    return JSON.parse(userCookie)
  },
  loadUser: async () => {
    const user: User | null = await get().getCookieUser('user')
    if (user) {
      set({ currentUser: user })
    } else {
      set({ currentUser: null })
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    set({ userList: users })
  },
  setCurrentUser: (username: string) => {
    const userExist: number = get().userList.findIndex((user) => user.name === username)
    if (userExist === -1) {
      const newUser: User = {
        id: get().userList.length + 1,
        name: username,
        email: `${username}@mail.com`,
        enteredAt: new Date(),
        latestUserAt: new Date()
      }

      set({ currentUser: newUser })

      const users: User[] = [...get().userList, newUser]
      set({ userList: users })

      // save to cookie
      setCookie('user', JSON.stringify(newUser))
      localStorage.setItem('users', JSON.stringify(users))
    } else {
      const user: User = get().userList[userExist]
      user.latestUserAt = new Date()

      const users: User[] = [...get().userList]
      users[userExist] = user
      set({ userList: users })

      // save to cookie
      setCookie('user', JSON.stringify(user))
      localStorage.setItem('users', JSON.stringify(users))
    }
  },
  logoutUser: () => {
    deleteCookie('user')
    set({ currentUser: null })
  },
  clearUsers: () => {
    get().logoutUser()

    localStorage.removeItem('users')
    set({ userList: [] })
  }
}))