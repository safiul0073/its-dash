import React from "react";
import ViewFiles from "@/components/files/view-files";

interface PreviewLayoutProps {
  setOpen: (value: React.SetStateAction<boolean>) => void;
  OnSelectFile: (url: string) => void;
}
export const FileManager = ({ setOpen, OnSelectFile }: PreviewLayoutProps) => {
  return (
    <div className="absolute top-0 left-0">
      <ViewFiles OnSelectFile={OnSelectFile} setOpen={setOpen} />
    </div>
  );
};
