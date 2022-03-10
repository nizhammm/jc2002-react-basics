import {
  Box,
  Center,
  Container,
  Flex,
  FormLabel,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../configs/api";

const UsersPage = () => {
  const [usersList, setUsersList] = useState([]);

  const pageLimit = 10;

  const fetchUsers = (queryParams = {}) => {
    axiosInstance.get("/users", queryParams).then((res) => {
      setUsersList(res.data);
    });
  };

  const renderUsers = () => {
    return usersList.map((val) => {
      return (
        <Tr>
          <Td>{val.first_name}</Td>
          <Td>{val.last_name}</Td>
          <Td>{val.gender}</Td>
          <Td>{val.job_area}</Td>
        </Tr>
      );
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Flex justify="center" my="8">
        <Box width="xl">
          <Box>
            <FormLabel htmlFor="searchName">Search by Name</FormLabel>
            <Flex>
              <Input id="searchName" />
              <Button marginLeft="8">Search</Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Center>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Gender</Th>
                <Th>Job Area</Th>
              </Tr>
            </Thead>
            <Tbody>{renderUsers()}</Tbody>
          </Table>
        </Box>
      </Center>
    </>
  );
};

export default UsersPage;
