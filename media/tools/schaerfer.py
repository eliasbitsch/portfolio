# -*- coding: utf-8 -*-
"""Kartenvideos in der Aufloesung neu rechnen, die die Quelle hergibt.

Ein Handy zeigt eine Karte mit dreifacher Pixeldichte an. Ein Video mit
768 Pixeln Breite wird dort auf etwa 1170 hochgerechnet, und das sieht
weich aus. Die Quellen sind aber 1920x1080 oder 1280x720, es wurde also
unnoetig klein gerechnet.

Nicht fuer alle: Taurob und RobotStudio liegen auf YouTube nur als
640x360 und 640x280 vor, das sind die Originaluploads. Dort ist nichts
zu holen, und Hochrechnen erfindet nur Pixel.
"""
import os
import subprocess

D = os.path.dirname(os.path.abspath(__file__))
VID = os.path.join(D, 'portfolio', 'public', 'videos')
FONT = r'C\:/Windows/Fonts/segoeuib.ttf'


def rechne(quelle, ziel, vf, dauer=None, ss=None, crf='30'):
    cmd = ['ffmpeg', '-y', '-v', 'error']
    if ss is not None:
        cmd += ['-ss', str(ss)]
    if dauer is not None:
        cmd += ['-t', str(dauer)]
    cmd += ['-i', quelle, '-an', '-vf', vf, '-r', '30',
            '-c:v', 'libx264', '-crf', crf, '-preset', 'slow',
            '-pix_fmt', 'yuv420p', '-movflags', '+faststart', ziel]
    subprocess.run(cmd, check=True)
    print('  %-24s %6.0f KB' % (os.path.basename(ziel), os.path.getsize(ziel) / 1024))


print('MetaMove 768x480 -> 1152x720')
rechne(
    os.path.join(D, 'medien', 'metamove', 'metamove-teleoperation-abb-gofa.mov'),
    os.path.join(VID, 'metamove-loop.mp4'),
    "crop=1382:864:430:0,setpts=0.5*PTS,scale=1152:720:flags=lanczos"
    ",drawbox=x=iw-172:y=18:w=156:h=48:color=black@0.6:t=fill"
    ",drawtext=fontfile='{f}':text='2x speed':fontcolor=white:fontsize=29:x=w-156:y=30".format(f=FONT),
    crf='31',
)

print('TurtleBot 960x540 -> 1440x810')
rechne(
    os.path.join(D, 'medien', 'turtlebot4', 'turtlebot4-linearregler-fahrt.mov'),
    os.path.join(VID, 'turtlebot-loop.mp4'),
    "scale=1440:810:flags=lanczos",
    dauer=5.03, ss=0, crf='30',
)

print('Foerderband 768x600 -> 1152x900')
rechne(
    os.path.join(D, 'medien', 'foerderband', 'foerderband-hmi-und-digitaler-zwilling.mp4'),
    os.path.join(VID, 'conveyor-loop.mp4'),
    "crop=1382:1080:269:0,scale=1152:900:flags=lanczos",
    dauer=12, ss=8, crf='31',
)

print('Lichtershow 768x432 -> 1280x720')
rechne(
    os.path.join(D, 'vids', 'zhJGluGIH-M.mp4'),
    os.path.join(VID, 'sumo-loop.mp4'),
    "scale=1280:720:flags=lanczos",
    crf='30',
)

# Standbilder passend zu den neuen Fassungen
for name, ziel, ss in (
    ('metamove-loop.mp4', 'metamove-poster.jpg', 21),
    ('turtlebot-loop.mp4', 'turtlebot-poster.jpg', 2),
    ('conveyor-loop.mp4', 'conveyor-poster.jpg', 4),
    ('sumo-loop.mp4', 'sumo-poster.jpg', 6),
):
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(ss),
                    '-i', os.path.join(VID, name), '-frames:v', '1', '-q:v', '3',
                    os.path.join(D, 'portfolio', 'public', 'images', ziel)], check=True)
print('Standbilder erneuert')
