import { Flex } from "../../components/shared/core";
import { UserInfo } from "../../components/user/UserInfo";
import { ScreenLayout } from "../ScreenLayout";

export const UserPage = () => {
  return (
    <ScreenLayout withScrollView>
      <Flex justify={"center"}>
        <UserInfo />
      </Flex>
    </ScreenLayout>
  );
};
