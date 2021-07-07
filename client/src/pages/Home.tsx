import {
  Button,
  Container,
  Flex,
  Grid,
  Img,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import devLogo from "../assets/images/desenvolvedoresLogo.svg";
import { DevCard } from "../components/DevCard";

export function Home() {
  return (
    <Container maxW="container.lg">
      <Flex
        margin="5"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Img src={devLogo} height="160" mt="8vh" />
        <Input placeholder="Pesquise um desenvolvedor" mt="48px" width="100%" />
        <Flex my="20px">
          <Button>Pesquisar</Button>
          <Button ml="8px" colorScheme="green">
            Adicionar
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={[1, null, 2]} spacing="20px">
        <DevCard />
        <DevCard />
        <DevCard />
        <DevCard />
        <DevCard />
        <DevCard />
        <DevCard />
        <DevCard />
      </SimpleGrid>
    </Container>
  );
}
