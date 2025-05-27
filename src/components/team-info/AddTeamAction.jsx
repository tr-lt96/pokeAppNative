import { useState } from "react";
import { Button, Modal } from "../shared/core";
import { AddTeamForm } from "./AddTeamForm";

export const AddTeamAction = () => {
  const [opened, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <>
      <Button radius={"md"} onPress={open}>
        Not enough team?
      </Button>
      <Modal title={"Create a new team"} opened={opened} onClose={close}>
        <AddTeamForm handleCloseModal={() => close()} />
      </Modal>
    </>
  );
};
