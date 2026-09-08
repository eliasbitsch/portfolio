# -*- coding: utf-8 -*-
"""Mitziehender Ausschnitt fuer die Linienverfolgung im Gazebo-Fenster.

Anders als im RViz-Fenster gibt es hier keine blaue Costmap. Der Roboter
ist aber das einzige nahezu schwarze Objekt vor hellem Boden, die Waende
sind mittelgrau. Also suchen wir die dunkelsten Pixel, mit einer zweiten,
lockereren Schwelle fuer die Bilder, in denen der Roboter weit weg und
damit klein ist.
"""
import glob
import os

import numpy as np
from PIL import Image

D = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(D, 'lframes')
OUT = os.path.join(D, 'lout')

PANE_W, PANE_H = 488, 578
CROP_W, CROP_H = 320, 250
OUT_W, OUT_H = 512, 400
SMOOTH_S = 1.3
FPS = 30

os.makedirs(OUT, exist_ok=True)
for f in glob.glob(os.path.join(OUT, '*.png')):
    os.remove(f)

files = sorted(glob.glob(os.path.join(SRC, '*.png')))
print('Frames:', len(files))

xs, ys = [], []
for f in files:
    a = np.asarray(Image.open(f).convert('RGB')).astype(np.int16)
    s = a.sum(axis=2)
    hit = None
    for thr in (120, 180, 240):
        m = s < thr
        if m.sum() > 40:
            yy, xx = np.nonzero(m)
            hit = (float(np.median(xx)), float(np.median(yy)))
            break
    if hit:
        xs.append(hit[0])
        ys.append(hit[1])
    else:
        xs.append(np.nan)
        ys.append(np.nan)

xs, ys = np.array(xs), np.array(ys)
print('ohne Fund: %d von %d' % (int(np.isnan(xs).sum()), len(xs)))
idx = np.arange(len(xs))
ok = ~np.isnan(xs)
xs = np.interp(idx, idx[ok], xs[ok])
ys = np.interp(idx, idx[ok], ys[ok])


def smooth(v, win):
    k = np.hanning(win)
    k /= k.sum()
    pad = win // 2
    return np.convolve(np.pad(v, pad, mode='edge'), k, mode='same')[pad:pad + len(v)]


win = int(SMOOTH_S * FPS) | 1
xs_s, ys_s = smooth(xs, win), smooth(ys, win)

cx = np.clip(xs_s - CROP_W / 2, 0, PANE_W - CROP_W)
cy = np.clip(ys_s - CROP_H / 2, 0, PANE_H - CROP_H)
print('Ausschnitt wandert x %.0f bis %.0f, y %.0f bis %.0f'
      % (cx.min(), cx.max(), cy.min(), cy.max()))

for i, f in enumerate(files):
    im = Image.open(f).convert('RGB')
    x, y = int(round(cx[i])), int(round(cy[i]))
    im.crop((x, y, x + CROP_W, y + CROP_H)) \
      .resize((OUT_W, OUT_H), Image.LANCZOS) \
      .save(os.path.join(OUT, 'l_%04d.png' % i))

print('geschrieben:', len(files), 'Bilder nach lout')
