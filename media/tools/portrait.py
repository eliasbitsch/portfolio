# -*- coding: utf-8 -*-
"""Profilbild: quadratisch zuschneiden, Hintergrund weich, Kreisfassung.

Ohne Freistellmodell laesst sich der Hintergrund nicht exakt vom Motiv
trennen. Statt das vorzutaeuschen, wird die Schaerfe nach aussen hin
abgebaut, so wie es eine offene Blende auch tut: in der Mitte scharf,
zum Rand hin zunehmend weich. Der Kopf sitzt im scharfen Bereich, Kabel,
Schrank und Maschinen liegen aussen und verschwinden im Unscharfen.
"""
import os

import numpy as np
from PIL import Image, ImageFilter

SRC = 'C:/Users/BitschE/Downloads/IMG_20250818_102936.JPG'
D = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(D, 'portrait')
os.makedirs(OUT, exist_ok=True)

SIZE = 900                  # Ausgabekante
BLUR = 20                   # Staerke des weichen Hintergrunds
# Scharfe Zone als Ellipse in Anteilen der Kante. Etwas hoeher als die
# Mitte, weil das Gesicht oben sitzt, und unten breiter fuer die Schultern.
E_CX, E_CY = 0.50, 0.44
E_RX, E_RY = 0.40, 0.46
FEATHER = 0.22

# Quadrat im Original. Mittelpunkt liegt auf dem Gesicht, die Kante ist so
# gewaehlt, dass Kopf und Schultern hineinpassen.
# Enger als eine Portraetaufnahme, weil das Bild fast immer klein und rund
# ausgegeben wird. Bei 160 Pixeln Durchmesser bleibt vom Gesicht sonst kaum
# etwas uebrig, und die Ecken schneidet der Kreis ohnehin weg.
CROP_CX, CROP_CY, CROP_SIDE = 1075, 1165, 980

im = Image.open(SRC).convert('RGB')
W, H = im.size
half = CROP_SIDE // 2
x0 = max(0, min(W - CROP_SIDE, CROP_CX - half))
y0 = max(0, min(H - CROP_SIDE, CROP_CY - half))
sq = im.crop((x0, y0, x0 + CROP_SIDE, y0 + CROP_SIDE)).resize((SIZE, SIZE), Image.LANCZOS)
print('Ausschnitt im Original: x %d..%d, y %d..%d von %dx%d'
      % (x0, x0 + CROP_SIDE, y0, y0 + CROP_SIDE, W, H))

blur = sq.filter(ImageFilter.GaussianBlur(BLUR))

# Weiche Maske: 1 in der Ellipse, ueber FEATHER auf 0 fallend
yy, xx = np.mgrid[0:SIZE, 0:SIZE].astype(np.float32) / SIZE
d = np.sqrt(((xx - E_CX) / E_RX) ** 2 + ((yy - E_CY) / E_RY) ** 2)
m = np.clip((1.0 + FEATHER - d) / FEATHER, 0.0, 1.0)
m = m * m * (3 - 2 * m)                       # sanfter Ein- und Ausstieg
mask = Image.fromarray((m * 255).astype(np.uint8), 'L')

sharp_on_soft = Image.composite(sq, blur, mask)

# Quadrat, fuer Dienste die selbst rund beschneiden
sharp_on_soft.save(os.path.join(OUT, 'profile-square.jpg'), quality=92, subsampling=0)

# Kreisfassung mit weichem Rand, transparent ausserhalb
circ = np.zeros((SIZE, SIZE), np.float32)
r = np.sqrt((xx - 0.5) ** 2 + (yy - 0.5) ** 2) * 2      # 1.0 am Kreisrand
circ = np.clip((1.0 - r) / (2.0 / SIZE), 0.0, 1.0)      # eine Pixelbreite weich
alpha = Image.fromarray((circ * 255).astype(np.uint8), 'L')
rgba = sharp_on_soft.convert('RGBA')
rgba.putalpha(alpha)
rgba.save(os.path.join(OUT, 'profile-circle.png'))

for f in sorted(os.listdir(OUT)):
    print('  %-22s %6.0f KB' % (f, os.path.getsize(os.path.join(OUT, f)) / 1024))
