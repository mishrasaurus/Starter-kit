"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Popover } from "@mui/material";
import Avatar from "@/fwk/components/avatar";

const UserProfile = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const user = session?.user;

  const openUserMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
    console.log(user); // console user details to get orgId for debug purposes
  };

  return user ? (
    <div className="flex flex-col">
      <div
        className="flex items-center cursor-pointer border hover:border-blue-500 hover:bg-blue-50 px-2 py-1 rounded-md box-border"
        onClick={openUserMenu}
      >
        <Avatar size={24} name={user.name} />
        <div className="ml-2 text-sm">{user.name}</div>
      </div>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="m-3">
          <Link href="/api/auth/signout">Logout</Link>
        </div>
      </Popover>
    </div>
  ) : null;
};

export default UserProfile;
