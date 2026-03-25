const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const tabs = ['engine', 'drivetrain', 'faults', 'ecu', 'gps', 'trips', 'bluetooth', 'ecm'];
  const filePath = 'file://' + path.resolve(__dirname, '..', 'index.html');

  // Mobile viewport (iPhone 14 Pro size)
  const mobile = { width: 393, height: 852, deviceScaleFactor: 2 };

  // --- LOGIN SCREEN ---
  const loginPage = await browser.newPage({ viewport: mobile });
  await loginPage.goto(filePath, { waitUntil: 'load', timeout: 15000 });
  await loginPage.waitForTimeout(2000);
  await loginPage.screenshot({ path: path.join(__dirname, '00-login.png'), fullPage: true });
  console.log('Captured: login');

  // --- DEMO MODE: each tab ---
  const page = await browser.newPage({ viewport: mobile });
  await page.goto(filePath + '?demo', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(3000); // let demo data populate + animations settle

  for (const tab of tabs) {
    await page.evaluate((t) => switchTab(t), tab);
    await page.waitForTimeout(800); // let animations settle
    await page.screenshot({
      path: path.join(__dirname, `01-${tab}.png`),
      fullPage: true
    });
    console.log('Captured: ' + tab);
  }

  // --- DESKTOP VIEW of engine tab ---
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900, deviceScaleFactor: 2 } });
  await desktop.goto(filePath + '?demo', { waitUntil: 'load', timeout: 15000 });
  await desktop.waitForTimeout(3000);
  await desktop.screenshot({ path: path.join(__dirname, '02-desktop-engine.png') });
  console.log('Captured: desktop engine');

  await browser.close();
  console.log('Done — all screenshots saved to screenshots/');
})();
