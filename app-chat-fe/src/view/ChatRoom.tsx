import React, { useState, useEffect, useRef } from 'react'

import Chat from '@/models/Chat'
import User from '@/models/User'

import { getCookie, setCookie, deleteCookie } from '@/services/cookie'
import { useUserStore } from '@/store/userStore'

import BoxListMessage from '@/components/BoxListMessage'

const fetchChats = async () => {
  const response = await fetch('http://localhost:3000/chats')
  const data = await response.json()
  return data
}

const ChatRoom: React.FC = () => {
  const userStore = useUserStore()
  const currentUser: User | null = useUserStore((state) => state.currentUser)

  const [chats, setChats] = useState<Chat[]>([])
  
  useEffect(() => {
    const loadChats = async () => {
      const loadedChats: Chat[] = await fetchChats()
      setChats(loadedChats)
    }
    loadChats()
  }, [])

  const message = useRef<HTMLInputElement>(null)
  const username = useRef<HTMLInputElement>(null)

  const haveLoaded = useRef(false)

  useEffect(() => {
    if (!haveLoaded.current) {
      userStore.loadUser()
      haveLoaded.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendMessage = () => {
    if (currentUser?.name.trim() === '' || message.current?.value.trim() === '') {
      alert('Please fill in the username and message')
      return
    }
    const newChat: Chat = {
      username: currentUser!.name,
      message: message.current!.value,
    }
    setChats([...chats, newChat])
    console.log(newChat)

    setCookie('chats', JSON.stringify([...chats, newChat]))

    message.current!.value = ''
  }

  const clearChat = () => {
    setChats([])
    deleteCookie('chats')
  }

  const logCookieChats = () => {
    console.log(getCookie('chats'))
  }

  const updateUser = () => {
    if (username.current?.value.trim() === '') {
      alert('Please fill in the username')
      return
    }
    userStore.setCurrentUser(username.current!.value)

    // clear input
    username.current!.value = ''
    message.current!.focus()
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleEventSubmitForm = (fnAggrement: Function, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fnAggrement()
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-6">Welcome to u and me Chat Group</h1>
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
            ref={username}
          />
        </label>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
      <BoxListMessage chats={chats} username={currentUser?.name || ''} />
      <div className="flex items-end gap-4 mb-4 max-w-2xl">
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
              ref={message}
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
    </>
  )
}

export default ChatRoom
