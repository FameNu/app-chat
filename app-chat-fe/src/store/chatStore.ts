import { create } from "zustand"

import { ChatStore } from "@/models/AllStore"

import { getChats } from "@/services/chatService"

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],

  loadChats: async () => {
    // fecth chats from server, and then call set
    const response: Response = await getChats()
    const data = await response.json()

    set({ chats: data })
  }
}))