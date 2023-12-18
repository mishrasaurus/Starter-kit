import React from "react";
import Link from "next/link";
import { Add } from "@mui/icons-material";
import { ViewList, GridView } from "@mui/icons-material";
import { Button, Title, Subtitle } from "@tremor/react";

interface Props {
  title: React.ReactNode;
  subtitle?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  currentView?: View;
  onViewChange?: (view: View) => void;
}

export enum View {
  Card = "card",
  List = "list",
}

export default function ModuleHeader(props: Props) {
  const { action } = props;
  const isCardView = props.currentView === View.Card;

  return (
    <div className="flex justify-between">
      <div>
        <Title>{props.title}</Title>
        {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
      </div>
      <div className="flex flex-row gap-x-3">
        {props.onViewChange && (
          <Button
            variant="secondary"
            size="xs"
            icon={isCardView ? ViewList : GridView}
            onClick={() =>
              props.onViewChange?.(isCardView ? View.List : View.Card)
            }
          >
            {isCardView ? "List" : "Card"}
          </Button>
        )}
        {action && (
          <Button
            variant="primary"
            size="xs"
            icon={Add}
            //href={action.href}
            onClick={action.onClick}
          >
            {action.href ? (
              <Link href={action.href}>{action.label}</Link>
            ) : (
              action.label
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
