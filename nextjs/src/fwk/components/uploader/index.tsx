import { FilePond, registerPlugin } from "react-filepond";
import type { FilePondProps } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginFileValidateType);

export default function Uploader(props: FilePondProps) {
  return <FilePond {...props} />;
}

export type { FilePondProps as UploaderProps };
