const { Jimp } = require("jimp");

async function removeBg() {
  try {
    const image = await Jimp.read("public/images/logo-raw.jpg");
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // If it's pure or almost pure white, make it transparent
      if (r > 230 && g > 230 && b > 230) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    await image.write("public/images/logo.png");
    console.log("Background removed and saved to logo.png");
  } catch (err) {
    console.error(err);
  }
}

removeBg();
