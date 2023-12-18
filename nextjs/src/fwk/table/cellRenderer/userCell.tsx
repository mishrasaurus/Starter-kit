import React from "react";
import Avatar from "@/fwk/components/avatar";

interface Props {
  name: string;
}

const UserCell = (props: Props) => {
  const name = props.name;

  return (
    <div className="flex items-center">
      <Avatar name={name} />
      <div className="ml-2">{name}</div>
    </div>
  );
};
export default UserCell;
