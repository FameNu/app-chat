import { create } from 'zustand'
import type User from '@/models/User'
import { UserStore } from '@/models/AllStore'

import { getCookie, setCookie, deleteCookie } from '@/services/cookie'

// collect user list on local storage
// collect user (current user) on cookie

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  userList: [],
  loadUser: async () => {
    const user: User | null = JSON.parse(getCookie('user') || 'null')
    set({ currentUser: user })

    const users: User[] | [] = JSON.parse(localStorage.getItem('users') || '[]')
    set({ userList: users })
  },
  setCurrentUser: (username: string) => {
    set((state) => {
      const userExistOnIndex: number = state.userList.findIndex((user) => user.name.toLowerCase() === username.toLowerCase())
      let currentUser: User | null = null
      let updateUserList: User[] = []
      
      if (userExistOnIndex === -1) {
        currentUser = {
          id: state.userList.length + 1,
          name: username,
          email: `${username}@mail.com`,
          enteredAt: new Date(),
          latestUserAt: new Date()
        }

        updateUserList = [...state.userList, currentUser]
      } else {
        updateUserList = state.userList.map((user, index) => {
          return index === userExistOnIndex
            ? { ...user, latestUserAt: new Date() }
            : user
        })

        currentUser = updateUserList[userExistOnIndex]
      }

      setCookie('user', JSON.stringify(currentUser))
      localStorage.setItem('users', JSON.stringify(updateUserList))

      return {
        currentUser,
        userList: updateUserList
      }
    })
  },
  logoutUser: () => {
    deleteCookie('user')
    set({ currentUser: null })
  },
  clearUsers: () => {
    deleteCookie('user')
    localStorage.removeItem('users')

    set({
      currentUser: null,
      userList: []
    })
  }
}))