import { IProfileType } from "@/components/types"

type IMessage = {
  message: string,
  user: IProfileType,
  createdAt: string,
  updatedAt: string,
}

type IChatList = IMessage[]
