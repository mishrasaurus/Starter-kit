import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import Person from "@mui/icons-material/Person";

interface Props {
  src?: string;
  name?: string;
  size?: number;
}

const Avatar = (props: Props) => {
  const { size = 40, name } = props;
  const sizeStyle = {
    width: size,
    height: size,
    fontSize: Math.floor(size / 2),
  };

  if (props.src) {
    return <MuiAvatar src={props.src} sx={sizeStyle} />;
  }

  if (!name) {
    return (
      <MuiAvatar sx={sizeStyle}>
        <Person />
      </MuiAvatar>
    );
  }

  return (
    <MuiAvatar sx={{ ...sizeStyle, bgcolor: stringToColor(name) }}>
      {getInitial(name)}
    </MuiAvatar>
  );
};

function getInitial(name: string) {
  // pick first & last name from complete name
  const nameWithoutSpecialChars = name && name.replace(/[^\w\s]/gi, "");
  const names = nameWithoutSpecialChars
    ? nameWithoutSpecialChars
        .split(" ")
        .filter((_, i, arr) => i === 0 || i === arr.length - 1)
    : [];

  return names.length
    ? names.map((name) => name.charAt(0).toUpperCase()).join("")
    : "";
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default Avatar;
