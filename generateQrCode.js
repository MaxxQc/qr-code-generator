const qrcode = require("qrcode");
const Jimp = require("jimp");

const websiteUrl =
  "https://www.zeffy.com/fr-CA/ticketing/02666740-8f49-4212-b2d0-ef910dc01a76";
const logoPath =
  "C:/Users/Maxx_/Downloads/integrale_formats/1000x1000_blanc.png";
const qrCodePath = "./website_qr_code.png";

async function generateQRCodeWithLogo(data, logoPath, outputPath) {
  try {
    // Generate the QR code
    const qrCodeBuffer = await qrcode.toBuffer(data, {
      errorCorrectionLevel: "H",
      scale: 100,
    });

    // Convert the QR code Buffer to a Jimp image
    const qrCode = await Jimp.read(qrCodeBuffer);
    qrCode.resize(1000, 1000);

    // Load the logo
    const logo = await Jimp.read(logoPath);
    logo.resize(269, 269);

    // Create a new image to combine QR code and logo
    const combinedImage = await new Jimp(1000, 1000);
    combinedImage
      .composite(qrCode, 0, 0)
      .composite(
        logo,
        500 - 1 - logo.bitmap.width / 2,
        500 - 1 - logo.bitmap.height / 2
      );

    // Save the final image
    await combinedImage.writeAsync(outputPath);

    console.log(`QR Code with logo generated and saved to ${outputPath}`);
  } catch (error) {
    console.error("Error generating QR Code with logo:", error.message);
  }
}

generateQRCodeWithLogo(websiteUrl, logoPath, qrCodePath);
