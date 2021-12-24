import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import router from 'next/router';
import axios from 'axios';
import { Flex, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import { InfoTempo } from '../../src/components/infoTempo';
import { useUserConfig } from '../../src/context/UserConfig';
import { parseCookies, destroyCookie } from 'nookies';
import { FaSignOutAlt } from 'react-icons/fa';

type DataType = {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    id: number;
    description: string;
    icon: string;
  }[];
};

export const City = () => {
  const router = useRouter();
  const { city } = router.query;

  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { userConfig } = useUserConfig();

  const getResponse = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a2f164bb6f65997c456f4e9b36dfccf&units=metric&lang=pt_br`,
      )
      .then(function (response) {
        setError(false);
        setData(response.data as DataType);
      })
      .catch(function (error) {
        setError(true);
        console.log(error);
      });
  };

  useEffect(() => {
    getResponse();
  }, [city]);

  var cookies = parseCookies();

  const logOut = () => {
    cookies = destroyCookie(null, 'email');
    router.push('/');
  };

  return (
    <>
      <Flex direction="column" height="100vh" bgGradient="linear(to-b, #004386, #236DB1)">
        {cookies.email && (
          <>
            <Flex justifyContent="flex-end">
              <Flex justifyContent="space-between">
                <HStack spacing={8}>
                  <Text color="white" textAlign="right" marginTop="4">
                    Olá, <strong>{userConfig.name}</strong>! <br /> {cookies.email}.
                  </Text>

                  <IconButton
                    variant="unstyled"
                    color="white"
                    aria-label="Ícone de logout"
                    fontSize={20}
                    icon={<FaSignOutAlt />}
                    onClick={() => logOut()}
                  />
                </HStack>
              </Flex>
            </Flex>
          </>
        )}

        <Flex direction="column" height="80vh" justifyContent="center" alignItems="center">
          <InfoTempo data={data} />
        </Flex>
      </Flex>

      {error ? setOpenModal(true) : setOpenModal(false)}
    </>
  );
};

export default City;
