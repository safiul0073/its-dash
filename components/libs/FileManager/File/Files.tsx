import React from "react";
import Image from "next/image";
import { serverUrl } from "../config/constant";
import { convertByteToKB } from "@/utils/helper";
import { FileName } from "./FileName";
import { FileSelect } from "./FileSelect";
interface PropsType {
  files: FileType[];
  getFiles: () => void;
  OnSelectFile: (url: string) => void;
}

export interface FileType {
  id: number;
  heading: string;
  path: string;
  file_path: string;
  size: number;
  ext: string;
  type: string;
}
export const Files: React.FC<PropsType> = ({ files, getFiles, OnSelectFile }) => {
  return (
    <div className="p-2 grid grid-cols-3 gap-2">
      {files.map((file, index: number) => (
        <div
          className="w-full h-full hover:border-2 border-gray-300 flex flex-col justify-center items-center"
          key={index}
        >
          <FileSelect file={file} OnSelectFile={OnSelectFile} />
          <FileName file={file} getFiles={getFiles} />
          <p className="text-center text-[11px] font-mono">
            {convertByteToKB(file.size)}
          </p>
        </div>
      ))}
    </div>
  );
};
