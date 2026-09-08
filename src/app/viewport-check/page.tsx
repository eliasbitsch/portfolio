'use client';

import React, { useEffect, useState } from 'react';
import { Box, Code, Heading, Table, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';

/*
  Kleine Messseite fuer echte Geraete.

  Damit man die Werte fuer ein Chrome-Custom-Device nicht raten muss:
  Seite am Geraet oeffnen, ablesen, eintragen. Einmal zusammengeklappt
  und einmal aufgeklappt, dann hat man beide Zustaende eines Foldables.

  Steht bewusst nicht im Menue. Sie ist ein Werkzeug, kein Inhalt.
*/

type Werte = Record<string, string>;

export default function ViewportCheck() {
    const [w, setW] = useState<Werte>({});

    useEffect(() => {
        const messen = () => {
            const vv = window.visualViewport;
            setW({
                'CSS-Breite (innerWidth)': String(window.innerWidth),
                'CSS-Hoehe (innerHeight)': String(window.innerHeight),
                'Device pixel ratio': String(window.devicePixelRatio),
                'Bildschirm (screen)': `${window.screen.width} x ${window.screen.height}`,
                'Sichtbares Fenster': vv ? `${Math.round(vv.width)} x ${Math.round(vv.height)}` : 'n/a',
                '100svh in Pixeln': String(
                    Math.round(
                        parseFloat(getComputedStyle(document.getElementById('svh-probe')!).height),
                    ),
                ),
                '100dvh in Pixeln': String(
                    Math.round(
                        parseFloat(getComputedStyle(document.getElementById('dvh-probe')!).height),
                    ),
                ),
                'Layout greift als': window.innerWidth >= 768 ? 'Desktop (ab 768)' : 'Handy (unter 768)',
                'Zeigergeraet': window.matchMedia('(pointer: coarse)').matches ? 'Finger' : 'Maus',
                'User agent': navigator.userAgent,
            });
        };
        messen();
        window.addEventListener('resize', messen);
        window.visualViewport?.addEventListener('resize', messen);
        return () => {
            window.removeEventListener('resize', messen);
            window.visualViewport?.removeEventListener('resize', messen);
        };
    }, []);

    return (
        <Box p={5} maxWidth="700px" mx="auto">
            {/* Messfuehler, unsichtbar, aber mit echter Hoehe */}
            <Box id="svh-probe" height="100svh" position="absolute" top={0} left={0} width="1px" opacity={0} pointerEvents="none" />
            <Box id="dvh-probe" height="100dvh" position="absolute" top={0} left={0} width="1px" opacity={0} pointerEvents="none" />

            <VStack align="stretch" spacing={4}>
                <Heading size="lg">Viewport check</Heading>
                <Box fontSize="sm" color="gray.400">
                    Werte dieses Geraets. Bei einem Foldable einmal zugeklappt und einmal
                    aufgeklappt ablesen, dann hat man beide Zustaende fuer ein eigenes
                    Geraet in den Chrome-Entwicklerwerkzeugen.
                </Box>
                <Table size="sm" variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Wert</Th>
                            <Th>Messung</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Object.entries(w).map(([k, v]) => (
                            <Tr key={k}>
                                <Td whiteSpace="nowrap">{k}</Td>
                                <Td>
                                    <Code fontSize="xs" whiteSpace="pre-wrap" wordBreak="break-all">
                                        {v}
                                    </Code>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </VStack>
        </Box>
    );
}
