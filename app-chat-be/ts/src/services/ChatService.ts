import { Chat } from "@/model/Chat"
import { ENV_VALUES } from "@/constants/envLoader"

const APP_MODE: string = process.env.APP_MODE || ENV_VALUES.APP_MODE.DEV
const IS_DEV_MODE: boolean = APP_MODE === ENV_VALUES.APP_MODE.DEV

const defaultMockupChat: Chat[] = 
  IS_DEV_MODE
  ? [
    { username: 'Alice', message: 'Hello' },
    { username: 'Bob', message: 'Hi' },
  ] :
  []

export const getChats = (keyword: string = ''): Chat[] => {
  const chats: Chat[] = defaultMockupChat

  if (keyword) {
    return chats.filter(chat => chat.message.includes(keyword) || chat.username.includes(keyword))
  }

  return chats
}
