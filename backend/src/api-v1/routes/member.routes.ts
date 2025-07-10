import {Router} from "express"
import { activateMember, createMember, getMembers } from "../controllers/member.controllers"

const memberRouter = Router()

memberRouter.post("/members",createMember)
memberRouter.get("/members",getMembers)
memberRouter.put("/members/activate/:id",activateMember)

export default memberRouter
