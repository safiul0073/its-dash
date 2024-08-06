import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { public_instance } from "@/config/axios.config";
import { AxiosResponse } from "axios";
import { Input } from "@/components/ui/input";
import { serverUrl } from "../config/constant";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parent_id?: number | null;
  getFolders?: () => void;
}
export const Modal = ({
  open,
  setOpen,
  parent_id,
  getFolders,
}: ModalProps) => {
  const [newFolder, setNewFolder] = useState<string>("");
  const handleFileUpload = () => {
    public_instance
      .post(`${serverUrl}/api/folder-manager`, {
        name: newFolder,
        parent_id: parent_id,
      })
      .then((res: AxiosResponse) => {
        setOpen(false);
        if (getFolders) getFolders();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="xl">
        <DialogHeader>
          <DialogTitle>Create a Folder</DialogTitle>
          <DialogDescription>Give a folder name</DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <Input onChange={(e) => setNewFolder(e.target.value)} />
        </div>
        <DialogFooter className="flex justify-between">
          <Button>Cancel</Button>
          <Button onClick={handleFileUpload}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
