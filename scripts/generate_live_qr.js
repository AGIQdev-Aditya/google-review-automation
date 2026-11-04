const QRCode = require('qrcode');
const fs = require('fs');
const { spawn } = require('child_process');

async function generatePersonalizedQr() {
  const targetUrl = 'https://lime-cookies-ethical-operate.trycloudflare.com/r/mitro-ka-manch';
  console.log('Generating QR code for:', targetUrl);

  // 1. Generate SVG data
  const qrSvg = await QRCode.toString(targetUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#1C1917',
      light: '#FFFFFF'
    }
  });

  // 2. Create standalone HTML with embedded circular logo and flyer design
  const flyerHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 600px;
    height: 850px;
    background: #FFF6EE;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .card {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 36px;
    border: 3px solid rgba(192, 69, 22, 0.25);
    box-shadow: 0 25px 60px rgba(192, 69, 22, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 40px 32px 32px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .top-glow {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 320px;
    height: 200px;
    background: radial-gradient(circle, rgba(234, 88, 12, 0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .logo-wrap {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(192, 69, 22, 0.25);
    margin-bottom: 12px;
  }
  .logo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .brand-name {
    font-size: 28px;
    font-weight: 900;
    color: #C04516;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .brand-location {
    font-size: 13px;
    font-weight: 700;
    color: #1C1917;
    margin-bottom: 8px;
  }
  .stars {
    color: #E0A93B;
    font-size: 24px;
    letter-spacing: 6px;
    margin-bottom: 20px;
  }
  .qr-frame {
    position: relative;
    width: 270px;
    height: 270px;
    background: #FFFFFF;
    border-radius: 28px;
    border: 2.5px solid #C04516;
    box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
  }
  .qr-svg-wrap {
    width: 100%;
    height: 100%;
  }
  .qr-svg-wrap svg {
    width: 100%;
    height: 100%;
  }
  .qr-center-logo {
    position: absolute;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 2px solid #C04516;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    overflow: hidden;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qr-center-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .cta-badge {
    margin-top: 18px;
    background: #C04516;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 24px;
    border-radius: 50px;
    box-shadow: 0 6px 18px rgba(192, 69, 22, 0.35);
  }
  .instructions {
    margin-top: 16px;
    font-size: 13px;
    font-weight: 600;
    color: #4B5563;
    line-height: 1.5;
  }
  .instructions strong {
    color: #1C1917;
  }
  .footer-row {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(0,0,0,0.08);
    padding-top: 14px;
    font-size: 11px;
    font-weight: 700;
    color: #6B7280;
  }
  .ig-tag {
    color: #C04516;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="top-glow"></div>
    <div class="logo-wrap">
      <img src="file:///home/luca/Workspace/04_Projects_and_Apps/google-review-automation/public/assets/mitro-logo.png" class="logo-img" alt="Mitro ka Manch">
    </div>
    <h1 class="brand-name">MITRO KA MANCH</h1>
    <p class="brand-location">Dadar West, Mumbai • Kirti College Area</p>
    <div class="stars">★ ★ ★ ★ ★</div>

    <div class="qr-frame">
      <div class="qr-svg-wrap">
        ${qrSvg}
      </div>
      <div class="qr-center-logo">
        <img src="file:///home/luca/Workspace/04_Projects_and_Apps/google-review-automation/public/assets/mitro-logo.png" alt="Logo">
      </div>
    </div>

    <div class="cta-badge">⚡ SCAN TO REVIEW IN 5 SECONDS</div>

    <p class="instructions">
      Point your smartphone camera at the QR code<br>
      Pick your snacks, copy draft & tap <strong>Post to Google</strong>!
    </p>

    <div class="footer-row">
      <span class="ig-tag">📸 Instagram: @mitro_ka_manch</span>
      <span>⭐ Powered by TrueReview</span>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync('/tmp/mitro_flyer.html', flyerHtml);
  console.log('Saved /tmp/mitro_flyer.html');
}

generatePersonalizedQr();
