import { fetchData } from "@/api/fetch-utils"

export async function getChats(): Promise<Response> {
  return await fetchData('chats')
}