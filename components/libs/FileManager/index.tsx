"use client";

import React, { useState } from "react";

import { FileManager } from "./FileManager";

const FileManagers = ({OnSelectFile}: {OnSelectFile: (url: string) => void}) => {
    const [open, setOpen] = useState(false);

  return (
    <div className="w-full relative">
      <button onClick={() => setOpen(!open)}>
        Open file manager
      </button>
      {
        open && <FileManager setOpen={setOpen} OnSelectFile={OnSelectFile} />
      }
    </div>
  );
};

export default FileManagers;
