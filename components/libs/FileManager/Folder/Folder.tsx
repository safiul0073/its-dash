"use client";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { FolderRightDropDownMenu } from "./FolderRightDropDownMenu";
import { Input } from "@/components/ui/input";
import { public_instance } from "@/config/axios.config";
import { serverUrl } from "../config/constant";
import { AxiosResponse } from "axios";

export interface FolderType {
  id: number;
  name: string;
  path?: string|null;
  parent_id: number | null;
  childrens: FolderType[];
}

interface PropsType extends FolderType {
  setSelectedFolder: React.Dispatch<React.SetStateAction<FolderType | null>>;
  getFolders: () => void;
}

export interface FolderRenameTypes extends FolderType {
  newName: string;
}

export const Folder = (folder: PropsType) => {
  const [isOpen, setIsOpen] = useState(true);
  const [rename, setRename] = useState<FolderRenameTypes | null>(null);
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && rename) {
      public_instance
        .post(`${serverUrl}/api/folder-manager/${rename.id}`, {
          name: rename.newName,
          _method: "PUT",
        })
        .then((res: AxiosResponse) => {
          setRename(null);
          if (folder.getFolders && typeof folder.getFolders === "function") folder.getFolders();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-2">
      <div
        className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer font-mono text-sm "
        onClick={() => folder.setSelectedFolder(folder)}
      >
        <div className="flex items-center">
          <div onClick={toggle}>
            {isOpen ? (
              <Icon icon="heroicons:chevron-down" />
            ) : (
              <Icon icon="heroicons:chevron-right" />
            )}
          </div>
          <span className="mr-2 text-blue-500">{isOpen ? "📂" : "📁"}</span>
          <span className="font-medium text-gray-800">
            {/* if rename is null then show folder name else show edit input */}
            {rename ? (
              <Input
                type="text"
                value={rename.newName}
                onChange={(e) =>
                  setRename({ ...rename, newName: e.target.value })
                }
                onKeyDown={handleKeyDown}
                className="border border-gray-300 rounded p-1"
              />
            ) : (
              folder.name
            )}
          </span>
        </div>
        {/* Dot icon for folders */}
        <div>
          <FolderRightDropDownMenu {...folder} setRename={setRename} />
        </div>
      </div>
      {isOpen && folder.childrens.length > 0 && (
        <div className="pl-4 mt-1 border-l-2 border-gray-200">
          {folder.childrens.map((child: any) => (
            <Folder
              {...child}
              key={child.id}
              setSelectedFolder={folder.setSelectedFolder}
              getFolders={folder.getFolders}
              setRename={setRename}
            />
          ))}
        </div>
      )}
    </div>
  );
};
