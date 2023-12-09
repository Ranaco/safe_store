import * as React from "react";
import type { NextRouter } from "next/router";
import { GoHome } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { IconType } from "react-icons";
import { Button } from "@nextui-org/react";

interface BottomNavbarProps {
  router: NextRouter;
}

interface BottomNavbarButtonProps {
  icon: IconType;
  router: NextRouter;
  label: string;
  path: string;
}

const BottomNavbarButton: React.FC<BottomNavbarButtonProps> = ({
  icon,
  router,
  label,
  path,
}) => {
  const isActive: boolean = path === router.pathname;
  return (
    <Button
      variant={`${!isActive ? "light" : "ghost"}`}
      className="flex flex-col items-center justify-center h-auto"
      onClick={() => {
        console.log(path);
        router.push(path);
      }}
    >
      <div>
        {React.createElement(icon, {
          size: 25,
          color: "black",
          "aria-label": label,
        })}
      </div>
      <span className="text-sm">{label}</span>
    </Button>
  );
};

const BottomNavbar: React.FC<BottomNavbarProps> = ({ router }) => {
  const tabs = [
    {
      icon: GoHome,
      label: "Home",
      path: "/",
    },
    {
      icon: CiSearch,
      label: "Search",
      path: "/search",
    },
    {
      icon: IoCartOutline,
      label: "Cart",
      path: "/cart",
    },
    {
      icon: LiaUser,
      label: "Profile",
      path: "/profile",
    },
  ];

  return (
    <div className="w-full h-[80px] shadow-md bg-nord1/30 backdrop-blur-md fixed bottom-0 flex flex-row items-center justify-between px-6">
      {tabs.map((tab, index) => {
        return (
          <BottomNavbarButton
            key={index}
            icon={tab.icon}
            router={router}
            path={tab.path}
            label={tab.label}
          />
        );
      })}
    </div>
  );
};

export default BottomNavbar;
