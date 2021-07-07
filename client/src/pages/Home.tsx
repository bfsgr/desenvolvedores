import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  IconButton,
  Img,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import devLogo from "../assets/images/desenvolvedoresLogo.svg";
import { DevCard } from "../components/DevCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/home.scss";

export function Home() {
  return (
    <Container maxW={"container.xl"}>
      <Flex
        margin="5"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Img src={devLogo} height="160" mt="4rem" />
        <Input placeholder="Pesquise um desenvolvedor" mt="48px" width="100%" />
        <Flex my="20px">
          <Button>Pesquisar</Button>
          <Button ml="8px" colorScheme="green">
            Adicionar
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="20px">
        <DevCard
          nome="Alan Turing"
          hobby="Quebrar códigos"
          sexo="M"
          data_nascimento={new Date("1912-06-11")}
          idade={112}
        />
      </SimpleGrid>
      <Flex direction="row" justifyContent="center" my={"4rem"}>
        <ButtonGroup className="pagination" alignItems="center">
          <IconButton
            icon={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
            aria-label={"Ir para a primeira página"}
          />
          <IconButton
            icon={<FontAwesomeIcon icon={faAngleLeft} />}
            aria-label={"Ir para página anterior"}
          />
          <Text>Página x de y</Text>
          <IconButton
            icon={<FontAwesomeIcon icon={faAngleRight} />}
            aria-label={"Ir para a próxima página"}
          />
          <IconButton
            icon={<FontAwesomeIcon icon={faAngleDoubleRight} />}
            aria-label={"Ir para a última página"}
          />
        </ButtonGroup>
      </Flex>
    </Container>
  );
}
