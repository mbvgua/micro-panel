import {Router} from "express"
import { createMember } from "../controllers/member.controllers"

const memberRouter = Router()

memberRouter.post("/members",createMember)
//memberRouter.get("/members",createMember)

export default memberRouter
