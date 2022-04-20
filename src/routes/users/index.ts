import { Router } from "express";
import { createUserController } from "../../controllers";
import { validateShape, validateAuth } from "../../middlewares";
import { createUserShape } from "../../shapes";

const userRouter = Router();

userRouter.post(
  '/',
  validateShape(createUserShape),
  createUserController
)

export default userRouter;