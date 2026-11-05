const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generateSinglePagePdf() {
  const targetUrl = 'https://google-review-automation-nu.vercel.app/r/mitro-ka-manch';
  console.log('Generating 1-Page Printable PDF for:', targetUrl);

  // 1. Read Mitro Logo and base64 encode
  const logoPath = path.join(__dirname, '../public/assets/mitro-logo.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

  // 2. Generate crisp SVG QR code with Level H error correction (30% redundancy)
  const qrSvg = await QRCode.toString(targetUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#18181B', // Deep obsidian for ultra-crisp scanner contrast
      light: '#FFFFFF'
    }
  });

  // =========================================================================
  // A4 Standard Page: 210mm x 297mm (Fixed Exact 1-Page Layout)
  // =========================================================================
  const a4Html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Mitro ka Manch — Google Review Stand</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Sora:wght@700;800&display=swap');

  @page {
    size: A4 portrait;
    margin: 0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  html, body {
    width: 210mm;
    height: 297mm;
    max-width: 210mm;
    max-height: 297mm;
    background: #FFFFFF;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #18181B;
    overflow: hidden;
    page-break-after: avoid;
    page-break-before: avoid;
    break-after: avoid;
    break-before: avoid;
  }

  .page-container {
    width: 210mm;
    height: 297mm;
    padding: 16mm 18mm;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .stand-frame {
    width: 100%;
    height: 100%;
    background: #FAFAFA;
    border: 1.5px solid #E4E4E7;
    border-radius: 28px;
    padding: 28px 32px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Minimal Corner Registration Accents */
  .c-tl { position: absolute; top: 14px; left: 14px; width: 14px; height: 14px; border-top: 2.5px solid #C04516; border-left: 2.5px solid #C04516; }
  .c-tr { position: absolute; top: 14px; right: 14px; width: 14px; height: 14px; border-top: 2.5px solid #C04516; border-right: 2.5px solid #C04516; }
  .c-bl { position: absolute; bottom: 14px; left: 14px; width: 14px; height: 14px; border-bottom: 2.5px solid #C04516; border-left: 2.5px solid #C04516; }
  .c-br { position: absolute; bottom: 14px; right: 14px; width: 14px; height: 14px; border-bottom: 2.5px solid #C04516; border-right: 2.5px solid #C04516; }

  /* 1. Header */
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .logo-ring {
    width: 82px;
    height: 82px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 2.5px solid #C04516;
    padding: 3px;
    margin-bottom: 12px;
    box-shadow: 0 4px 14px rgba(192, 69, 22, 0.12);
  }

  .logo-ring img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .brand-name {
    font-family: 'Sora', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #C04516;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  .brand-sub {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #71717A;
    margin-bottom: 10px;
  }

  .rating-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #FFFFFF;
    border: 1px solid #E4E4E7;
    padding: 5px 18px;
    border-radius: 100px;
  }

  .stars {
    color: #F59E0B;
    font-size: 15px;
    letter-spacing: 2px;
  }

  .score-text {
    font-size: 11px;
    font-weight: 800;
    color: #18181B;
    letter-spacing: 0.5px;
  }

  /* 2. QR Code Display */
  .qr-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4px 0;
  }

  .qr-plate {
    position: relative;
    width: 290px;
    height: 290px;
    background: #FFFFFF;
    border: 1.5px solid #E4E4E7;
    border-radius: 24px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
  }

  .qr-plate svg {
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
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
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

  .cta-pill {
    margin-top: 14px;
    background: #C04516;
    color: #FFFFFF;
    padding: 9px 24px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  /* 3. Steps Row */
  .steps-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 100%;
    max-width: 580px;
  }

  .step-card {
    background: #FFFFFF;
    border: 1px solid #E4E4E7;
    border-radius: 14px;
    padding: 12px 10px;
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
    margin-bottom: 5px;
  }

  .step-title {
    font-size: 11px;
    font-weight: 700;
    color: #18181B;
    margin-bottom: 2px;
  }

  .step-desc {
    font-size: 9px;
    color: #71717A;
    line-height: 1.3;
  }

  /* 4. Footer */
  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #E4E4E7;
    padding-top: 12px;
    font-size: 9.5px;
    font-weight: 600;
    color: #71717A;
  }

  .footer-addr {
    max-width: 360px;
    text-align: left;
    line-height: 1.4;
  }

  .footer-ig {
    text-align: right;
    color: #C04516;
    font-weight: 700;
  }
</style>
</head>
<body>
  <div class="page-container">
    <div class="stand-frame">
      <div class="c-tl"></div>
      <div class="c-tr"></div>
      <div class="c-bl"></div>
      <div class="c-br"></div>

      <!-- Header -->
      <div class="header">
        <div class="logo-ring">
          <img src="${logoDataUri}" alt="Mitro ka Manch">
        </div>
        <h1 class="brand-name">Mitro ka Manch</h1>
        <p class="brand-sub">Dadar West • Mumbai</p>
        <div class="rating-badge">
          <span class="stars">★★★★★</span>
          <span class="score-text">4.9 ON GOOGLE</span>
        </div>
      </div>

      <!-- QR Stage -->
      <div class="qr-center">
        <div class="qr-plate">
          ${qrSvg}
          <div class="qr-center-logo">
            <img src="${logoDataUri}" alt="Emblem">
          </div>
        </div>
        <div class="cta-pill">⚡ SCAN WITH SMARTPHONE CAMERA</div>
      </div>

      <!-- 3 Steps -->
      <div class="steps-row">
        <div class="step-card">
          <div class="step-num">1</div>
          <div class="step-title">Scan Code</div>
          <div class="step-desc">Open camera & tap the link</div>
        </div>
        <div class="step-card">
          <div class="step-num">2</div>
          <div class="step-title">Pick Snacks</div>
          <div class="step-desc">Choose dishes & copy draft</div>
        </div>
        <div class="step-card">
          <div class="step-num">3</div>
          <div class="step-title">Post to Google</div>
          <div class="step-desc">Paste & share 5-star love</div>
        </div>
      </div>

      <!-- Footer Details -->
      <div class="footer">
        <div class="footer-addr">
          📍 Ground Floor, Swatantryaveer Savarkar Rd, near MTNL, Dadar West, Mumbai 400028
        </div>
        <div class="footer-ig">
          Instagram: @mitro_ka_manch
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  // Write temporary HTML
  const tmpHtmlPath = '/tmp/mitro_stand_a4.html';
  fs.writeFileSync(tmpHtmlPath, a4Html);

  // Generate output PDF path
  const pdfOutPath = path.join(__dirname, '../public/assets/Mitro_ka_Manch_Google_Review_Stand.pdf');

  // Run Chromium to produce the exact 1-page PDF
  // --no-pdf-header-footer removes URL and date headers completely!
  execSync(
    `chromium --headless --no-sandbox --no-pdf-header-footer --print-to-pdf="${pdfOutPath}" file://${tmpHtmlPath}`
  );

  console.log('Successfully generated PDF:', pdfOutPath);

  // Verify page count using pdfinfo
  const pdfInfo = execSync(`pdfinfo "${pdfOutPath}"`).toString();
  console.log(pdfInfo);
}

generateSinglePagePdf();
