import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Stack,
  RadioGroup,
  Radio,
  Flex,
  Button,
  Img,
  Heading,
  Text,
  chakra,
  Spinner,
} from "@chakra-ui/react";

import illustration from "../assets/images/illustration.svg";
import logo from "../assets/images/desenvolvedoresLogo.svg";
import { useHistory, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import API from "../api";
import toast, { Toaster } from "react-hot-toast";

type NewDevParams = {
  id?: string;
};

type DeveloperResponse = {
  id: number;
  nome: string;
  hobby: string;
  sexo: string;
  data_nascimento: string;
  idade: number;
};

type InputState = {
  value: string;
  invalid: boolean;
  touched: boolean;
};

export function NewDev() {
  const history = useHistory();
  const params = useParams<NewDevParams>();

  const [response, setResponse] = useState<DeveloperResponse>();

  const [loading, setLoading] = useState(false);

  const [hasError, setHasError] = useState(true);

  const [nome, setNome] = useState<InputState>({
    value: "",
    touched: false,
    invalid: false,
  });
  const [hobby, setHobby] = useState<InputState>({
    value: "",
    touched: false,
    invalid: false,
  });
  const [sexo, setSexo] = useState<InputState>({
    value: "",
    touched: false,
    invalid: false,
  });
  const [dataNascimento, setDataNascimento] = useState<InputState>({
    value: "",
    touched: false,
    invalid: false,
  });

  const id = params.id;

  function parseResponde() {
    if (!response) {
      return;
    }
    setNome({ value: response.nome, invalid: false, touched: true });
    setHobby({ value: response.hobby, invalid: false, touched: true });
    setSexo({ value: response.sexo, invalid: false, touched: true });
    setDataNascimento({
      value: response.data_nascimento.slice(0, 10),
      invalid: false,
      touched: true,
    });
  }

  function loadDev() {
    if (id) {
      setLoading(true);
      API.get(`/developers/${id}`)
        .then((res) => {
          setLoading(false);
          const dev = res.data as DeveloperResponse;
          setResponse(dev);
        })
        .catch(() => {
          setLoading(false);
          history.push("/nao-encontrado");
        });
    }
  }

  function validateInputs() {
    let error = false;
    if (nome.value.trim().length < 3 || nome.value.trim().length > 80) {
      setNome({ value: nome.value, touched: nome.touched, invalid: true });
      error = true;
    } else {
      setNome({ value: nome.value, touched: nome.touched, invalid: false });
    }

    if (hobby.value.trim().length < 3 || hobby.value.trim().length > 100) {
      setHobby({ value: hobby.value, touched: hobby.touched, invalid: true });
      error = true;
    } else {
      setHobby({ value: hobby.value, touched: hobby.touched, invalid: false });
    }

    if (!dataNascimento.value) {
      setDataNascimento({
        value: dataNascimento.value,
        touched: dataNascimento.touched,
        invalid: true,
      });
      error = true;
    } else {
      setDataNascimento({
        value: dataNascimento.value,
        touched: dataNascimento.touched,
        invalid: false,
      });
    }

    if (!sexo.value) {
      setSexo({ value: sexo.value, touched: sexo.touched, invalid: true });
      error = true;
    } else {
      setSexo({ value: sexo.value, touched: sexo.touched, invalid: false });
    }
    setHasError(error);
  }

  useEffect(() => {
    loadDev();
  }, [id, history]);

  useEffect(() => {
    parseResponde();
  }, [response]);

  useEffect(() => {
    validateInputs();
  }, [
    nome.value,
    hobby.value,
    sexo.value,
    dataNascimento.value,
    nome.touched,
    hobby.touched,
    sexo.touched,
    dataNascimento.touched,
  ]);

  function handleCreate() {
    if (hasError) {
      return;
    }

    API.post("/developers", {
      nome: nome.value,
      hobby: hobby.value,
      sexo: sexo.value,
      data_nascimento: dataNascimento.value.slice(0, 10),
    })
      .then(() => {
        toast.success("Desenvolvedor criado com sucesso!", { duration: 2000 });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch(() => {
        toast.error("Algo deu errado. ", { duration: 2000 });
      });
  }
  function handleUpdate() {
    if (hasError) {
      return;
    }

    API.put(`/developers/${id}`, {
      nome: nome.value,
      hobby: hobby.value,
      sexo: sexo.value,
      data_nascimento: dataNascimento.value.slice(0, 10),
    })
      .then(() => {
        toast.success("Desenvolvedor atualizado com sucesso!", {
          duration: 2000,
        });
        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch(() => {
        toast.error("Algo deu errado. ", { duration: 2000 });
      });
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (id) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }

  async function handleVoltar() {
    history.push("/");
  }

  return (
    <Flex alignItems={"stretch"} height="100vh">
      <Flex
        flex={{ base: 0, sm: 0, md: 0, lg: 5 }}
        direction="column"
        display={{ base: "none", lg: "flex" }}
        alignItems="center"
        justifyContent="center"
      >
        <Img
          src={illustration}
          alt="Ilustração de um formulário"
          height="504"
        />
        <Flex
          alignItems="start"
          align="left"
          direction="column"
          mx="2rem"
          mt="1rem"
        >
          {id ? (
            <Heading size="lg">Atualize um desenvolvedor</Heading>
          ) : (
            <Heading size="lg">Crie um novo desenvolvedor</Heading>
          )}

          <Text>Preencha os dados ao lado</Text>
        </Flex>
      </Flex>
      <Flex
        flex={8}
        alignItems="center"
        justifyContent="center"
        bg="#fff"
        borderLeft="1px solid #C4C4C4"
      >
        <Flex direction="column" flex={{ base: 0.9, lg: 0.8, xl: 0.6 }}>
          <Flex direction="column" alignItems="center" sx={{ gap: "16px" }}>
            <Img src={logo} alt="Logo desenvolvedores" height="100px" />

            {id ? (
              <Heading
                isTruncated
                size="lg"
                display={{
                  base: "block",
                  sm: "block",
                  md: "block",
                  lg: "none",
                }}
              >
                Atualize um desenvolvedor
              </Heading>
            ) : (
              <Heading
                isTruncated
                size="lg"
                display={{
                  base: "block",
                  sm: "block",
                  md: "block",
                  lg: "none",
                }}
              >
                Crie um novo desenvolvedor
              </Heading>
            )}
          </Flex>
          {loading ? (
            <Flex minH="320" alignItems="center" justifyContent="center">
              <Spinner size="xl" color="primary.500" thickness="4px" />
            </Flex>
          ) : (
            <chakra.form onSubmit={handleSubmit}>
              <FormControl
                id="nome"
                mt="16px"
                isRequired
                isInvalid={nome.invalid && nome.touched}
                onFocus={() =>
                  setNome({
                    value: nome.value,
                    touched: true,
                    invalid: nome.invalid,
                  })
                }
              >
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  placeholder="João Vitor"
                  onChange={(ev) =>
                    setNome({
                      value: ev.target.value,
                      touched: nome.touched,
                      invalid: nome.invalid,
                    })
                  }
                  value={nome.value}
                  minLength={3}
                  maxLength={80}
                />
                <FormErrorMessage>
                  Nome deve ter entre 3 e 80 caracteres
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="hobby"
                mt="16px"
                isRequired
                isInvalid={hobby.invalid && hobby.touched}
                onFocus={() =>
                  setHobby({
                    value: hobby.value,
                    touched: true,
                    invalid: hobby.invalid,
                  })
                }
              >
                <FormLabel>Hobby</FormLabel>
                <Textarea
                  resize="vertical"
                  placeholder="Criar penguins"
                  onChange={(ev) =>
                    setHobby({
                      value: ev.target.value,
                      touched: hobby.touched,
                      invalid: hobby.invalid,
                    })
                  }
                  value={hobby.value}
                />
                <FormErrorMessage>
                  Hobby deve ter entre 3 e 100 caracteres
                </FormErrorMessage>
              </FormControl>
              <Flex
                direction={{
                  base: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                }}
                mt="16px"
                sx={{ gap: "16px" }}
                alignItems="center"
              >
                <FormControl
                  id="data-nasc"
                  isRequired
                  isInvalid={dataNascimento.invalid && dataNascimento.touched}
                  onFocus={() =>
                    setDataNascimento({
                      value: dataNascimento.value,
                      touched: true,
                      invalid: dataNascimento.invalid,
                    })
                  }
                >
                  <FormLabel>Data de nascimento</FormLabel>
                  <Input
                    type="date"
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(ev) =>
                      setDataNascimento({
                        value: ev.target.value,
                        touched: dataNascimento.touched,
                        invalid: dataNascimento.invalid,
                      })
                    }
                    value={dataNascimento.value}
                  />
                  <FormErrorMessage>Escolha uma data válida</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="sexo"
                  isRequired
                  isInvalid={sexo.invalid && sexo.touched}
                  onFocus={() =>
                    setSexo({
                      value: sexo.value,
                      touched: true,
                      invalid: sexo.invalid,
                    })
                  }
                >
                  <FormLabel>Sexo</FormLabel>
                  <RadioGroup
                    onChange={(value) =>
                      setSexo({
                        value: value,
                        touched: sexo.touched,
                        invalid: sexo.invalid,
                      })
                    }
                    value={sexo.value}
                  >
                    <Stack direction="row" spacing="16px">
                      <Radio value="M">Masculino</Radio>
                      <Radio value="F">Feminino</Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>Escolha um sexo</FormErrorMessage>
                </FormControl>
              </Flex>
              <Flex
                my="2rem"
                fontWeight="500"
                fontFamily="Ubuntu"
                sx={{ gap: "8px" }}
              >
                <Button
                  color="white"
                  colorScheme="gray"
                  width="50%"
                  onClick={handleVoltar}
                >
                  Voltar
                </Button>
                <Button width="50%" disabled={hasError} type="submit">
                  Concluir
                </Button>
              </Flex>
            </chakra.form>
          )}
        </Flex>
      </Flex>
      <Toaster position="bottom-right" />
    </Flex>
  );
}
