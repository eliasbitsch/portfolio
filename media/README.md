# media

Originale zu den Bildern und Clips auf der Seite. Liegt bewusst neben
`public/`, wird also nicht ausgeliefert, sondern nur versioniert, damit die
Quellen nicht verloren gehen.

| Datei | Wofuer | Herkunft |
|---|---|---|
| `flexistylus-salz-2026.jpg` | FlexiStylus-Karte | Kay Mueller / Universitaet Salzburg, CC BY-NC 4.0 |
| `salz-2026-stand.png` | SALZ 2026, Standaufnahme | Universitaet Salzburg |
| `circuit-crusher-team.jpg` | Circuit-Crusher, Teamplakat | eigenes Team |
| `monumental-*.jpg` | MONUMENTAL | eigene Aufnahmen |
| `sumo-full.mp4` | Quelle des Sumo-Loops | eigener YouTube-Kanal |
| `ball-balancing-full.mp4` | Quelle des Ball-Loops | eigener YouTube-Kanal |
| `maze-line-follower-full.mp4` | Quelle des Maze-Loops | eigener YouTube-Kanal |
| `turtlebot4-linear-controller.mp4` | Quelle des TurtleBot-Loops | eigene Aufnahme |
| `taurob-tracker-full.mp4` | Quelle des Taurob-Loops | Projektvideo des Teams |
| `robotstudio-full.mp4` | Quelle des RobotStudio-Loops | eigener YouTube-Kanal |
| `portrait/` | Profilbild, Original und Fassungen | eigene Aufnahme |

Die zugeschnittenen und verkleinerten Fassungen, die tatsaechlich
ausgeliefert werden, liegen in `public/images` und `public/videos`.

## tools

`tools/maze_follow.py` erzeugt den ersten Teil des Maze-Loops. Das Skript verfolgt die lokale
Costmap in RViz, die als einzige Flaeche im Fenster deutlich blau ist, glaettet
den Pfad und zieht den Bildausschnitt mit. So bleibt der Roboter im Bild,
statt in einer Gesamtansicht zu verschwinden. Nachvollziehbar, weil der
Loop sonst nur ein fertiges mp4 waere, das niemand mehr neu bauen kann.

`tools/line_follow.py` erzeugt den zweiten Teil, die Linienverfolgung im
Gazebo-Fenster. Dort gibt es keine Costmap, dafuer ist der Roboter das
einzige nahezu schwarze Objekt vor hellem Boden. Beide Teile werden mit
einer kurzen Blende aneinandergehaengt.

`tools/monumental_kenburns.py` baut den MONUMENTAL-Loop. Zwei Standbilder,
jedes mit langsamer Fahrt, dazwischen ein kurzer Schub statt einer Blende.
Der Schluss steht wieder auf dem ersten Bild in Ausgangsgroesse, damit die
Schleife ohne Sprung zurueckspringt.
