import useFetchBirds from '../hooks/useFetchBirds';
import { Card, SimpleGrid, Image, Text, Button, Group } from '@mantine/core';
import regionsData from '../mocks/regionsData.json';

const Birds = ({ selectedRegion }) => {
  const { data, isLoading, error } = useFetchBirds();

  const getBirdRegions = (birdUid) => 
    regionsData.find(region => region.uid === birdUid)?.regions.join();

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message}</p>;
  }

  const birds = data ? data.filter(bird => getBirdRegions(bird.uid).includes(selectedRegion)) : [];

  if (birds.length === 0) {
    return <p>Seleccione una región para ver las aves que habitan en ella.</p>;
  } else {
    return (
      <p>
        <Text fw={700} size="xl">Aves en la {selectedRegion}</Text>
        <SimpleGrid cols={3} spacing="sm">
        {birds.map((bird) => (
          <Card 
            key={bird.uid}
            shadow="sm" 
            padding="lg" 
            radius="md" 
            withBorder
            style={{ margin: '8px' }}>
            <Card.Section>
              <Image
                src={bird.images.thumb}
                height={250}
                fit="cover"
                alt={bird.name.spanish}
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{bird.name.spanish}</Text>
            </Group>
            <Button color="pink" fullWidth mt="md" radius="md">
              Ver más Info
            </Button>
          </Card>
        ))}
      </SimpleGrid>
      </p>
    );
  }
};

export default Birds;
