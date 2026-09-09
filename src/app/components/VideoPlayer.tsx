'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, HStack, IconButton } from '@chakra-ui/react';

/*
  Kleiner Videospieler fuer die Lightbox.

  Bewusst nicht die Bedienelemente des Browsers: die sehen auf jedem
  System anders aus, sind auf dem Handy riesig und koennen nicht
  gehalten werden fuer doppelte Geschwindigkeit.

  Was er kann: tippen zum Anhalten, ziehen an der Leiste, zehn Sekunden
  vor und zurueck, und gedrueckt halten fuer doppelte Geschwindigkeit,
  so wie man es von YouTube kennt.

  Zum Startproblem: `preload="none"` und `autoPlay` zusammen sind ein
  Widerspruch. Ohne geladene Daten hat der Browser nichts zum Abspielen,
  und je nach Geraet startet er dann gar nicht. Hier wird geladen, sobald
  das Video sichtbar ist, und der Startversuch wiederholt, wenn die
  Daten da sind.
*/

const Z = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

export default function VideoPlayer({
    src,
    poster,
    maxHeight,
}: {
    src: string;
    poster?: string;
    maxHeight?: string;
}) {
    const v = useRef<HTMLVideoElement>(null);
    const [laeuft, setLaeuft] = useState(false);
    const [zeit, setZeit] = useState(0);
    const [dauer, setDauer] = useState(0);
    const [schnell, setSchnell] = useState(false);
    const haltenTimer = useRef<number | null>(null);
    const gehalten = useRef(false);

    // Startversuch, sobald genug geladen ist. Scheitert er, bleibt das
    // Video stehen und zeigt seine Schaltflaeche, statt schwarz zu sein.
    useEffect(() => {
        const el = v.current;
        if (!el) return;
        const starten = () => {
            el.play().then(() => setLaeuft(true)).catch(() => setLaeuft(false));
        };
        if (el.readyState >= 2) starten();
        else el.addEventListener('loadeddata', starten, { once: true });
        return () => el.removeEventListener('loadeddata', starten);
    }, [src]);

    const springen = useCallback((s: number) => {
        const el = v.current;
        if (!el) return;
        el.currentTime = Math.min(Math.max(0, el.currentTime + s), el.duration || 0);
    }, []);

    const umschalten = useCallback(() => {
        const el = v.current;
        if (!el) return;
        if (el.paused) el.play().then(() => setLaeuft(true)).catch(() => undefined);
        else {
            el.pause();
            setLaeuft(false);
        }
    }, []);

    // Halten fuer doppelte Geschwindigkeit
    const runter = () => {
        gehalten.current = false;
        haltenTimer.current = window.setTimeout(() => {
            gehalten.current = true;
            if (v.current) v.current.playbackRate = 2;
            setSchnell(true);
        }, 350);
    };
    const hoch = () => {
        if (haltenTimer.current) window.clearTimeout(haltenTimer.current);
        if (gehalten.current) {
            if (v.current) v.current.playbackRate = 1;
            setSchnell(false);
        } else {
            umschalten();
        }
        gehalten.current = false;
    };

    return (
        <Box position="relative" maxWidth="100%" onClick={e => e.stopPropagation()}>
            <Box
                as="video"
                ref={v as never}
                src={src}
                poster={poster}
                loop
                muted
                playsInline
                preload="auto"
                onTimeUpdate={e => setZeit((e.target as HTMLVideoElement).currentTime)}
                onLoadedMetadata={e => setDauer((e.target as HTMLVideoElement).duration)}
                onPlay={() => setLaeuft(true)}
                onPause={() => setLaeuft(false)}
                onPointerDown={runter}
                onPointerUp={hoch}
                onPointerLeave={() => {
                    if (haltenTimer.current) window.clearTimeout(haltenTimer.current);
                    if (gehalten.current && v.current) {
                        v.current.playbackRate = 1;
                        setSchnell(false);
                        gehalten.current = false;
                    }
                }}
                maxHeight={maxHeight}
                maxWidth="100%"
                borderRadius="lg"
                display="block"
                cursor="pointer"
                sx={{ touchAction: 'manipulation' }}
            />

            {schnell && (
                <Box
                    position="absolute"
                    top="12px"
                    left="50%"
                    transform="translateX(-50%)"
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg="blackAlpha.700"
                    color="white"
                    fontSize="sm"
                    fontWeight="bold"
                    pointerEvents="none"
                >
                    2x
                </Box>
            )}

            {/* Grosse Schaltflaeche, wenn das Video steht. Sonst weiss
                niemand, ob es kaputt ist oder nur pausiert. */}
            {!laeuft && (
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="64px"
                    height="64px"
                    borderRadius="full"
                    bg="blackAlpha.700"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="26px"
                    cursor="pointer"
                    onClick={umschalten}
                >
                    ▶
                </Box>
            )}

            <HStack
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                px={3}
                py={2}
                spacing={3}
                borderBottomRadius="lg"
                bgGradient="linear(to-t, blackAlpha.800, transparent)"
                align="center"
            >
                <IconButton
                    aria-label={laeuft ? 'Pause' : 'Abspielen'}
                    icon={<span>{laeuft ? '❚❚' : '▶'}</span>}
                    onClick={umschalten}
                    size="sm"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.300' }}
                />
                <IconButton
                    aria-label="Zehn Sekunden zurueck"
                    icon={<span>-10</span>}
                    onClick={() => springen(-10)}
                    size="sm"
                    variant="ghost"
                    color="white"
                    fontSize="xs"
                    _hover={{ bg: 'whiteAlpha.300' }}
                />
                <IconButton
                    aria-label="Zehn Sekunden vor"
                    icon={<span>+10</span>}
                    onClick={() => springen(10)}
                    size="sm"
                    variant="ghost"
                    color="white"
                    fontSize="xs"
                    _hover={{ bg: 'whiteAlpha.300' }}
                />
                <Box fontSize="xs" color="white" minWidth="72px" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                    {Z(zeit)} / {Z(dauer)}
                </Box>
                <Box
                    as="input"
                    type="range"
                    min={0}
                    max={dauer || 0}
                    step={0.05}
                    value={zeit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const el = v.current;
                        if (el) el.currentTime = Number(e.target.value);
                        setZeit(Number(e.target.value));
                    }}
                    flex="1"
                    height="4px"
                    cursor="pointer"
                    sx={{
                        appearance: 'none',
                        background: `linear-gradient(to right, #3C5AF0 ${
                            dauer ? (zeit / dauer) * 100 : 0
                        }%, rgba(255,255,255,0.35) 0%)`,
                        borderRadius: 'full',
                        '&::-webkit-slider-thumb': {
                            appearance: 'none',
                            width: '13px',
                            height: '13px',
                            borderRadius: '50%',
                            background: '#fff',
                        },
                        '&::-moz-range-thumb': {
                            width: '13px',
                            height: '13px',
                            border: 'none',
                            borderRadius: '50%',
                            background: '#fff',
                        },
                    }}
                />
            </HStack>
        </Box>
    );
}
