# PostureGotchi 🐾

A fun, interactive website about posture correction designed specifically for high school students, inspired by the classic Tamagotchi game!

## Features

- **Why Posture Matters**: Educational content explaining the importance of good posture
- **Bad Posture Examples**: Visual examples of common posture mistakes (with space for your photos!)
- **Character Introductions**: Meet Spiney, Necky, Shoulderz, and Leggy - your posture companions
- **Data Points**: Real statistics about posture and its impact
- **Interactive Game**: Play with your PostureGotchi character and track your posture improvement

## Getting Started

1. Open `index.html` in your web browser
2. That's it! No installation needed - it's a static website.

## Adding Your Photos

The website currently uses placeholder images from Unsplash. To add your own photos:

1. Take photos of bad posture examples with your phone
2. Save them in a folder called `images/` in this directory
3. Update the `src` attributes in `index.html` for the example images:
   - Line ~108: Desk slouch image
   - Line ~118: Text neck image
   - Line ~128: Leg crosser image
   - Line ~138: Good posture image

Example:
```html
<img src="images/desk-slouch.jpg" alt="Slouching at desk" />
```

## Customization

- **Colors**: Edit the CSS variables in `styles.css` (lines 8-15)
- **Content**: Modify the HTML in `index.html`
- **Game Logic**: Adjust the JavaScript in `script.js`

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge)

## Design Inspiration

The design is inspired by the original Tamagotchi with:
- Cute, pixelated character designs
- Bright, playful colors
- Interactive game elements
- Fun animations and effects

Enjoy your PostureGotchi journey! 🎮✨

