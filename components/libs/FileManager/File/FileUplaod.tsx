import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Modal } from "./Modal";
import { FolderType } from "../Folder/Folder";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
interface PropsType {
  getFiles: () => void;
  selectedFolder: FolderType | null;
}
export const FileUplaod: React.FC<PropsType> = ({ getFiles, selectedFolder }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFile(files[0]);
    }
    setModalOpen(!modalOpen);
  };
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Label htmlFor="fileUpload">
        <Button asChild>
          <span className="cursor-pointer flex items-center gap-1">
            <UploadCloud className="h-4 w-4" />
            Upload File{" "}
          </span>
        </Button>
        <Input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileUpload"
        />
      </Label>
      {/* <Button onClick={() => fileInputRef.current?.click()}>
        Upload files
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      /> */}
      {selectedFile && modalOpen && (
        <Modal
          open={modalOpen}
          setOpen={setModalOpen}
          file={selectedFile}
          setSelectedFile={setSelectedFile}
          selectedFolder={selectedFolder}
          getFiles={getFiles}
        />
      )}
    </>
  );
};
