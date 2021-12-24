import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useUserConfig } from '../src/context/UserConfig';
import Head from 'next/head';
import { setCookie } from 'nookies';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { InputComponent } from '../src/components/inputComponent';

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { setUserConfig } = useUserConfig();

  const [userConfigName, setUserConfigName] = useState<string>('');
  const [userConfigSize, setUserConfigSize] = useState<string>('');
  const [userConfigEmail, setUserConfigEmail] = useState<string>('');

  const saveUserConfig = () => {
    setIsOpen(false);
    setUserConfig({
      name: userConfigName,
      size: userConfigSize,
    });
    setCookie(null, 'email', `${userConfigEmail}`, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
  };

  return (
    <>
      <Head>
        <title>Clima.te</title>
        <meta name="description" content="Seu app de meteriologia" />
        <link rel="icon" href="/logo-way-branco.svg" />
      </Head>

      <Flex direction="column" height="100vh" bgGradient="linear(to-b, #004386, #236DB1)">
        <Flex justifyContent="flex-end">
          <IconButton
            marginTop={6}
            marginRight={6}
            variant="unstyled"
            color="white"
            aria-label="Ícone do usuário"
            fontSize={40}
            icon={<FaUserCircle />}
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </Flex>
        <Flex direction="column" height="80vh" justifyContent="center" alignItems="center">
          <Heading color="white" textAlign="center" marginBottom="8">
            Clima.te App
          </Heading>

          <InputComponent />
        </Flex>
      </Flex>

      {/* Modal */}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalOverlay colorScheme="blue" />
        <ModalContent>
          <ModalHeader>Crie sua conta no Clima.te</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Primeiro nome</FormLabel>
              <Input placeholder="Digite seu primeiro nome..." onChange={ev => setUserConfigName(ev.target.value)} />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>E-Mail</FormLabel>
              <Input placeholder="Digite seu e-mail..." onChange={ev => setUserConfigEmail(ev.target.value)} />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Tamanho da visualização</FormLabel>
              <RadioGroup defaultValue="1" onChange={setUserConfigSize} value={userConfigSize}>
                <Stack spacing={5} direction="row">
                  <Radio value="sm">Pequeno</Radio>
                  <Radio value="md">Médio</Radio>
                  <Radio value="lg">Grande</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                saveUserConfig();
              }}
            >
              Salvar
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
