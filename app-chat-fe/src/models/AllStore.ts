import type User from "./User"

export interface UserStore {
  currentUser: User | null
  userList: User[]
  loadUser: () => void
  setCurrentUser: (username: string) => void
  logoutUser: () => void
  clearUsers: () => void
}
