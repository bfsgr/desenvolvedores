import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMars,
  faStar,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/dev-card.scss";

export function DevCard() {
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
      height="210"
    >
      <Flex direction="column">
        <Flex justifyContent="space-between">
          <div>
            <Heading size="md">Alan Turing</Heading>
          </div>
          <FontAwesomeIcon icon={faMars} color="#0247FE" size="2x" />
        </Flex>

        <Text my="12px">
          Try to synthesize the IB feed, maybe it will connect the wireless
          array!
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <FontAwesomeIcon icon={faStar} size="1x" />
          <Text ml="8px">23/06/1912</Text>
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
          />
          <FontAwesomeIcon
            className="action-button remove"
            icon={faTrash}
            size="lg"
          />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
