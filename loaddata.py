# Script to load map data into an html file

import bs4
import csv
import re
import sys

if __name__ == "__main__":
    try:
        fname = sys.argv[1]
    except:
        fname = "res/maps.csv"
    
    # Load song data
    songs = {}
    with open(fname, 'r') as file:
        reader = csv.reader(file)
        # next(reader)
        for row in reader:
            data = row[1:5]
            if ''.join(data):
                title, artist, mapper, bpm = data
                songs[title] = {
                    "title": title,
                    "artist": artist,
                    "bpm": bpm,
                    "mapper": mapper
                }

    # Open HTML file and edit
    with open("update.html", 'r') as file:
        text = file.read()
    
    newtext = re.sub(r'<script id="map-data" type="text/javascript">.*</script>',
        r'<script id="map-data" type="text/javascript">var MapData = ' +
        repr(songs) + r';</script>', text)
    
    with open("update.html", 'w') as file:
        file.write(newtext)