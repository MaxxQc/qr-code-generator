const qrcode = require('qrcode');
const Jimp = require('jimp');

const websiteUrl = 'https://integrale.etsmtl.ca';
const logoPath = 'C:/Users/Maxx_/Downloads/logo_contour.png';
const qrCodePath = './output/qr_code.png';

async function generateQRCodeWithLogo(data, logoPath, outputPath) {
  try {
    // Generate the QR code
    const qrCodeBuffer = await qrcode.toBuffer(data, {
      errorCorrectionLevel: 'H',
      scale: 100,
    });

    // Convert the QR code Buffer to a Jimp image
    const qrCode = await Jimp.read(qrCodeBuffer);
    qrCode.resize(1000, 1000);

    // Create a new image to combine QR code and logo
    const combinedImage = await new Jimp(1000, 1000);
    combinedImage.composite(qrCode, 0, 0);

    // Save the final image
    await combinedImage.writeAsync(outputPath);

    console.log(`QR Code with logo generated and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error generating QR Code with logo:', error.message);
  }
}

generateQRCodeWithLogo(websiteUrl, logoPath, qrCodePath);
