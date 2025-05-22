import { Button } from "../shared/core";
// import { AddTeamForm } from "./AddTeamForm";
// import { useDisclosure } from "@mantine/hooks";
// import { IconPlus } from "@tabler/icons-react";
// import { Text } from "../shared/core";

export const AddTeamAction = () => {
  // const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button radius={"md"} onPress={() => {}}>
        Not enough team?
      </Button>
      {/* <Modal
        title={<Text variant="heading-md-strong">Create a new team</Text>}
        opened={opened}
        onClose={close}
        withCloseButton
      >
        <AddTeamForm handleCloseModal={() => close()} />
      </Modal> */}
    </>
  );
};
