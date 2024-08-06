import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { public_instance } from "@/config/axios.config";
import { AxiosResponse } from "axios";
import { FolderType } from "../Folder/Folder";
import { serverUrl } from "../config/constant";
import { convertByteToKB } from "@/utils/helper";

interface ModalProps {
  open: boolean;
  file: File;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File|null>>;
  selectedFolder?: FolderType | null;
  getFiles?: () => void;
}
export const Modal: React.FC<ModalProps> = ({ open, setOpen, file, setSelectedFile, selectedFolder, getFiles}) => {

  const handleFileUpload = () => {
    public_instance
      .post(`${serverUrl}/api/file-manager`, {
        file: file,
        path: selectedFolder ? selectedFolder.path : "",
      })
      .then((res: AxiosResponse) => {
        setOpen(false);
        setSelectedFile(null);
        if (getFiles) getFiles();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="xl">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>Upload files to your account</DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            width={100}
            height={100}
          />
          <p>
            {file.name} - {convertByteToKB(file.size)}
          </p>
        </div>
        <DialogFooter className="flex justify-between">
          <Button>Cancel</Button>

          <Button onClick={handleFileUpload}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
