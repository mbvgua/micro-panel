import { Router } from "express";
import {
  activateMember,
  createMember,
  deleteMember,
  getMembers,
  updateMember,
} from "../controllers/member.controllers";

const memberRouter = Router();

memberRouter.post("/members", createMember);
memberRouter.get("/members", getMembers);
memberRouter.put("/members/activate/:id", activateMember);
memberRouter.put("/members/update/:id", updateMember);
memberRouter.put("/members/delete/:id", deleteMember);

export default memberRouter;
