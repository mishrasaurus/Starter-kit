"use client";
import React, { useState } from "react";
import { Icon, IconProps } from "@tremor/react";
import { TrashIcon } from "@heroicons/react/outline";

interface Props extends Omit<IconProps, "icon"> {
  icon?: IconProps["icon"];
}

export default function Delete(props: Props) {
  const icon = props.icon || TrashIcon;
  const [confirm, setConfirm] = useState(false);
  const { onClick, ...iconProps } = props;

  React.useEffect(() => {
    setTimeout(() => {
      setConfirm(false);
    }, 10000);
  }, [confirm]);

  if (confirm) {
    return (
      <Icon
        tooltip="Confirm Delete"
        icon={icon}
        className="text-red-500"
        onClick={onClick}
      />
    );
  }

  return <Icon {...iconProps} icon={icon} onClick={() => setConfirm(true)} />;
}
