import BoxMessage from './BoxMessage'
import type Chat from '@/models/Chat'
import { useRef, useEffect } from 'react';

function BoxListMessage({ chats, username }: { chats: Chat[]; username: string }) {
  const boxlist = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (boxlist.current) {
      boxlist.current.scrollTop = boxlist.current.scrollHeight
    }
  }, [chats])

  return (
    <div ref={boxlist} className="flex flex-col gap-4 p-16 border rounded-xl h-4/6 overflow-y-auto">
      {chats.map((chat, index) => (
        <BoxMessage chat={chat} key={index} currentUser={username} />
      ))}
    </div>
  )
}

export default BoxListMessage
