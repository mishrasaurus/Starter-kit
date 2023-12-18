import React from "react";
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import { Button, Title } from "@tremor/react";
import type { DialogProps } from "@mui/material";

interface Props extends Omit<DialogProps, "title"> {
  title: React.ReactNode;
  submitDisabled?: boolean;
  submitLabel?: string;
  onClose: () => void;
  onSubmit: () => void;
}

export default function Dialog(props: Props) {
  const {
    title,
    submitDisabled,
    submitLabel,
    onSubmit,
    onClose,
    ...dialogProps
  } = props;
  return (
    <MuiDialog {...dialogProps} onClose={onClose}>
      <Title className="py-4 px-6">{title}</Title>
      <Divider />
      <DialogContent>{props.children}</DialogContent>
      <Divider />
      <DialogActions className="py-4 px-6">
        <Button variant="secondary" className="mr-2" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={submitDisabled}
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {submitLabel || "Submit"}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
