import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import React from "react";
import { FileType } from "./Files";
import { public_instance } from "@/config/axios.config";
import { serverUrl } from "../config/constant";
import { AxiosResponse } from "axios";

interface PropsType {
    file: FileType;
    getFiles: () => void;
}
export const FileOptions:React.FC<PropsType> = ({file, getFiles}) => {
    const deleteFile = () => {
        alert("Are you sure you want to delete this file?");
        public_instance
        .delete(`${serverUrl}/api/file-manager/${file.id}`)
        .then((res: AxiosResponse) => {
          if (getFiles && typeof getFiles === "function") getFiles();
        })
        .catch((err) => {
          console.error(err);
        });
    }
    const downloadFile = () => {
        
    }
  return (
    <React.Fragment>
      <Button onClick={() => downloadFile()} size="icon" variant="outline" className=" h-6 w-6">
        <Icon icon="heroicons:arrow-down-tray" className=" h-4 w-4  " />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className=" h-6 w-6"
        color="destructive"
        onClick={() => deleteFile()}
      >
        <Icon icon="heroicons:trash" className=" h-4 w-4  " />
      </Button>
    </React.Fragment>
  );
};
