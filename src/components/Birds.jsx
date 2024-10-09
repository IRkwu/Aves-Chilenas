import { useState } from 'react';
import useFetchBirds from '../hooks/useFetchBirds';
import useFetchBirdData from '../hooks/useFetchBirdData';
import { Card, SimpleGrid, Image, Text, Button, Group, Drawer, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import regionsData from '../mocks/regionsData.json';

const Birds = ({ selectedRegion }) => {
  const { data, isLoading, error } = useFetchBirds();
  const [selectedBirdUid, setSelectedBirdUid] = useState();
  const { data: birdData, isLoading: isBirdLoading, error: birdError } = useFetchBirdData(selectedBirdUid);
  const [opened, { open, close }] = useDisclosure(false);

  // sirve para obtener las regiones de las aves y compararlas con la región seleccionada
  const getBirdRegions = (birdUid) => 
    regionsData.find(region => region.uid === birdUid).regions.join();

  if (isLoading) {
    return <p>Cargando aves...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message}</p>;
  }
  
  // filtra las aves que habitan en la región seleccionada
  const birds = data ? data.filter(bird => getBirdRegions(bird.uid).includes(selectedRegion)) : [];

  if (birds.length === 0) {
    return <Text>Seleccione una región para ver las aves que habitan en ella.</Text>;
  } else {
    return (
      <>
        <Text fw={600} size="xl">Aves en la {selectedRegion}</Text>
        <SimpleGrid cols={3} spacing="sm">
          {birds.map((bird) => (
            <Card 
              key={bird.uid} shadow="sm" padding="lg" radius="md" withBorder style={{ margin: '8px' }}>
              <Card.Section>
                <Image
                  src={bird.images.thumb}
                  height={250}
                  fit="cover"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{bird.name.spanish}</Text>
              </Group>
              <Button color="pink" fullWidth mt="md" radius="md"
                onClick={() => {
                  setSelectedBirdUid(bird.uid);
                  open();
                }}>    
                Ver más Info
              </Button>
            </Card>
          ))}
        </SimpleGrid>

        <Drawer position="right" opened={opened} onClose={close} size="35%" title={<Text fw={500}>{"Información sobre el Ave"}</Text>}>
          {isBirdLoading && <p>Cargando...</p>}
          {birdError && <p>Ha ocurrido un error: {birdError.message}</p>}
          {birdData && (
            <Card shadow="xs" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={birdData.images.main}
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={600} size="xl">{birdData.name.spanish}</Text>
                
                <Badge color="pink">{birdData.species}</Badge>
              </Group>

              <Text fw={500}>Descripción: </Text>
              <Text> {birdData.iucn.description ? birdData.iucn.description:"No hay una descripción"} </Text>

              <Text fw={500}>Hábitat:</Text>
              <Text>{birdData.habitat ? birdData.habitat:"No hay una información sobre su hábitat"}</Text>
            </Card>
          )}
        </Drawer>
      </>
    );
  }
};

export default Birds;
