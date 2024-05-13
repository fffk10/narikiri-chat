'use client'

import { io, Socket } from 'socket.io-client'
import { createContext } from 'react'

export const socket = io(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`)
export const WebSocketContext = createContext<Socket>(socket)
export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  )
}
