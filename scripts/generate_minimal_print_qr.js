const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function buildMinimalPrintableAssets() {
  const targetUrl = 'https://google-review-automation-nu.vercel.app/r/mitro-ka-manch';
  console.log('Generating minimal printable QR assets for:', targetUrl);

  // 1. Read Mitro Logo and base64 encode
  const logoPath = path.join(__dirname, '../public/assets/mitro-logo.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

  // 2. Generate high-density SVG QR code with Level H error correction (30% redundancy)
  const qrSvg = await QRCode.toString(targetUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#18181B', // Deep obsidian for highest barcode scanner contrast
      light: '#FFFFFF'
    }
  });

  // =========================================================================
  // DESIGN 1: Minimalist A5 / Counter Stand Flyer (Clean, Luxurious, Print-Ready)
  // =========================================================================
  const standHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Mitro ka Manch — Minimalist Review Stand</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');

  @media print {
    body { padding: 0 !important; background: #FFFFFF !important; }
    .no-print { display: none !important; }
    .canvas { border: none !important; box-shadow: none !important; }
  }

  .print-bar {
    position: fixed;
    top: 14px;
    right: 14px;
    z-index: 1000;
  }

  .print-btn {
    background: #18181B;
    color: #FFFFFF;
    border: none;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 700;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: inherit;
  }
  .print-btn:hover { background: #C04516; }

  @media print {
    body { padding: 0 !important; background: #FFFFFF !important; }
    .no-print { display: none !important; }
    .sticker { border: none !important; box-shadow: none !important; }
  }

  .print-bar {
    position: fixed;
    top: 14px;
    right: 14px;
    z-index: 1000;
  }

  .print-btn {
    background: #18181B;
    color: #FFFFFF;
    border: none;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 700;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: inherit;
  }
  .print-btn:hover { background: #C04516; }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    width: 800px;
    height: 1130px;
    background: #FFFFFF;
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    color: #18181B;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 36px;
    margin: 0 auto;
  }

  .canvas {
    width: 100%;
    height: 100%;
    background: #FAFAFA;
    border: 1px solid #E4E4E7;
    border-radius: 32px;
    padding: 48px 44px 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  }

  /* Elegant Corner Accents */
  .corner-tl { position: absolute; top: 20px; left: 20px; width: 14px; height: 14px; border-top: 2px solid #C04516; border-left: 2px solid #C04516; }
  .corner-tr { position: absolute; top: 20px; right: 20px; width: 14px; height: 14px; border-top: 2px solid #C04516; border-right: 2px solid #C04516; }
  .corner-bl { position: absolute; bottom: 20px; left: 20px; width: 14px; height: 14px; border-bottom: 2px solid #C04516; border-left: 2px solid #C04516; }
  .corner-br { position: absolute; bottom: 20px; right: 20px; width: 14px; height: 14px; border-bottom: 2px solid #C04516; border-right: 2px solid #C04516; }

  /* Header Section */
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .logo-wrapper {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 2.5px solid #C04516;
    padding: 3px;
    margin-bottom: 16px;
    box-shadow: 0 4px 14px rgba(192, 69, 22, 0.12);
  }

  .logo-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .brand-title {
    font-family: 'Sora', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #C04516;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .brand-sub {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #71717A;
    margin-bottom: 12px;
  }

  .stars-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #FFFFFF;
    border: 1px solid #E4E4E7;
    padding: 6px 16px;
    border-radius: 100px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
  }

  .stars {
    color: #F59E0B;
    font-size: 14px;
    letter-spacing: 2px;
  }

  .rating-score {
    font-size: 11px;
    font-weight: 800;
    color: #18181B;
    letter-spacing: 0.5px;
  }

  /* Center Stage: Minimalist QR Container */
  .qr-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 12px 0;
  }

  .qr-card {
    position: relative;
    width: 320px;
    height: 320px;
    background: #FFFFFF;
    border: 1.5px solid #E4E4E7;
    border-radius: 28px;
    padding: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  }

  .qr-svg {
    width: 100%;
    height: 100%;
  }

  .qr-svg svg {
    width: 100%;
    height: 100%;
  }

  .qr-center-emblem {
    position: absolute;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 2px solid #C04516;
    padding: 2px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .qr-center-emblem img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  /* Main Action Banner */
  .action-banner {
    margin-top: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #C04516;
    color: #FFFFFF;
    padding: 10px 24px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    box-shadow: 0 4px 14px rgba(192, 69, 22, 0.28);
  }

  /* 3-Step Clean Guide */
  .steps-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 100%;
    max-width: 640px;
    margin: 10px 0;
  }

  .step-box {
    background: #FFFFFF;
    border: 1px solid #E4E4E7;
    border-radius: 16px;
    padding: 14px 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .step-num {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #FFF6EE;
    color: #C04516;
    font-size: 11px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }

  .step-title {
    font-size: 11px;
    font-weight: 700;
    color: #18181B;
    margin-bottom: 2px;
  }

  .step-desc {
    font-size: 9.5px;
    color: #71717A;
    line-height: 1.3;
  }

  /* Footer */
  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #E4E4E7;
    padding-top: 16px;
    font-size: 10px;
    font-weight: 600;
    color: #71717A;
  }

  .footer-address {
    max-width: 380px;
    text-align: left;
    line-height: 1.4;
  }

  .footer-brand {
    text-align: right;
    color: #C04516;
    font-weight: 700;
  }
</style>
</head>
<body>
  <div class="print-bar no-print">
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  <div class="canvas">
    <div class="corner-tl"></div>
    <div class="corner-tr"></div>
    <div class="corner-bl"></div>
    <div class="corner-br"></div>

    <!-- 1. Header Section -->
    <div class="header">
      <div class="logo-wrapper">
        <img src="${logoDataUri}" alt="Mitro ka Manch">
      </div>
      <h1 class="brand-title">Mitro ka Manch</h1>
      <p class="brand-sub">Dadar West • Mumbai</p>
      <div class="stars-pill">
        <span class="stars">★★★★★</span>
        <span class="rating-score">4.9 ON GOOGLE</span>
      </div>
    </div>

    <!-- 2. QR Code Showcase -->
    <div class="qr-stage">
      <div class="qr-card">
        <div class="qr-svg">${qrSvg}</div>
        <div class="qr-center-emblem">
          <img src="${logoDataUri}" alt="Logo">
        </div>
      </div>
      <div class="action-banner">
        <span>⚡ SCAN WITH PHONE CAMERA</span>
      </div>
    </div>

    <!-- 3. Minimal 3-Step Process -->
    <div class="steps-row">
      <div class="step-box">
        <div class="step-num">1</div>
        <div class="step-title">Scan Code</div>
        <div class="step-desc">Open your camera & tap the link</div>
      </div>
      <div class="step-box">
        <div class="step-num">2</div>
        <div class="step-title">Pick Snacks</div>
        <div class="step-desc">Select dishes & copy your draft</div>
      </div>
      <div class="step-box">
        <div class="step-num">3</div>
        <div class="step-title">Post to Google</div>
        <div class="step-desc">Paste & share 5-star love</div>
      </div>
    </div>

    <!-- 4. Clean Footer Details -->
    <div class="footer">
      <div class="footer-address">
        📍 Ground Floor, Swatantryaveer Savarkar Rd, near MTNL, Dadar West, Mumbai 400028
      </div>
      <div class="footer-brand">
        Instagram: @mitro_ka_manch
      </div>
    </div>
  </div>
</body>
</html>`;

  // =========================================================================
  // DESIGN 2: Ultra-Minimalist Table Sticker / Acrylic Cube Card (Square 600x600)
  // =========================================================================
  const squareHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Mitro ka Manch — Table Sticker</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Sora:wght@700;800&display=swap');

  @media print {
    body { padding: 0 !important; background: #FFFFFF !important; }
    .no-print { display: none !important; }
    .sticker { border: none !important; box-shadow: none !important; }
  }

  .print-bar {
    position: fixed;
    top: 14px;
    right: 14px;
    z-index: 1000;
  }

  .print-btn {
    background: #18181B;
    color: #FFFFFF;
    border: none;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 700;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: inherit;
  }
  .print-btn:hover { background: #C04516; }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    width: 600px;
    height: 600px;
    background: #FFFFFF;
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    color: #18181B;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .sticker {
    width: 100%;
    height: 100%;
    background: #FAFAFA;
    border: 2px solid #E4E4E7;
    border-radius: 36px;
    padding: 32px 28px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    position: relative;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.04);
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .brand-title {
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #C04516;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .brand-tagline {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #71717A;
    margin-bottom: 6px;
  }

  .stars {
    color: #F59E0B;
    font-size: 12px;
    letter-spacing: 2px;
  }

  .qr-box {
    position: relative;
    width: 260px;
    height: 260px;
    background: #FFFFFF;
    border: 1.5px solid #E4E4E7;
    border-radius: 24px;
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 18px rgba(0,0,0,0.04);
  }

  .qr-box svg {
    width: 100%;
    height: 100%;
  }

  .qr-center-logo {
    position: absolute;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 2px solid #C04516;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 8px rgba(0,0,0,0.12);
  }

  .qr-center-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .bottom-cta {
    background: #18181B;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 8px 20px;
    border-radius: 100px;
    margin-top: 4px;
  }

  .footer-sub {
    font-size: 9px;
    font-weight: 600;
    color: #A1A1AA;
    margin-top: 4px;
  }
</style>
</head>
<body>
  <div class="print-bar no-print">
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  <div class="sticker">
    <div class="header">
      <h1 class="brand-title">Mitro ka Manch</h1>
      <p class="brand-tagline">Dadar West • Mumbai</p>
      <div class="stars">★★★★★</div>
    </div>

    <div class="qr-box">
      ${qrSvg}
      <div class="qr-center-logo">
        <img src="${logoDataUri}" alt="Logo">
      </div>
    </div>

    <div class="bottom-cta">
      ⚡ SCAN TO REVIEW IN 5 SECONDS
    </div>

    <p class="footer-sub">
      Tap what you loved & 1-tap post on Google Reviews
    </p>
  </div>
</body>
</html>`;

  // Write HTML files
  const standHtmlPath = path.join(__dirname, '../public/assets/mitro_printable_stand.html');
  const stickerHtmlPath = path.join(__dirname, '../public/assets/mitro_printable_sticker.html');

  fs.writeFileSync(standHtmlPath, standHtml);
  fs.writeFileSync(stickerHtmlPath, squareHtml);
  console.log('Saved printable HTMLs:', standHtmlPath, stickerHtmlPath);
}

buildMinimalPrintableAssets();
