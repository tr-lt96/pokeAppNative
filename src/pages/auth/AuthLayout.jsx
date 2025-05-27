import { Flex, useTheme, Card } from "../../components/shared/core";
import { ScreenLayout } from "../ScreenLayout";

export const AuthLayout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ScreenLayout withScrollView>
      <Flex
        w={"100%"}
        flex={1}
        mih={"100%"}
        direction="column"
        align="center"
        mt={theme.spacing(3)}
      >
        <Card maw={500} w={"100%"}>
          <Flex
            w={"100%"}
            direction="column"
            rowGap={theme.spacing(6)}
            px={theme.spacing(3)}
            py={theme.spacing(6)}
          >
            {children}
          </Flex>
        </Card>
      </Flex>
    </ScreenLayout>
  );
};
