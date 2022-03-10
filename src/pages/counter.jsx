import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import counter_types from "../redux/reducers/counter/types";

const CounterPage = () => {

  const [inputCounter, setInputCounter] = useState("")
  const countSelector = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  // Button Click
  const changeCountValue = (dir) => {
    if (dir === "increment") {
      dispatch({
        type: counter_types.INCREMENT_COUNTER,
      });
    } else if (dir === "decrement") {
      dispatch({
        type: counter_types.DECREMENT_COUNTER,
      });
    }
    else if (dir === "reset") {
      dispatch({
        type: counter_types.RESET_COUNTER,
      });
    }
  };

  // Button Click untuk ngeset
  const clickToSet = () => {
    const angka = parseInt(inputCounter)
    dispatch({
      type: counter_types.SET_COUNTER,
      count: angka
    });
   }

  // Input Handler
  const inputHandler = (event) => {
    const {value} = event.target

    setInputCounter(value)
  }

  return (
    <Center>
      <Box>
      <Flex justifyContent={"center"} alignItems="center" marginTop="10">
        <Button onClick={() => changeCountValue("decrement")} marginRight="4">
          -
        </Button>
        <Text fontSize="2xl">{countSelector.count}</Text>
        <Button onClick={() => changeCountValue("increment")} marginLeft="4">
          +
        </Button>
      </Flex>

      <Box marginTop={2} display={"flex"}>
        <Input onChange={inputHandler}/>
      </Box>
      <Flex justifyContent={"center"}>
        <Button onClick={clickToSet} marginRight={2}>Set Counter</Button>
        <Button onClick={() => changeCountValue("reset")}>Reset</Button>

      </Flex>
      </Box>
    </Center>
  );
};

export default CounterPage;