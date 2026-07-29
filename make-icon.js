const sharp = require('sharp');

async function createIcon() {
  try {
    await sharp('public/logo.png')
      .resize(200, 200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .flatten({ background: '#ffffff' })
      .extend({
        top: 28, bottom: 28, left: 28, right: 28,
        background: '#ffffff'
      })
      .resize(256, 256)
      .png()
      .toFile('app/icon.png');
      
    console.log('Icon created successfully!');
  } catch (err) {
    console.error('Error creating icon:', err);
  }
}

createIcon();
