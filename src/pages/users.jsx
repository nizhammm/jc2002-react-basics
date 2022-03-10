import {
  Box,
  Center,
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
  Grid,
  GridItem,
  Tfoot,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../configs/api";
import { jobs } from "../fake-api/jobs";
import { useSearchParams } from "react-router-dom";

const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );

  const [inputSearch, setInputSearch] = useState("");
  const [selectedGender, setSelectedGender] = useState(
    searchParams.get("gender") ? searchParams.get("gender") : ""
  );
  const [selectedJob, setSelectedJob] = useState(
    searchParams.get("job") ? searchParams.get("job") : ""
  );

  const [genderSearchValue, setGenderSearchValue] = useState(
    searchParams.get("gender") ? searchParams.get("gender") : ""
  );
  const [jobSearchValue, setJobSearchValue] = useState(
    searchParams.get("job") ? searchParams.get("job") : ""
  );
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ? searchParams.get("search") : ""
  );

  const pageLimit = 10;

  const fetchUsers = (params = { _limit: pageLimit }) => {
    axiosInstance
      .get("/users", {
        params,
      })
      .then((res) => {
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

  const renderJobs = () => {
    return jobs.map((val) => {
      return <option>{val}</option>;
    });
  };

  const searchBtnHandler = () => {
    setSearchValue(inputSearch);
    setGenderSearchValue(selectedGender);
    setJobSearchValue(selectedJob);

    setCurrentPage(1);

    let newSearchParams = { page: 1 };

    if (inputSearch) {
      newSearchParams.search = inputSearch;
    }

    if (selectedJob) {
      newSearchParams.job = selectedJob;
    }

    if (selectedGender) {
      newSearchParams.gender = selectedGender;
    }

    setSearchParams(newSearchParams);
  };

  const paginationHandler = (dir) => {
    if (dir === "prev" && currentPage === 1) {
      return;
    }

    let newPage = currentPage;

    if (dir === "prev") {
      newPage -= 1;
    } else if (dir === "next") {
      newPage += 1;
    }

    let newSearchParams = { page: newPage };

    if (searchValue) {
      newSearchParams.search = searchValue;
    }

    if (jobSearchValue) {
      newSearchParams.job = jobSearchValue;
    }

    if (genderSearchValue) {
      newSearchParams.gender = genderSearchValue;
    }

    setSearchParams(newSearchParams);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const first_name = searchParams.get("search");
    const job_area = searchParams.get("job");
    const gender = searchParams.get("gender");

    fetchUsers({
      _limit: pageLimit,
      _page: currentPage,
      first_name: first_name ? first_name : undefined,
      job_area: job_area ? job_area : undefined,
      gender: gender ? gender : undefined,
    });
  }, [currentPage, searchValue, genderSearchValue, jobSearchValue]);

  return (
    <Box paddingBottom="24">
      <Flex justify="center" my="8">
        <Box width="xl">
          <Box>
            <FormLabel htmlFor="searchName">Search by Name</FormLabel>
            <Flex>
              <Input
                id="searchName"
                onChange={(event) => setInputSearch(event.target.value)}
              />
              <Button onClick={searchBtnHandler} marginLeft="8">
                Search
              </Button>
            </Flex>
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} marginTop="4">
            <GridItem>
              <FormLabel htmlFor="inputGender">Filter By Gender</FormLabel>
              <Select
                id="inputGender"
                onChange={(event) => setSelectedGender(event.target.value)}
                placeholder="Select Gender"
                value={selectedGender}
              >
                <option>Female</option>
                <option>Male</option>
              </Select>
            </GridItem>
            <GridItem>
              <FormLabel htmlFor="inputJob">Filter By Job</FormLabel>
              <Select
                onChange={(event) => setSelectedJob(event.target.value)}
                placeholder="Select Job"
                id="inputJob"
                value={selectedJob}
              >
                {renderJobs()}
              </Select>
            </GridItem>
          </Grid>
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
            <Tfoot>
              <Tr>
                <Td colSpan={2} textAlign="center">
                  <Button onClick={() => paginationHandler("prev")}>
                    Previous Page
                  </Button>
                </Td>
                <Td colSpan={2} textAlign="center">
                  <Button onClick={() => paginationHandler("next")}>
                    Next Page
                  </Button>
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      </Center>
    </Box>
  );
};

export default UsersPage;
