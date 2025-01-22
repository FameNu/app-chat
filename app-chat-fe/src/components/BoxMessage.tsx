import Chat from '@/models/Chat'
import { useEffect, useState } from 'react'

function BoxMessage({ chat, currentUser }: { chat: Chat; currentUser: string }) {
  const [sideChat, setSideChat] = useState(
    currentUser === chat.username ? 'chat chat-end' : 'chat chat-start'
  )

  useEffect(() => {
    setSideChat(currentUser === chat.username ? 'chat chat-end' : 'chat chat-start')
  }, [currentUser, chat.username])

  return (
    <div className={sideChat}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div className="chat-header">{chat.username}</div>
      <div className="chat-bubble">{chat.message}</div>
      <div className="chat-footer opacity-50">Send</div>
    </div>
  )
}

export default BoxMessage
