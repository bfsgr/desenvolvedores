import {
  Button,
  ButtonGroup,
  chakra,
  Container,
  Flex,
  Heading,
  IconButton,
  Img,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import devLogo from "../assets/images/desenvolvedoresLogo.svg";
import notFound from "../assets/images/not-found.svg";
import { DevCard } from "../components/DevCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/home.scss";
import { useHistory } from "react-router-dom";
import API from "../api";
import { FormEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type DeveloperResponse = {
  id: number;
  nome: string;
  hobby: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
};

type Developer = {
  id: number;
  nome: string;
  hobby: string;
  sexo: string;
  data_nascimento: Date;
  idade: number;
};

export function Home() {
  const LIMIT = 24;
  const [developers, setDevelopers] = useState<Developer[]>();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  const [currentSearch, setCurrentSearch] = useState("");

  const debounced = useDebouncedCallback(
    (value) => setCurrentSearch(value),
    450
  );

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    API.get("/developers", {
      params: {
        nome: currentSearch,
        page: page,
        limit: LIMIT,
      },
    })
      .then((res) => {
        setLoading(false);
        const parsedData: Developer[] = res.data.map(
          (rawDev: DeveloperResponse) => {
            return {
              id: rawDev.id,
              nome: rawDev.nome,
              sexo: rawDev.sexo,
              hobby: rawDev.hobby,
              idade: rawDev.idade,
              data_nascimento: new Date(rawDev.data_nascimento),
            };
          }
        );
        setDevelopers(parsedData);
        setTotalPages(res.headers["x-total-pages"]);
      })
      .catch(({ response }) => {
        setLoading(false);
        setTotalPages(1);
        if (response?.status === 404) {
          setDevelopers([]);
        }
      });
  }, [page, currentSearch, changed]);

  async function handleAdicionar() {
    history.push("/desenvolvedor/novo");
  }

  async function handleSearch(ev: FormEvent) {
    ev.preventDefault();
    debounced.cancel();
    setCurrentSearch(searchTerm);
  }

  function dataChanged() {
    setChanged(!changed);
  }

  return (
    <Container maxW={"container.xl"} height="100vh">
      <Flex
        margin="0 1.5em 1.5em 1.5em"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Img src={devLogo} height="160" mt="4rem" />
        <chakra.form width="100%" onSubmit={handleSearch}>
          <Input
            id="mainSearchInput"
            variant="filled"
            placeholder="Pesquise um desenvolvedor"
            mt="48px"
            width="100%"
            height="48px"
            bgColor="#FFF"
            value={searchTerm}
            onChange={(ev) => {
              setSearchTerm(ev.target.value);
              debounced(ev.target.value);
            }}
          />
          <Flex
            my="20px"
            fontFamily="Ubuntu"
            fontWeight="500"
            sx={{ gap: "8px" }}
            justifyContent="center"
            alignItems="center"
          >
            <Button colorScheme="green" onClick={handleAdicionar}>
              Adicionar
            </Button>
            <Button type="submit">Pesquisar</Button>
          </Flex>
        </chakra.form>
      </Flex>
      {loading ? (
        <Flex
          className="info-loading"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" color="primary.500" thickness="4px" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="20px">
          {developers?.map((dev) => {
            return (
              <DevCard
                key={dev.id}
                api_id={dev.id}
                nome={dev.nome}
                hobby={dev.hobby}
                data_nascimento={dev.data_nascimento}
                sexo={dev.sexo}
                idade={dev.idade}
                changedCallback={dataChanged}
              />
            );
          })}
        </SimpleGrid>
      )}
      {!loading && developers?.length === 0 && (
        <Flex
          className="info-loading"
          alignItems="center"
          justifyContent="center"
          direction="column"
          sx={{ gap: "16px" }}
        >
          <Img src={notFound} alt="Nenhum resultado encontrado" />
          <Heading size="lg">Ops! Parece que não há nada por aqui</Heading>
        </Flex>
      )}
      <Flex direction="row" justifyContent="center" my="4rem">
        <ButtonGroup className="pagination" alignItems="center">
          <IconButton
            onClick={() => setPage(1)}
            icon={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
            aria-label={"Ir para a primeira página"}
          />
          <IconButton
            onClick={() => {
              page > 1 && setPage(page - 1);
            }}
            icon={<FontAwesomeIcon icon={faAngleLeft} />}
            aria-label={"Ir para página anterior"}
          />
          <Text>{`Página ${page} de ${totalPages}`}</Text>
          <IconButton
            onClick={() => {
              page < totalPages && setPage(page + 1);
            }}
            icon={<FontAwesomeIcon icon={faAngleRight} />}
            aria-label={"Ir para a próxima página"}
          />
          <IconButton
            onClick={() => page !== totalPages && setPage(totalPages)}
            icon={<FontAwesomeIcon icon={faAngleDoubleRight} />}
            aria-label={"Ir para a última página"}
          />
        </ButtonGroup>
      </Flex>
      <Flex justifyContent="center">
        <Text color="gray.500" fontSize="sm">
          {new Date().getFullYear()} © Bruno Fusieger
        </Text>
      </Flex>
    </Container>
  );
}
