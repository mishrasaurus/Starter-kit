"use client";

import React from "react";
import { Icon } from "@tremor/react";
import { CogIcon } from "@heroicons/react/outline";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "./userProfile";
import Search from "./search";

type Link = {
  id: string;
  href: string;
  label: string;
};

const navLinks: Link[] = [
  { id: "dashboard", href: "/dashboard/all", label: "Dashboards" },
];

const AppBar = () => {
  const pathname = usePathname();

  const renderLink = (link: Link) => {
    const isActive = pathname.indexOf(link.id) === 1;
    return (
      <NextLink href={link.href} key={link.href}>
        <div
          className={`font-semibold px-3 py-1 rounded-full ${
            isActive ? "active selection" : "selection"
          } `}
        >
          {link.label}
        </div>
      </NextLink>
    );
  };
  return (
    <header className="bg-white flex pl-4 pr-6 py-3 space-x-2">
      <img alt="Home" className="w-28" src="/home.png" />

      <div className="flex items-center space-x-2 pt-1">
        {navLinks.map(renderLink)}
      </div>

      {/* Middle: Search input */}
      <div className="flex-grow flex items-center justify-center pl-2">
        <Search />
      </div>

      {/* Right side: User icons */}
      <div className="flex items-center space-x-2">
        <NextLink href={"/integrations"}>
          <Icon icon={CogIcon} size="md" color="gray" tooltip="Settings" />
        </NextLink>
        <UserProfile />
      </div>
    </header>
  );
};

export default AppBar;
