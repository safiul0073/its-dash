import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { FolderRenameTypes, FolderType } from "./Folder";
import { public_instance } from "@/config/axios.config";
import { serverUrl } from "../config/constant";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { Modal } from "./Modal";

interface PropsType extends FolderType {
  getFolders: () => void;
  setRename: React.Dispatch<React.SetStateAction<FolderRenameTypes | null>>;
}
export const FolderRightDropDownMenu = (props: PropsType) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const HandleFolderDelete = () => {
    public_instance
      .delete(`${serverUrl}/api/folder-manager/${props.id}`)
      .then((res: AxiosResponse) => {
        if (props.getFolders) props.getFolders();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon icon="heroicons:ellipsis-vertical" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setModalOpen(!modalOpen)}>
            <span>New Folder</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              props.setRename({
                ...props,
                newName: props.name,
              })
            }
          >
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={HandleFolderDelete}>
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal open={modalOpen} setOpen={setModalOpen} getFolders={props.getFolders} parent_id={props.id}  />
    </React.Fragment>
  );
};
