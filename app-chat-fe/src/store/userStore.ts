import { create } from 'zustand'
import type User from '@/models/User'
import { getCookie, setCookie, deleteCookie } from '@/services/cookie'

interface UserStore {
  currentUser: User | null
  userList: User[]
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
  loadUser: async () => {
    const user: User | null = JSON.parse(getCookie('user') || 'null')
    set({ currentUser: user })

    const users: User[] | [] = JSON.parse(localStorage.getItem('users') || '[]')
    set({ userList: users })
  },
  setCurrentUser: (username: string) => {
    const userExist: number = get().userList.findIndex((user) => user.name === username)
    if (userExist === -1) {
      set((state) => {
        const newUser: User = {
          id: state.userList.length + 1,
          name: username,
          email: `${username}@mail.com`,
          enteredAt: new Date(),
          latestUserAt: new Date()
        }

        const updateUserList: User[] = [...state.userList, newUser]

        setCookie('user', JSON.stringify(newUser))
        localStorage.setItem('users', JSON.stringify(updateUserList))

        return {
          currentUser: newUser,
          userList: updateUserList
        }
      })
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