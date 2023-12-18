import React from "react";
import UserList from "./userList";
import ModuleHeader from "@/components/moduleHeader";

export default async function User() {
  return (
    <div className="w-full p-8">
      <div className="pb-8">
        <ModuleHeader
          title="Users"
        />
      </div>
      <UserList />
    </div>
  );
}
