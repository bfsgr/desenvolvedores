import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  FlexProps,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faStar,
  faEdit,
  faTrash,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/dev-card.scss";
import { createRef, useState } from "react";
import API from "../api";
import { useHistory } from "react-router-dom";

type DevCardProps = FlexProps & {
  api_id: number;
  nome: string;
  hobby: string;
  data_nascimento: Date;
  sexo: string;
  idade: number;
  changedCallback: () => void;
};

export function DevCard({
  api_id,
  nome,
  hobby,
  data_nascimento,
  sexo,
  idade,
  changedCallback,
  ...props
}: DevCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = createRef<HTMLElement>();

  const history = useHistory();

  async function removerDesenvolvedor() {
    await API.delete(`/developers/${api_id}`);
    changedCallback();
  }

  function handleEditar() {
    history.push(`/desenvolvedor/editar/${api_id}`);
  }

  return (
    <Flex
      className="dev-card"
      bgColor="#FEFEFE"
      borderRadius="8px"
      border="1px solid transparent"
      boxShadow="4px 4px 4px -3px rgba(0, 0, 0, 0.25);"
      padding="24px"
      direction="column"
      justifyContent="space-between"
      minH="210px"
      {...props}
    >
      <Flex direction="column">
        <Flex justifyContent="space-between">
          <Flex paddingRight="16px" alignItems="center">
            <Heading size="md" wordBreak="break-word">
              {nome}
            </Heading>
            <Text ml="4px">• {idade} anos</Text>
          </Flex>
          {sexo === "M" ? (
            <FontAwesomeIcon icon={faMars} color="#0247FE" size="2x" />
          ) : (
            <FontAwesomeIcon icon={faVenus} color="#FE41FB" size="2x" />
          )}
        </Flex>

        <Text my="12px">{hobby}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <FontAwesomeIcon icon={faStar} size="1x" />
          <Text ml="8px">{`${data_nascimento.getUTCDate()}/${data_nascimento.getUTCMonth()}/${data_nascimento.getFullYear()}`}</Text>
        </Flex>
        <SimpleGrid
          className="actions"
          visibility="hidden"
          columns={[2]}
          spacing="16px"
        >
          <FontAwesomeIcon
            className="action-button edit"
            icon={faEdit}
            size="lg"
            aria-label="Editar desenvolvedor"
            onClick={handleEditar}
          />
          <FontAwesomeIcon
            className="action-button remove"
            icon={faTrash}
            size="lg"
            aria-label="Remover desenvolvedor"
            onClick={() => setIsOpen(true)}
          />
        </SimpleGrid>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remover desenvolvedor
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza? Essa ação não pode ser desfeita
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} colorScheme="gray" color="white">
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  removerDesenvolvedor() && onClose();
                }}
                ml={3}
              >
                Remover
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}
