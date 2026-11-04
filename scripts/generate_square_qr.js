const QRCode = require('qrcode');
const fs = require('fs');

async function genSquare() {
  const targetUrl = 'https://google-review-automation-nu.vercel.app/r/mitro-ka-manch';
  const qrSvg = await QRCode.toString(targetUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 1,
    color: {
      dark: '#C04516',
      light: '#FFFFFF'
    }
  });

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 512px;
    height: 512px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 24px;
    border-radius: 40px;
    border: 8px solid #C04516;
  }
  .svg-wrap {
    width: 100%;
    height: 100%;
  }
  .svg-wrap svg {
    width: 100%;
    height: 100%;
  }
  .center-logo {
    position: absolute;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 4px solid #C04516;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    overflow: hidden;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .center-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
</style>
</head>
<body>
  <div class="svg-wrap">
    ${qrSvg}
  </div>
  <div class="center-logo">
    <img src="file:///home/luca/Workspace/04_Projects_and_Apps/google-review-automation/public/assets/mitro-logo.png" alt="Mitro ka Manch Logo">
  </div>
</body>
</html>`;

  fs.writeFileSync('/tmp/mitro_square_qr.html', html);
  console.log('Saved /tmp/mitro_square_qr.html');
}
genSquare();
