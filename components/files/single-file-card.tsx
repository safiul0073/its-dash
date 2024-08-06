"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import pdfi from "@/public/images/files/pdf.png";
import htmli from "@/public/images/files/html.png";
import zipi from "@/public/images/files/zip.png";
import figmai from "@/public/images/files/figma.png";
import aii from "@/public/images/files/ai.png";
import { Icon } from "@iconify/react";
import { FileType } from "./view-files";
import { serverUrl } from "../libs/FileManager/config/constant";
import { checkIsImage } from "@/utils/helper";
import { FileName } from "../libs/FileManager/File/FileName";
import { FileOptions } from "../libs/FileManager/File/FileOptions";
function getImageSource(ext: string) {
  switch (ext) {
    case "pdf":
      return pdfi;
    case "html":
      return htmli;
    case "ai":
      return aii;
    case "fig":
      return figmai;
    case "zip":
      return zipi;
    default:
      return null;
  }
}
interface PropsType {
  item: FileType;
  getFiles: () => void;
  OnSelectFile: (url: string) => void;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}
const SingleFileCard: React.FC<PropsType> = ({
  item,
  getFiles,
  OnSelectFile,
  setOpen
}) => {
  return (
    <div className="relative min-h-[164px] shadow-sm dark:border rounded hover:shadow-lg">
      {item.file_path && (
        <Image
          alt=""
          width={164}
          height={164}
          src={`${serverUrl}/${item.file_path}`}
          onClick={() => {
            OnSelectFile(`${serverUrl}/${item.file_path}`);
            setOpen(false);
          }}
          className={cn(
            "absolute top-0 left-0 h-[120px] w-full object-cover dark:border-none rounded cursor-pointer hover:border hover:horder-gray-300",
            {
              hidden: !checkIsImage(item.ext),
            }
          )}
        />
      )}
      <div className="p-6">
        <div
          className={cn("bg-card p-2.5 h-14 w-14 rounded mx-auto block", {
            hidden: checkIsImage(item.ext),
          })}
        >
          {!checkIsImage(item.ext) && (
            <Image
              alt=""
              onClick={() => OnSelectFile(`${serverUrl}/${item.file_path}`)}
              className="h-full w-full object-cover cursor-pointer hover:border hover:horder-gray-300"
              src={
                (item?.ext === "pdf" && pdfi) ||
                (item?.ext === "html" && htmli) ||
                (item?.ext === "ai" && aii) ||
                (item?.ext === "fig" && figmai) ||
                (item?.ext === "zip" && zipi) ||
                ""
              }
            />
          )}
        </div>

        <div
          className={cn("text-center mt-3", {
            "text-left mt-2.5 bottom-4 absolute left-4 z-20": checkIsImage(
              item.ext
            ),
          })}
        >
          <FileName file={item} getFiles={getFiles} />
          <p
            className={cn(
              "text-sm font-normal text-default-600 dark:text-primary-foreground",
              {
                "text-gray-600": checkIsImage(item.ext),
              }
            )}
          >
            <span>{item?.date}</span> / <span>{item?.size}</span>
          </p>
        </div>

        <div className="absolute  top-3 right-3 flex gap-1.5">
          <FileOptions file={item} getFiles={getFiles} />
        </div>
      </div>
    </div>
  );
};

export default SingleFileCard;
