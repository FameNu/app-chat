import type User from "./User"
import type Chat from "./Chat"

export interface UserStore {
  currentUser: User | null
  userList: User[]
  loadUser: () => void
  setCurrentUser: (username: string) => void
  logoutUser: () => void
  clearUsers: () => void
}

export interface ChatStore {
  chats: Chat[]
  loadChats: () => void
}
