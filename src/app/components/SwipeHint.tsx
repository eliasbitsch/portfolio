'use client';

import React, { useEffect, useState } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

/*
  Wischhinweis, wie man ihn von Instagram und TikTok kennt.

  Ein Finger faehrt von rechts nach links, dann zeigt ein Pfeil nach
  unten. Beides wiederholt sich, solange niemand gewischt hat, und ist
  danach fuer immer weg. Ein Hinweis, der jedes Mal wieder erscheint,
  ist kein Hinweis mehr, sondern eine Belaestigung.

  Liegt ueber dem Inhalt, faengt aber keine Beruehrung ab. Wer sofort
  wischt, merkt nichts davon.
*/

const MotionBox = motion(Box);
const SPEICHER = 'reel-hint-gesehen';

export default function SwipeHint({ aktiv }: { aktiv: boolean }) {
    const [zeigen, setZeigen] = useState(false);

    useEffect(() => {
        if (!aktiv) return;
        let gesehen = false;
        try {
            gesehen = localStorage.getItem(SPEICHER) === '1';
        } catch {
            // Privates Fenster oder gesperrter Speicher. Dann eben zeigen.
        }
        if (gesehen) return;
        // Kurz warten: wer von selbst wischt, braucht keinen Hinweis.
        const t = setTimeout(() => setZeigen(true), 1200);
        return () => clearTimeout(t);
    }, [aktiv]);

    useEffect(() => {
        if (!zeigen) return;
        const merken = () => {
            try {
                localStorage.setItem(SPEICHER, '1');
            } catch {
                /* egal */
            }
            setZeigen(false);
        };
        window.addEventListener('touchstart', merken, { once: true, passive: true });
        window.addEventListener('wheel', merken, { once: true, passive: true });
        return () => {
            window.removeEventListener('touchstart', merken);
            window.removeEventListener('wheel', merken);
        };
    }, [zeigen]);

    if (!zeigen) return null;

    return (
        <Box
            position="absolute"
            top={0}
            right={0}
            // Nur ueber dem Bild, nicht ueber dem Text. In Reels liegt der
            // Hinweis dort, wo gewischt wird, und verdeckt nicht die
            // Ueberschrift.
            bottom="48%"
            left={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            pointerEvents="none"
            zIndex={5}
        >
            <VStack spacing={3}>
                <VStack spacing={2}>
                    <HStack spacing={0} position="relative" width="150px" height="54px" justify="center">
                        {/* Die Hand faehrt nach links und verblasst dabei an
                            den Enden, damit es wie eine Bewegung wirkt und
                            nicht wie ein springendes Symbol. */}
                        <MotionBox
                            position="absolute"
                            fontSize="34px"
                            initial={{ x: 46, opacity: 0 }}
                            animate={{ x: [46, 46, -46, -46], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 1.9, times: [0, 0.18, 0.78, 1], repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
                        >
                            👆
                        </MotionBox>
                        <MotionBox
                            position="absolute"
                            width="92px"
                            height="2px"
                            borderRadius="full"
                            bg="whiteAlpha.500"
                            initial={{ scaleX: 0, originX: 1 }}
                            animate={{ scaleX: [0, 1, 1, 0] }}
                            transition={{ duration: 1.9, times: [0, 0.35, 0.78, 1], repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
                        />
                    </HStack>
                    <Box
                        fontSize="sm"
                        fontWeight="medium"
                        color="whiteAlpha.900"
                        px={3}
                        py={1.5}
                        borderRadius="full"
                        bg="blackAlpha.700"
                        backdropFilter="blur(6px)"
                    >
                        Swipe for photos and videos
                    </Box>
                </VStack>

                <VStack spacing={1}>
                    <MotionBox
                        fontSize="22px"
                        color="whiteAlpha.800"
                        animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    >
                        ⌄
                    </MotionBox>
                    <Box
                        fontSize="xs"
                        color="whiteAlpha.800"
                        px={3}
                        py={1}
                        borderRadius="full"
                        bg="blackAlpha.600"
                        backdropFilter="blur(6px)"
                    >
                        Scroll for the next project
                    </Box>
                </VStack>
            </VStack>
        </Box>
    );
}
