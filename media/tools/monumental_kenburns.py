# -*- coding: utf-8 -*-
"""MONUMENTAL: zwei Standbilder mit Fahrt statt einer langsamen Blende.

Die alte Fassung loeste sieben Sekunden lang ein Bild ins andere auf. Das
sieht aus wie ein Bilderrahmen im Wartezimmer, weil sich nichts bewegt und
der Wechsel kein Ereignis ist. Hier bekommt jedes Bild eine langsame
Fahrt nach vorn, und gewechselt wird hart per Schub statt per Blende.

Der Schluss steht wieder auf dem ersten Bild in Ausgangsgroesse. Damit
faellt beim Zuruecklaufen der Schleife das Ende genau auf den Anfang und
der sonst uebliche Sprung entfaellt.
"""
import os

from PIL import Image

D = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(D, 'kb')
os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT):
    os.remove(os.path.join(OUT, f))

W, H = 768, 600
FPS = 30
ZOOM = 1.10
SHOT_S = 3.4          # Fahrt pro Bild
SLIDE_S = 0.28        # Schub beim Wechsel, kurz genug um als Schnitt zu wirken
TAIL_S = 0.7          # Ausklang auf Bild eins, damit die Schleife passt

MEDIA = os.path.join(D, 'portfolio', 'media')
SHOTS = [
    os.path.join(MEDIA, 'monumental-hmi-tablet.jpg'),
    os.path.join(MEDIA, 'monumental-gamepad.jpg'),
]


def base(path):
    """Auf das Kartenformat beschneiden und auf Zoomreserve bringen."""
    im = Image.open(path).convert('RGB')
    iw, ih = im.size
    want = W / H
    if iw / ih > want:
        nw = int(ih * want)
        im = im.crop(((iw - nw) // 2, 0, (iw - nw) // 2 + nw, ih))
    else:
        nh = int(iw / want)
        im = im.crop((0, (ih - nh) // 2, iw, (ih - nh) // 2 + nh))
    return im.resize((int(W * ZOOM * 2), int(H * ZOOM * 2)), Image.LANCZOS)


def frame(img, z):
    """Ausschnitt bei Zoomfaktor z, mittig."""
    bw, bh = img.size
    cw, ch = bw / z * (1 / ZOOM), bh / z * (1 / ZOOM)
    x, y = (bw - cw) / 2, (bh - ch) / 2
    return img.crop((int(x), int(y), int(x + cw), int(y + ch))).resize((W, H), Image.LANCZOS)


def ease(t):
    return t * t * (3 - 2 * t)


bases = [base(p) for p in SHOTS]
frames = []

n_shot = int(SHOT_S * FPS)
n_slide = int(SLIDE_S * FPS)
n_tail = int(TAIL_S * FPS)

# Bild 1 und Bild 2, jeweils mit Fahrt, dazwischen der Schub
for i, b in enumerate(bases):
    for k in range(n_shot):
        z = 1.0 + (ZOOM - 1.0) * ease(k / (n_shot - 1))
        frames.append(frame(b, z))
    nxt = bases[(i + 1) % len(bases)]
    for k in range(n_slide):
        t = ease((k + 1) / n_slide)
        # Das alte Bild wird hinausgeschoben, das neue kommt nach.
        cur = frame(b, ZOOM)
        new = frame(nxt, 1.0)
        canvas = Image.new('RGB', (W, H))
        off = int(W * t)
        canvas.paste(cur, (-off, 0))
        canvas.paste(new, (W - off, 0))
        frames.append(canvas)

# Ausklang auf Bild eins in Ausgangsgroesse, damit die Schleife schliesst
still = frame(bases[0], 1.0)
frames.extend([still] * n_tail)

for i, f in enumerate(frames):
    f.save(os.path.join(OUT, 'k_%04d.png' % i))
print('%d Bilder, %.1f Sekunden' % (len(frames), len(frames) / FPS))
