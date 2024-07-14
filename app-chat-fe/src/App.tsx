import BoxListMessage from './components/BoxListMessage'
import Chat from './models/Chat'
import { useState } from 'react'

function App() {
  const [chats, setChats] = useState<Chat[]>([])

  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const updateMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const sendMessage = () => {
    if (username === '' || message === '') {
      alert('Please fill in the username and message')
      return
    }
    const newChat: Chat = {
      username: username,
      message: message
    }
    setChats([...chats, newChat])
    console.log(newChat)

    setMessage('')
  }

  return (
    <div className="flex flex-col gap-4 h-full">
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
        <label className="form-control w-full max-w-sm">
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
        <button className="btn" onClick={sendMessage}>
          Send
        </button>
      </div>
      <BoxListMessage chats={chats} username={username} />
    </div>
  )
}

export default App
