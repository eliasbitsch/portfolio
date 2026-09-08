# -*- coding: utf-8 -*-
"""Kartenclips aus langen Aufnahmen schneiden.

Drei Dinge machen den Unterschied zwischen einer Aufnahme und einem
Clip: nur die Stellen nehmen, an denen etwas passiert, in jeder Stelle
langsam naeher gehen, und weich statt hart wechseln.

Die Fahrt laeuft ueber `crop` mit Ausdruecken in `t`, nicht ueber
zoompan. zoompan rechnet in ganzen Pixeln und ruckelt dabei sichtbar.

Aufruf: schnitt.py <name>
"""
import os
import subprocess
import sys

D = os.path.dirname(os.path.abspath(__file__))

# name -> (quelle, ausgabe, breite, hoehe, [(start, dauer, mitte_x, mitte_y, zoom)])
# mitte_x/y sind Anteile der Bildbreite/-hoehe, zoom ist der Faktor am
# Ende der Fahrt.
CLIPS = {
    'metamove': (
        'medien/metamove/metamove-teleoperation-abb-gofa.mov',
        'vids/metamove-loop.mp4', 768, 600,
        [
            # Die Zeiten sind nicht geschaetzt. Die Bewegung des Arms im
            # Bild wurde gemessen, der Wechsel von schnell auf langsam
            # liegt bei 9,3 und bei 23,4 Sekunden. Beide Abschnitte
            # enthalten einen davon.
            (5.5, 6.0, 0.42, 0.50, 1.14,
             'Bare-hand control: Meta Quest 3 to ABB GoFa'),
            (20.5, 7.0, 0.36, 0.50, 1.12,
             'Distance-based speed scaling: closer operator, slower robot'),
            (54.0, 6.0, 0.46, 0.48, 1.16,
             'Live digital twin over ROS 2, EGM at 250 Hz'),
        ],
    ),
}

BLENDE = 0.5
FONT = r'C\:/Windows/Fonts/segoeuib.ttf'


def bauen(name):
    quelle, ziel, W, H, akte = CLIPS[name]
    teile = []
    for i, (start, dauer, cx, cy, zoom, text) in enumerate(akte):
        out = os.path.join(D, 'vids', '_akt_%s_%d.mp4' % (name, i))
        # Erst fest auf das Zielverhaeltnis beschneiden, dann die Fahrt.
        # `crop` wertet Breite und Hoehe nur beim Start aus, dort gibt es
        # kein `t`, also kann die Fahrt nicht von crop kommen. zoompan
        # rechnet pro Bild, und weil vorher auf die doppelte Zielgroesse
        # skaliert wird, faellt das Runden auf ganze Pixel nicht auf.
        schritte = int(dauer * 30)
        vf = (
            "crop=w='min(iw,ih*{ar})':h='min(iw/{ar},ih)':"
            "x='(iw-out_w)*{cx}':y='(ih-out_h)*{cy}',"
            "scale={W2}:{H2}:flags=lanczos,"
            "zoompan=z='min(zoom+{schritt:.6f},{zoom})':d=1:"
            "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={W}x{H}:fps=30"
        ).format(ar=W / H, cx=cx, cy=cy, W2=W * 2, H2=H * 2,
                 schritt=(zoom - 1) / schritte, zoom=zoom, W=W, H=H)
        if text:
            sicher = text.replace(':', r'\:').replace("'", r"'")
            vf += (
                ",drawbox=x=0:y=ih-84:w=iw:h=84:color=black@0.55:t=fill"
                ",drawtext=fontfile='{f}':text='{t}':fontcolor=white:"
                "fontsize=25:x=(w-text_w)/2:y=h-54"
            ).format(f=FONT, t=sicher)
        cmd = ['ffmpeg', '-y', '-v', 'error', '-ss', str(start), '-t', str(dauer),
               '-i', os.path.join(D, quelle), '-an', '-vf', vf,
               '-r', '30', '-c:v', 'libx264', '-crf', '23', '-preset', 'medium',
               '-pix_fmt', 'yuv420p', out]
        r = subprocess.run(cmd, capture_output=True)
        if r.returncode:
            raise SystemExit(r.stderr.decode()[:500])
        teile.append((out, dauer))

    # Mit weichen Blenden aneinanderhaengen
    eingaben = []
    for p, _ in teile:
        eingaben += ['-i', p]
    filt, letzte, offset = [], '0:v', 0.0
    for i in range(1, len(teile)):
        offset += teile[i - 1][1] - (BLENDE if i > 1 else 0)
        label = 'x%d' % i
        filt.append('[%s][%d:v]xfade=transition=fade:duration=%s:offset=%.3f[%s]'
                    % (letzte, i, BLENDE, offset - BLENDE, label))
        letzte = label
    filt.append('[%s]format=yuv420p[v]' % letzte)
    cmd = ['ffmpeg', '-y', '-v', 'error'] + eingaben + \
          ['-filter_complex', ';'.join(filt), '-map', '[v]', '-r', '30',
           '-c:v', 'libx264', '-crf', '28', '-preset', 'slow',
           '-movflags', '+faststart', os.path.join(D, ziel)]
    r = subprocess.run(cmd, capture_output=True)
    if r.returncode:
        raise SystemExit(r.stderr.decode()[:500])
    for p, _ in teile:
        os.remove(p)
    kb = os.path.getsize(os.path.join(D, ziel)) / 1024
    print('%s: %d Akte, %.0f KB -> %s' % (name, len(akte), kb, ziel))


for name in (sys.argv[1:] or CLIPS.keys()):
    bauen(name)
