import React from "react";
import { useFormik } from "formik";
import { TextInput, Textarea } from "@tremor/react";
import Dialog from "@/fwk/components/dialog";
import { snakeCaseToWords } from "@/fwk/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

const DashboardForm: React.FC<Props> = ({ isOpen, onAdd, onClose }) => {
  const formik = useFormik({
    initialValues: {
      label: "",
      description: "",
      type: types[0],
    },

    onSubmit: async (values) => {
      fetch("/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: values.label,
          description: values.description,
        }),
      })
        .then((res) => res.json())
        .then((dashboard) => {
          onAdd(dashboard);
          onClose();
        });
    },
  });

  return (
    <Dialog
      title="Add Dashboard"
      fullWidth
      maxWidth="sm"
      open={isOpen}
      submitDisabled={!formik.values.label}
      onClose={onClose}
      onSubmit={formik.handleSubmit}
    >
      <div>
        <div>Name</div>
        <TextInput
          name="label"
          placeholder="Enter name"
          value={formik.values.label}
          onChange={formik.handleChange}
        />
        <br />
        <div>Description</div>
        <Textarea
          name="description"
          placeholder="Enter description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </div>
    </Dialog>
  );
};

export default DashboardForm;
