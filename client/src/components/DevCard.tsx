import { Flex, FlexProps, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faStar,
  faEdit,
  faTrash,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/dev-card.scss";

type DevCardProps = FlexProps & {
  id?: number;
  nome: string;
  hobby: string;
  data_nascimento: Date;
  sexo: string;
  idade: number;
};

export function DevCard({
  id,
  nome,
  hobby,
  data_nascimento,
  sexo,
  idade,
  ...props
}: DevCardProps) {
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
          />
          <FontAwesomeIcon
            className="action-button remove"
            icon={faTrash}
            size="lg"
            aria-label="Remover desenvolvedor"
          />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
