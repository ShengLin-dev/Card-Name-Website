# Doraemon 3D Holo Showcase

A simple interactive 3D holographic Doraemon trading card made with
HTML, CSS, and JavaScript.

## Features

-   Interactive 3D card tilt/parallax
-   Holographic foil effects
-   Multiple card themes and frame styles
-   Flip card front/back
-   Auto orbit animation
-   Mobile gyroscope support
-   Edit card text directly
-   Upload custom artwork
-   Drag & drop artwork
-   Adjust 3D, glow, foil, and artwork settings
-   Export the card as a high-resolution PNG

## Project Structure

``` text
project/
├── index.html
├── script.js
├── style.css
└── reference/
    └── 1.png
```

## How to Run

This is a static web project, so no backend is required.

You can open `index.html` directly in a browser, or run it with a local
server such as VS Code Live Server.

## Main Controls

### Style & Foil

Change:

-   Holographic effect
-   Theme
-   Card frame
-   Character artwork

### Fine-Tuning

Adjust:

-   3D tilt
-   Depth
-   Foil intensity
-   Glare
-   Card glow
-   Artwork position and appearance

### Card Content

Edit the card information and abilities.

You can also edit supported text directly on the card.

## Export

Click **Export High-Resolution PNG** to save the card as a PNG image.

The project uses `html2canvas` for the export.

## Technologies

-   HTML5
-   CSS3
-   JavaScript
-   html2canvas
-   Font Awesome
-   Google Fonts

## Notes

The default artwork is loaded from:

``` text
reference/1.png
```

Make sure the image exists in that location, or upload your own artwork
through the interface.

## Credits

Doraemon and related characters/artwork belong to their respective
copyright and trademark owners.

This project is intended as a personal/demo project.
