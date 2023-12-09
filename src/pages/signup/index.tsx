import * as React from "react";
import { UserTypeEnum, UserType } from "@/lib/types/user";
import { useSDK } from "@metamask/sdk-react";
import { Input, Button, Switch } from "@nextui-org/react";
import Image from "next/image";

const Signup = () => {
  const [formState, setFormState] = React.useState({
    name: "",
    shopName: "",
    shopAddress: "",
  });

  const { account } = useSDK();

  const [isOwner, setIsOwner] = React.useState<UserTypeEnum>(
    UserTypeEnum.CUSTOMER,
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedData: UserType = {
      name: formState.name,
      shopAddress: formState.shopAddress,
      shopName: formState.shopName,
      type: isOwner,
      orders: [],
      address: String(account),
    };

    const res = await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify(parsedData),
    });

    if (res.ok) {
      const parsedData = await res.json();
      const cid = parsedData.data.Hash;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((val) => ({ ...val, [e.target.name]: e.target.value }));

  return (
    <div className="h-screen w-screen flex flex-col gap-10 items-center py-5">
      <span className="text-5xl font-bold">Login</span>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full px-5">
        <div className="flex flex-col gap-2">
          <span>Name</span>
          <Input
            name="name"
            value={formState.name}
            placeholder="Name"
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <span>Are you a shop owner?</span>
          <Switch
            isSelected={isOwner == UserTypeEnum.CUSTOMER}
            onValueChange={() =>
              isOwner === UserTypeEnum.CUSTOMER
                ? setIsOwner(UserTypeEnum.OWNER)
                : setIsOwner(UserTypeEnum.CUSTOMER)
            }
          />
        </div>
        {isOwner ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mt-4">
              <span>Enter your shop name.</span>
              <Input
                value={formState.shopName}
                name="shopName"
                placeholder="Shop Name"
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span>Enter your shop address.</span>
              <Input
                value={formState.shopAddress}
                name="shopAddress"
                placeholder="Shop Address"
                onChange={onChange}
              />
            </div>
          </div>
        ) : undefined}
        <Button
          type="submit"
          variant="ghost"
          size="lg"
          className="text-lg rounded-md bg-white/50"
        >
          <Image
            src="/images/metamask-logo.svg"
            height={50}
            width={140}
            alt={"Metamask logo"}
          />
        </Button>
      </form>
    </div>
  );
};

export default Signup;
