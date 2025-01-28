import { Router } from "express"
import { getAllChats } from "@/controller/ChatController"

const router = Router()

router.get('/', getAllChats)

export default router
