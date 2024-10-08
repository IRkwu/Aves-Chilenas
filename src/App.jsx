import { useState } from 'react';
import { MantineProvider, ScrollArea, SimpleGrid } from '@mantine/core';
import "@mantine/core/styles.css";
import Map from './components/Map';
import Birds from './components/Birds';
import 'leaflet/dist/leaflet.css';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);

  return (
    <MantineProvider>
      <h1>Aves en Chile</h1>
      <SimpleGrid cols={2}>
        <Map setSelectedRegion={setSelectedRegion} />
        <ScrollArea h={800}>
        <Birds selectedRegion={selectedRegion} />
        </ScrollArea>
      </SimpleGrid>
    </MantineProvider>
  );
}
