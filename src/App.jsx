import { useState } from 'react';
import { MantineProvider, ScrollArea, SimpleGrid, AppShell, BackgroundImage, Card } from '@mantine/core';
import 'leaflet/dist/leaflet.css';
import "@mantine/core/styles.css";
import Map from './components/Map';
import Birds from './components/Birds';
import icono from '/Iconos/Aves_Logo_TEXT.png';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState();

  // appshell es para el header con mantine
  // encodeURI es para pasar el nombre de la region a un formato que pueda ser leido por la url (por los espacios)
  return (
    <MantineProvider zIndex={1}>
      <BackgroundImage
        src={`https://raw.githubusercontent.com/IRkwu/Aves-Chilenas/main/Imagenes_Regiones/${encodeURI(selectedRegion)}.jpg`}
        >
      <AppShell 
        header={{ height: 75}}
        padding="xl"
      >
        <AppShell.Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#C6DAE2'}}>
          <img src={icono} style={{ width: 165, height: 66 }} />
        </AppShell.Header>

        <AppShell.Main>
          <SimpleGrid cols={2}>
            <Map setSelectedRegion={setSelectedRegion} />
            <ScrollArea h={800}>
            <Card shadow="xs" radius="md">
              <Birds selectedRegion={selectedRegion} />
            </Card>
            </ScrollArea>
          </SimpleGrid>
        </AppShell.Main>
      </AppShell>
      </BackgroundImage>
    </MantineProvider>
  );
}
