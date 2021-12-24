import React, { useState } from 'react';
import { Button, Input, Flex, Text, FormControl } from '@chakra-ui/react';
import router from 'next/router';

export const InputComponent = () => {
  const [city, setCity] = useState<string>('');

  const handleInput = (ev: any) => {
    setCity(ev.target.value);
  };

  const searchCity = (ev: React.FormEvent<HTMLDivElement>) => {
    ev.preventDefault();
    router.push(`/cities/${city}`);
  };

  return (
    <>
      <Flex justifyContent="center" direction="column" bg="rgba(0, 0, 0, 0.15)" borderRadius="8px" padding="6">
        <Text fontSize="18px" textAlign="center" color="#fff" fontWeight="bold">
          Insira sua cidade:
        </Text>
        <FormControl as="form" id="city" onSubmit={searchCity}>
          <Flex justifyContent="center" direction="column">
            <Input
              direction="column"
              type="city"
              placeholder="Digite sua cidade..."
              size="lg"
              width="60"
              margin="0 auto"
              marginTop="4"
              marginBottom="4"
              border="2px"
              borderColor="#28B8E9"
              bg="white"
              color="#004386"
              fontWeight="500"
              onChange={handleInput}
            />
            <Button type="submit" colorScheme="blue" bg="#28B8E9" width="24" margin="0 auto">
              Pesquisar
            </Button>
          </Flex>
        </FormControl>
      </Flex>
    </>
  );
};
