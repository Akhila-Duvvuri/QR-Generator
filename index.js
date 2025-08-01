import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message: "Enter the URL to generate a QR code: ",
        name: "url"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.url;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'))
    .on('finish', () => {
        console.log('QR code image generated as qr_img.png');
      })
      .on('error', (err) => {
        console.error('Error writing image file:', err);
      });

      fs.writeFile('qr_image.txt', url, (err) => {
        if (err) throw err;
        console.log('URL saved to qr_image.txt');
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });