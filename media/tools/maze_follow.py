# -*- coding: utf-8 -*-
"""Mitziehender Bildausschnitt fuer den Maze-Clip.

Der blaue Kasten in RViz ist die lokale Costmap und haengt am Roboter.
Er ist die einzige Flaeche im linken Fenster, deren Blaukanal deutlich
ueber Rot und Gruen liegt, also laesst er sich ohne Modell finden. Aus
seiner Lage pro Bild entsteht ein geglaetteter Pfad, und daran haengt der
Ausschnitt.

Geglaettet wird grosszuegig: eine Kamera, die jedem Ruckler des Roboters
folgt, ist unruhiger als eine, die etwas nachlaeuft.
"""
import glob
import os

import numpy as np
from PIL import Image

D = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(D, 'frames30')
OUT = os.path.join(D, 'out30')

PANE_W, PANE_H = 640, 578      # Inhalt des RViz-Fensters, ohne Fensterrahmen
# Das Labyrinth fuellt das Fenster nicht aus, drumherum liegt grauer
# RViz-Hintergrund. Der Ausschnitt darf diese Flaeche nicht verlassen,
# sonst schiebt sich beim Verfolgen leere Flaeche ins Bild.
MAZE = (98, 76, 560, 528)      # links, oben, rechts, unten im Fenster
CROP_W, CROP_H = 384, 300      # Ausschnitt in Quellpixeln
OUT_W, OUT_H = 512, 400        # Ausgabe, leicht verkleinert also scharf
SMOOTH_S = 1.1                 # Glaettungsfenster in Sekunden
FPS = 30

os.makedirs(OUT, exist_ok=True)
for f in glob.glob(os.path.join(OUT, '*.png')):
    os.remove(f)

files = sorted(glob.glob(os.path.join(SRC, '*.png')))
print('Frames:', len(files))

# ---------------------------------------------------------------- verfolgen
xs, ys, sizes = [], [], []
for f in files:
    a = np.asarray(Image.open(f).convert('RGB')).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mask = (b > 120) & (b - r > 70) & (b - g > 70)
    n = int(mask.sum())
    sizes.append(n)
    # Zu klein heisst nicht gefunden, zu gross heisst die RViz-Kamera steht
    # nah dran und faerbt das halbe Fenster blau. Beides taugt nicht als Ort.
    if 1500 < n < 40000:
        yy, xx = np.nonzero(mask)
        xs.append(float(np.median(xx)))
        ys.append(float(np.median(yy)))
    else:
        xs.append(np.nan)
        ys.append(np.nan)

xs, ys = np.array(xs), np.array(ys)
bad = int(np.isnan(xs).sum())
print('ohne brauchbaren Fund: %d von %d' % (bad, len(xs)))

# Luecken linear ueberbruecken
idx = np.arange(len(xs))
ok = ~np.isnan(xs)
if not ok.any():
    raise SystemExit('Roboter nirgends gefunden')
xs = np.interp(idx, idx[ok], xs[ok])
ys = np.interp(idx, idx[ok], ys[ok])


def smooth(v, win):
    k = np.hanning(win)
    k /= k.sum()
    pad = win // 2
    return np.convolve(np.pad(v, pad, mode='edge'), k, mode='same')[pad:pad + len(v)]


win = int(SMOOTH_S * FPS) | 1
xs_s, ys_s = smooth(xs, win), smooth(ys, win)

# ---------------------------------------------------------------- schneiden
mx0, my0, mx1, my1 = MAZE
cx = np.clip(xs_s - CROP_W / 2, mx0, max(mx0, mx1 - CROP_W))
cy = np.clip(ys_s - CROP_H / 2, my0, max(my0, my1 - CROP_H))

print('Ausschnitt wandert x %.0f bis %.0f, y %.0f bis %.0f'
      % (cx.min(), cx.max(), cy.min(), cy.max()))

for i, f in enumerate(files):
    im = Image.open(f).convert('RGB')
    x, y = int(round(cx[i])), int(round(cy[i]))
    im.crop((x, y, x + CROP_W, y + CROP_H)) \
      .resize((OUT_W, OUT_H), Image.LANCZOS) \
      .save(os.path.join(OUT, 'o_%04d.png' % i))

print('geschrieben:', len(files), 'Bilder nach out30')
