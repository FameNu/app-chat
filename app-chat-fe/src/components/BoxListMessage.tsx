import BoxMessage from './BoxMessage'
import type Chat from '@/models/Chat'

function BoxListMessage({ chats, username }: { chats: Chat[]; username: string }) {
  return (
    <div className="flex flex-col gap-4 p-16 border rounded-xl h-4/6 overflow-y-auto">
      {chats.map((chat, index) => (
        <BoxMessage chat={chat} key={index} currentUser={username} />
      ))}
    </div>
  )
}

export default BoxListMessage
