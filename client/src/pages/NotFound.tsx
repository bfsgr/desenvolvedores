import { Button, Flex, Heading, Img } from "@chakra-ui/react";
import notFound from "../assets/images/not-found.svg";
import { useHistory } from "react-router-dom";

export function NotFound() {
  const history = useHistory();
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={{ gap: "32px" }}
      mx="32px"
    >
      <Img src={notFound} alt="Não encontrado" />
      <Heading>Ops! Não encontramos o que você queria :(</Heading>
      <Button onClick={() => history.push("/")}>Voltar</Button>
    </Flex>
  );
}
