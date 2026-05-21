// The link for the QR Code
const websiteUrl = 'https://integrale.etsmtl.ca';

// The path to the logo image
// Use undefined if you don't want to include a logo
const logoPath = undefined; // './path/to/logo.png';

// The path where the generated QR code will be saved
const qrCodePath = './output/qr_code.png';

// Margin around the QR code in pixels
// Default 4
const margin = 1;

// Color of the QR code
// Default black #000000
const color = '#0061ff';

// ############################
// Do not edit
// ############################
const qrcode = require('qrcode');
const { Jimp } = require('jimp');

const generateQRCodeWithLogo = async (data, logoPath, outputPath) => {
  try {
    // Generate the QR code
    const qrCodeBuffer = await qrcode.toBuffer(data, {
      errorCorrectionLevel: 'H',
      scale: 100,
      width: 1000,
      height: 1000,
      margin: margin,
      color: {
        dark: color,
        light: '#FFFFFF',
      },
    });

    // Convert the QR code Buffer to a Jimp image
    const qrCode = await Jimp.read(qrCodeBuffer);

    // Load the logo
    const logo = logoPath === undefined ? undefined : await Jimp.read(logoPath);

    if (logo) {
      logo.resize({ w: 269, h: 269 });
    }

    // Create a new image to combine QR code and logo
    const combinedImage = await new Jimp({ width: 1000, height: 1000 });
    combinedImage.composite(qrCode, 0, 0);

    if (logo) {
      combinedImage.composite(
        logo,
        500 - 1 - logo.bitmap.width / 2,
        500 - 1 - logo.bitmap.height / 2,
      );
    }

    // Save the final image
    await combinedImage.write(outputPath);

    console.log(`QR Code generated and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error generating QR Code:', error.message);
  }
};

generateQRCodeWithLogo(websiteUrl, logoPath, qrCodePath);
