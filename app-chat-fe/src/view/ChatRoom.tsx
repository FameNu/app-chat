import React, { useState, useEffect } from 'react'

import Chat from '@/models/Chat'
import User from '@/models/User'

import { getCookie, setCookie, deleteCookie } from '@/services/cookie'
import { useUserStore } from '@/store/userStore'

import BoxListMessage from '@/components/BoxListMessage'

const ChatRoom: React.FC = () => {
  const userStore = useUserStore()
  const currentUser: User | null = useUserStore((state) => state.currentUser)

  const getChats: string | null = getCookie('chats')
  const loadChats: Chat[] = getChats ? JSON.parse(getChats) : []

  const [chats, setChats] = useState<Chat[]>(loadChats)

  const [message, setMessage] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const startLoad = () => {
      userStore.loadUser()
    }

    startLoad()
  })

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const updateMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const sendMessage = () => {
    if (currentUser?.name.trim() === '' || message.trim() === '') {
      alert('Please fill in the username and message')
      return
    }
    const newChat: Chat = {
      username: currentUser?.name || '',
      message: message
    }
    setChats([...chats, newChat])
    console.log(newChat)

    setCookie('chats', JSON.stringify([...chats, newChat]))

    setMessage('')
  }

  const clearChat = () => {
    setChats([])
    deleteCookie('chats')
  }

  const logCookieChats = () => {
    console.log(getCookie('chats'))
  }

  const updateUser = () => {
    userStore.setCurrentUser(username)
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleEventSubmitForm = (fnAggrement: Function, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fnAggrement()
  }

  return (
    <div className="flex flex-col gap-4 h-full w-10/12 mx-auto">
      <h1 className="text-2xl font-bold text-center my-6">Welcome to u and me Chat Group</h1>
      <h2>{currentUser?.name}</h2>
      <form
        className="flex items-end gap-4 max-w-sm"
        onSubmit={(e) => handleEventSubmitForm(updateUser, e)}
      >
        <label className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Enter your username</span>
          </div>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Type Here"
            onChange={updateUsername}
          />
        </label>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <div className="flex items-end gap-4">
        <form
          className="flex-grow flex items-end gap-4 max-w-sm"
          onSubmit={(e) => handleEventSubmitForm(sendMessage, e)}
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Enter your message</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Type Here"
              value={message}
              onChange={updateMessage}
            />
          </label>
          <button type="submit" className="btn">
            Send
          </button>
        </form>
        <button className="btn" onClick={clearChat}>
          Clear all Chat
        </button>
        <button className="btn" onClick={logCookieChats}>
          Get Log Chats
        </button>
      </div>
      <BoxListMessage chats={chats} username={currentUser?.name || ''} />
    </div>
  )
}

export default ChatRoom
