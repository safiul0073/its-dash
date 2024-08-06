import Image from "next/image";
import React from "react";
import { FileType } from "./Files";
import { serverUrl } from "../config/constant";
interface PropsType {
    file: FileType;
    OnSelectFile: (url: string) => void;
}
export const FileSelect: React.FC<PropsType> = ({
  file,
  OnSelectFile
}) => {
  return (
    <div className="relative">
      <Image
        alt={file.heading}
        src={`${serverUrl}/${file.file_path}`}
        width={100}
        height={100}
      />
      <div onClick={() => OnSelectFile(`${serverUrl}/${file.file_path}`)} className="absolute top-0 left-0 w-[calc(100% - 2px)] h-[calc(100% - 2px)] bg-white opacity-50">
        Select
      </div>
    </div>
  );
};
