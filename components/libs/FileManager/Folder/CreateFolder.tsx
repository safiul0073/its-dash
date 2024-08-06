import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { Modal } from "./Modal";

interface ModalProps {
  getFolders: () => void;
  parent_id?: number | undefined | null;
}
export const CreateFolder = ({ getFolders, parent_id }: ModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setModalOpen(!modalOpen)}>Create Folder</Button>
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        parent_id={parent_id}
        getFolders={getFolders}
      />
    </>
  );
};
