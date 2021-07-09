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
} from "@chakra-ui/react";

import illustration from "../assets/images/illustration.svg";
import logo from "../assets/images/desenvolvedoresLogo.svg";
import { useHistory } from "react-router-dom";

export function NewDev() {
  const history = useHistory();

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
          <Heading size="lg">Crie um novo desenvolvedor</Heading>

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
        <Flex
          direction="column"
          sx={{ gap: "16px" }}
          flex={{ base: 0.9, lg: 0.8, xl: 0.6 }}
        >
          <Flex direction="column" alignItems="center" sx={{ gap: "16px" }}>
            <Img src={logo} alt="Logo desenvolvedores" height="100px" />
            <Heading
              isTruncated
              size="lg"
              display={{ base: "block", sm: "block", md: "block", lg: "none" }}
            >
              Crie um novo desenvolvedor
            </Heading>
          </Flex>
          <FormControl id="nome">
            <FormLabel>Nome</FormLabel>
            <Input type="text" placeholder="João Vitor" />
            <FormErrorMessage />
          </FormControl>
          <FormControl id="hobby">
            <FormLabel>Hobby</FormLabel>
            <Textarea resize="vertical" placeholder="Criar penguins" />
            <FormErrorMessage />
          </FormControl>
          <Flex
            direction={{
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
            }}
            sx={{ gap: "16px" }}
            alignItems="center"
          >
            <FormControl id="data-nasc">
              <FormLabel>Data de nascimento</FormLabel>
              <Input type="date" />
              <FormErrorMessage />
            </FormControl>
            <FormControl id="sexo">
              <FormLabel>Sexo</FormLabel>
              <RadioGroup>
                <Stack direction="row" spacing="16px">
                  <Radio value="M">Masculino</Radio>
                  <Radio value="F">Feminino</Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage />
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
            <Button width="50%">Concluir</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
