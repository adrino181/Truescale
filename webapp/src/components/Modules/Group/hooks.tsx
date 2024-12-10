import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { createGroupAction } from "@/redux/guild";
import { startTransition } from "react";
export const UseCreateHook = () => {
  //const [loading, isLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { status, user, profileStatus } = useAppSelector((state) => state.auth);
  const { status: groupStatus } = useAppSelector((state) => state.group);
  const router = useRouter();

  const addGroupHandler = () => {
    console.log("posting group data");
    dispatch(createGroupAction());
  };

  const submitHandler = async (params) => {
    dispatch(createGroupAction(params));
  };

  useEffect(() => {
    if (status === "fulfilled" && groupStatus === "fulfilled") {
      startTransition(() => {
        router.push(`/${user.handle}`);
      });
    }
  }, [status]);

  return {
    groupStatus,
    submitHandler,
  };
};
