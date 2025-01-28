import { Request, Response } from 'express'
import { getChats } from '@/services/ChatService'

export const getAllChats = (req: Request, res: Response) => {
  res.json(getChats(req.query.keyword as string))
}
