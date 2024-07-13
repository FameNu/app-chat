import React from 'react'
import type Chat from '@/models/Chat'

function BoxMessage({ chats }: { chats: Chat[] }) {
  return (
    <div className='flex flex-col gap-4 p-16 border rounded-xl h-4/5 overflow-y-auto'>
        {chats.map((chat, index) => (
            <div key={index} className='flex gap-2'>
                <div className='font-bold'>{chat.username}</div>
                <div>{chat.message}</div>
            </div>
        ))}
    </div>
  )
}

export default BoxMessage