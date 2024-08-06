import React from "react";
import { Folder, FolderType } from "./Folder";

interface PropsType {
  folders: FolderType[];
  setSelectedFolder: React.Dispatch<React.SetStateAction<FolderType | null>>;
  getFolders: () => void;
}
// const nullFolder =  {
//   id: 4554545,
//   name: "Root",
//   path: null,
//   parent_id: null,
//   childrens: []
// }
export const Folders = ({
  folders,
  setSelectedFolder,
  getFolders,
}: PropsType) => {
  return (
    <div className="flex flex-col">
      {/* <Folder
        key={7894375349543}
        {...nullFolder}
        setSelectedFolder={setSelectedFolder}
        getFolders={getFolders}
      /> */}
      {folders &&
        folders.map((folder) => (
          <Folder
            key={folder.id}
            {...folder}
            setSelectedFolder={setSelectedFolder}
            getFolders={getFolders}
          />
        ))}
    </div>
  );
};
