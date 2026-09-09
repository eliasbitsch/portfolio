# -*- coding: utf-8 -*-
"""Kartenvideo fuer Taurob: fuenf Stellen aus dem Projektvideo.

Eine einzelne Stelle zeigt entweder den Roboter oder die Erkennung,
nie beides. Die Montage nimmt aus jedem Abschnitt vier Sekunden und
blendet weich um, damit die Karte in einer Schleife zeigt, worum es
geht: Bedienung, Wahrnehmung, Maschine, Anfahrt, Griff.
"""
import os
import subprocess

D = os.path.dirname(os.path.abspath(__file__))
QUELLE = os.path.join(D, 'vids', 'taurob.mp4')
ZIEL = os.path.join(D, 'vids', 'taurob-loop.mp4')
W, H, DAUER, BLENDE = 460, 360, 4.0, 0.4

# (Startsekunde, Ausschnitt links) - der Bildausschnitt folgt dem, was
# in der jeweiligen Stelle wichtig ist.
AKTE = [
    (34.0, 90),    # Bedienung ueber Gamepad
    (48.8, 90),    # Ventilerkennung mit YOLO
    (81.0, 60),    # der Roboter als Ganzes
    (105.0, 140),  # Anfahrt an das Ventil
    (117.0, 120),  # Greifen
]

teile = []
for i, (start, x) in enumerate(AKTE):
    out = os.path.join(D, 'vids', '_tb_%d.mp4' % i)
    subprocess.run(
        ['ffmpeg', '-y', '-v', 'error', '-ss', str(start), '-t', str(DAUER),
         '-i', QUELLE, '-an',
         '-vf', 'crop=%d:%d:%d:0,scale=460:360:flags=lanczos' % (W, H, x),
         '-r', '30', '-c:v', 'libx264', '-crf', '23', '-preset', 'medium',
         '-pix_fmt', 'yuv420p', out], check=True)
    teile.append(out)

eingaben = []
for t in teile:
    eingaben += ['-i', t]
filt, letzte, offset = [], '0:v', 0.0
for i in range(1, len(teile)):
    offset += DAUER - (BLENDE if i > 1 else 0)
    label = 'x%d' % i
    filt.append('[%s][%d:v]xfade=transition=fade:duration=%s:offset=%.3f[%s]'
                % (letzte, i, BLENDE, offset - BLENDE, label))
    letzte = label
filt.append('[%s]format=yuv420p[v]' % letzte)

subprocess.run(['ffmpeg', '-y', '-v', 'error'] + eingaben +
               ['-filter_complex', ';'.join(filt), '-map', '[v]', '-r', '30',
                '-c:v', 'libx264', '-crf', '27', '-preset', 'slow',
                '-movflags', '+faststart', ZIEL], check=True)
for t in teile:
    os.remove(t)
print('%d Akte, %.0f KB' % (len(AKTE), os.path.getsize(ZIEL) / 1024))
