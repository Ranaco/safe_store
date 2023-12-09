import * as React from "react";
import { Card, Button, User } from "@nextui-org/react";
import { useAppContext } from "../_app";
import { useSDK } from "@metamask/sdk-react";

const Profile = () => {
  const { state } = useAppContext();
  const { account } = useSDK();

  return account ? (
    <div className="flex flex-col gap-4 w-full h-full mt-10 items-center justify-start">
      <Card className="w-[95%] h-[70px] flex justify-center items-start px-5">
        <User
          className=""
          name="Jane Doe"
          description={
            account.slice(0, 4) +
            "xxxxx" +
            account.slice(account.length - 5, account.length)
          }
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </Card>
      <Card className="w-full h-[100px] flex flex-col p-4">
        <span className="text-2xl text-gray-500">Orders</span>
        <span className="text-5xl">12</span>
      </Card>
    </div>
  ) : (
    <div></div>
  );
};

export default Profile;
