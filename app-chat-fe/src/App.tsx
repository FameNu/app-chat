import BoxListMessage from './components/BoxListMessage'
import Chat from './models/Chat'
import { setCookie, getCookie, deleteCookie } from './services/cookie'
import { useState } from 'react'

function App() {
  const getChats: string | null = getCookie('chats')
  const loadChats: Chat[] = getChats ? JSON.parse(getChats) : []

  const [chats, setChats] = useState<Chat[]>(loadChats)

  const [message, setMessage] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const updateMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const sendMessage = () => {
    if (username.trim() === '' || message.trim() === '') {
      alert('Please fill in the username and message')
      return
    }
    const newChat: Chat = {
      username: username,
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

  return (
    <div className="flex flex-col gap-4 h-full w-10/12 mx-auto">
      <h1 className="text-2xl font-bold text-center my-6">Welcome to u and me Chat Group</h1>
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
      <div className="flex items-end gap-4">
        <form className="flex-grow flex items-end gap-4 max-w-sm" onSubmit={sendMessage}>
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
      <BoxListMessage chats={chats} username={username} />
    </div>
  )
}

export default App
