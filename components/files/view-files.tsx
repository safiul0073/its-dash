"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { UploadCloud, Search, LayoutGrid, List } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import SingleFileCard from "./single-file-card";
import ninja from "@/public/images/files/imageninja.png";
import mountain from "@/public/images/files/imagemountain.png";
import temple from "@/public/images/files/imagetemple.jpg";
import ListFileCard from "./list-file-card";
import { Label } from "@/components/ui/label";
import { faker } from "@faker-js/faker";
import { FolderType } from "../libs/FileManager/Folder/Folder";
import { serverUrl } from "../libs/FileManager/config/constant";
import { Folders } from "../libs/FileManager/Folder/Folders";
import { Icon } from "@iconify/react";
import { FileUplaod } from "../libs/FileManager/File/FileUplaod";
import { CreateFolder } from "../libs/FileManager/Folder/CreateFolder";
export interface FileType {
  id: number;
  heading: string;
  path: string;
  file_path: string;
  size: number;
  date: string;
  ext: string;
  type: string;
}
// const files = [
//   {
//     id: faker.string.uuid(),
//     ext: "pdf",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "html",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "ai",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "fig",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "pdf",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "png",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//     file_path: ninja,
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "zip",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "html",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "ai",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "pdf",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "fig",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "png",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//     file_path: mountain,
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "html",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "png",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//     file_path: temple,
//   },
//   {
//     id: faker.string.uuid(),
//     ext: "zip",
//     heading: "DashTail UI Figma.pdf",
//     date: "6 Jan 2024",
//     size: "155MB",
//   },
// ];

// export type File = (typeof files)[number];
interface PropsType {
  OnSelectFile: (url: string) => void;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}
const ViewFiles: React.FC<PropsType> = ({ OnSelectFile, setOpen }) => {
  const [fileView, setFileView] = useState<"grid" | "list">("grid");
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

  const getFiles = async () => {
    const res = await fetch(`${serverUrl}/api/file-manager`);
    const data = await res.json();
    setFiles(data);
  };

  const getFolders = async () => {
    const res = await fetch(`${serverUrl}/api/folder-manager`);
    const data = await res.json();
    setFolders(data);
  };

  useEffect(() => {
    getFiles();
    getFolders();
  }, []);

  const currentFolderFiles = useMemo(() => {
    if (selectedFolder) {
      return files.filter(
        (file: FileType) => file.path === `${selectedFolder.path}/`
      );
    }
    return files;
  }, [selectedFolder, files]);
  return (
    <Card className="">
      <CardHeader className="mb-0 border-none p-6">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex-1 flex gap-2">
              {/* root folder goes here */}
            <Button size="icon" variant="outline" onClick={() => setSelectedFolder(null)}>
              <Icon icon="heroicons:home" className="h-4 w-4" />
            </Button>
            <CreateFolder getFolders={getFolders} />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              size="icon"
              variant="outline"
              className={cn("hover:bg-transparent  ", {
                "hover:border-primary hover:text-primary": fileView === "grid",
                "hover:border-muted-foreground hover:text-muted-foreground":
                  fileView !== "grid",
              })}
              color={fileView === "grid" ? "primary" : "secondary"}
              onClick={() => setFileView("grid")}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className={cn("hover:bg-transparent  ", {
                "hover:border-primary hover:text-primary": fileView === "list",
                "hover:border-muted-foreground hover:text-muted-foreground":
                  fileView !== "list",
              })}
              color={fileView === "list" ? "primary" : "secondary"}
              onClick={() => setFileView("list")}
            >
              <List className="h-5 w-5" />
            </Button>

            <div className="relative">
              <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 ltr:left-2 rtl:right-2 text-default-400" />
              <Input placeholder="Search File" className="ltr:pl-7 rtl:pr-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[124px]">
                <SelectValue placeholder="Image" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="file">File</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>

            {/* <Label htmlFor="fileUpload">
              <Button asChild>
                <span className="cursor-pointer flex items-center gap-1">
                  <UploadCloud className="h-4 w-4" />
                  Upload File{" "}
                </span>
              </Button>
              <Input type="file" className="hidden" id="fileUpload" />
            </Label> */}
            <FileUplaod getFiles={getFiles} selectedFolder={selectedFolder} />
            <button className="text-red-500" onClick={() => setOpen(false)}>
              <Icon icon="ep:close-bold" />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <div className="border border-gray-400 p-2">
            <Folders
              folders={folders}
              setSelectedFolder={setSelectedFolder}
              getFolders={getFolders}
            />
          </div>
          <div className="col-span-2 border border-gray-400 p-2">
            {fileView === "grid" && (
              <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                {currentFolderFiles?.map((item, i) => (
                  <SingleFileCard
                    item={item}
                    key={i}
                    getFiles={getFiles}
                    OnSelectFile={OnSelectFile}
                    setOpen={setOpen}
                  />
                ))}
              </div>
            )}
            {fileView === "list" && <ListFileCard files={currentFolderFiles} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewFiles;
