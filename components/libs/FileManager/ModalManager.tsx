import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileManager } from "./FileManager";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  OnSelectFile: (fileUrl: string) => void;
}
export const ModalManager = ({ open, setOpen, OnSelectFile }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="3xl">
        <DialogHeader>
          <DialogTitle>Create a Folder</DialogTitle>
          <DialogDescription>Give a folder name</DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <FileManager setOpen={setOpen} OnSelectFile={OnSelectFile} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
