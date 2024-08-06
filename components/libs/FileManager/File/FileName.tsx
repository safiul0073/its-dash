"use client";
import { Input } from "@/components/ui/input";
import { public_instance } from "@/config/axios.config";
import React from "react";
import { serverUrl } from "../config/constant";
import { AxiosResponse } from "axios";
import { FileType } from "./Files";
import { cn } from "@/lib/utils";
import { checkIsImage } from "@/utils/helper";
interface PropsType {
  file: FileType;
  getFiles?: () => void;
}

interface FileRenameTypes {
  fileFullPath: string;
  fileName: string;
}
export const FileName: React.FC<PropsType> = ({
  file: { file_path: fileFullPath, heading: fileName, id, ext },
  getFiles,
}) => {
  const [fileRename, setFileRename] = React.useState<FileRenameTypes>({
    fileFullPath: "",
    fileName: "",
  });
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && fileRename.fileName) {
      if (fileRename.fileName === fileName) {
        setFileRename({
          fileFullPath: "",
          fileName: "",
        });
      }
      public_instance
        .post(`${serverUrl}/api/rename-file`, {
          newName: fileRename.fileName
            .concat(".")
            .concat(fileName.split(".")[1]),
          id,
        })
        .then((res: AxiosResponse) => {
          setFileRename({
            fileFullPath: "",
            fileName: "",
          });
          if (getFiles && typeof getFiles === "function") getFiles();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <React.Fragment>
      {fileFullPath === fileRename.fileFullPath ? (
        <Input
          value={fileRename.fileName}
          onKeyDown={handleKeyDown}
          onChange={(e) =>
            setFileRename({ ...fileRename, fileName: e.target.value })
          }
        />
      ) : (
        <p
          onClick={() =>
            setFileRename({
              fileFullPath: fileFullPath,
              fileName: fileName.split(".")[0],
            })
          }
          className={cn(
            "text-base font-medium text-default-800 dark:text-primary-foreground truncate",
            {
              "text-gray-600": checkIsImage(ext),
            }
          )}
        >
          {fileName}
        </p>
      )}
    </React.Fragment>
  );
};
