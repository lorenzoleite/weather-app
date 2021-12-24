import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heading, Text, Flex, Stack, Image, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useUserConfig } from '../../context/UserConfig';

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

type infoTempoProps = {
  data: DataType | null;
};

type BoxSize = {
  iconFontSize: string;
  textFontSize: string;
  titleFontSize: string;
  headingFontSize: string;
  imgFontSize: number;
};

export const InfoTempo = ({ data }: infoTempoProps) => {
  const weatherIcon = `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`;

  const [time, setTime] = useState('');

  const { userConfig } = useUserConfig();

  const [size, setSize] = useState<BoxSize | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date().getHours() + ':' + new Date().getMinutes());
    }, 1000);
  }, [time]);

  useEffect(() => {
    switch (userConfig.size) {
      case 'sm':
        setSize({
          iconFontSize: '16px',
          textFontSize: '12px',
          titleFontSize: '16px',
          headingFontSize: '24px',
          imgFontSize: 10,
        });
        break;

      case 'md':
        setSize({
          iconFontSize: '30px',
          textFontSize: '20px',
          titleFontSize: '30px',
          headingFontSize: '38px',
          imgFontSize: 90,
        });
        break;

      case 'lg':
        setSize({
          iconFontSize: '36px',
          textFontSize: '24px',
          titleFontSize: '36px',
          headingFontSize: '48px',
          imgFontSize: 110,
        });
        break;

      default:
        setSize({
          iconFontSize: '24px',
          textFontSize: '16px',
          titleFontSize: '24px',
          headingFontSize: '36px',
          imgFontSize: 20,
        });
        break;
    }
  }, [userConfig.size]);

  return (
    <>
      <Heading color="white" textAlign="center" marginBottom="8" fontSize={size?.headingFontSize}>
        Clima.te App
      </Heading>
      <Flex justifyContent="center" direction="column" bg="rgba(0, 0, 0, 0.15)" borderRadius="8px" padding="6">
        <Flex justifyContent="space-between" alignItems="center">
          <Link href="/">
            <a>
              <ArrowBackIcon color="white" fontSize={size?.iconFontSize} />
            </a>
          </Link>
          <Text color="#fff" textAlign="right" fontWeight="500" fontSize={size?.textFontSize}>
            {time}
          </Text>
        </Flex>
        <Stack spacing={1.5}>
          <Image src={weatherIcon} width={size?.imgFontSize} margin="0 auto" alt="Ícone do clima" />
          <Text fontSize={size?.titleFontSize} textAlign="center" color="#fff" fontWeight="bold">
            {data?.name}
          </Text>

          <Text textAlign="center" color="#fff" fontSize={size?.textFontSize}>
            {data &&
              data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1).toLowerCase()}
          </Text>

          <Heading textAlign="center" color="#fff" fontSize={size?.titleFontSize}>
            {data?.main.temp}°C
          </Heading>

          <Flex justifyContent="center">
            <Text color="#fff" paddingRight="2" paddingLeft="2" fontSize={size?.textFontSize}>
              Máx: {data?.main.temp_max}°
            </Text>
            <Text color="#fff" paddingRight="2" paddingLeft="2" fontSize={size?.textFontSize}>
              Mín: {data?.main.temp_min}°
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
};
