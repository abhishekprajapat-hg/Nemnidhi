const { Jimp } = require("jimp");

async function cropFavicon() {
  try {
    const image = await Jimp.read("app/icon.png");
    
    // Attempt autocrop first. If it has a transparent or solid background, this trims the padding.
    // By default autocrop trims based on the top-left pixel color.
    image.autocrop();
    
    // Ensure it's a perfect square
    const size = Math.max(image.bitmap.width, image.bitmap.height);
    // Create a new blank (transparent) square image
    const square = new Jimp({ width: size, height: size, color: 0x00000000 });
    
    // Composite the cropped image into the center of the square
    const x = (size - image.bitmap.width) / 2;
    const y = (size - image.bitmap.height) / 2;
    square.composite(image, x, y);
    
    // Optionally resize for favicon standard
    square.resize({ w: 512, h: 512 });

    await square.write("app/icon.png");
    
    // Only write PNG
    // Removed favicon.ico write
    
    console.log("Favicon cropped and zoomed in!");
  } catch (err) {
    console.error("Error cropping:", err);
  }
}

cropFavicon();
