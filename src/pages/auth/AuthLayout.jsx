import { Flex, useTheme, Card } from "../../components/shared/core";
import { ScreenLayout } from "../ScreenLayout";

export const AuthLayout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ScreenLayout>
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

// module.css
// .layout-container {
//     width: 100%;
//     min-height: 100vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 12px;
// }

// .form-card {
//     max-width: 500px;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     row-gap: 24px;
//     padding: 24px;
// }

// .form-header {
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     align-items: center;
// }

// .auth-link {
//     display: flex;
//     gap: 4px;
//     justify-content: center;
// }
