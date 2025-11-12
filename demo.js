const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Starting demo...');
  
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'demo-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  try {
    const browser = await chromium.launch({ headless: false, slowMo: 1000 });
    const context = await browser.newContext({
      viewport: { width: 1400, height: 900 }
    });
    const page = await context.newPage();

    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Screenshot 1: Initial form
    console.log('Taking screenshot of initial form...');
    await page.screenshot({ path: path.join(screenshotsDir, '1-initial-form.png'), fullPage: true });
    await page.waitForTimeout(2000);

    // Fill out the form - ensure all required fields are filled
    console.log('Filling out the form...');
    await page.waitForSelector('input[name="companyName"]', { timeout: 10000 });
    
    // Fill required fields first
    await page.fill('input[name="companyName"]', 'Kaynes Technology');
    await page.waitForTimeout(500);
    await page.fill('input[name="employeeName"]', 'Dattukrishna M');
    await page.waitForTimeout(500);
    await page.fill('input[name="title"]', 'Executive - MES Engineer');
    await page.waitForTimeout(500);
    await page.fill('input[name="phone1"]', '8050703680');
    await page.waitForTimeout(500);
    await page.fill('input[name="email"]', 'm.dattukrishna@kaynestechnology.net');
    await page.waitForTimeout(500);
    await page.fill('textarea[name="address"]', '23-25 Belagola Food Industrial Estate Metagalli PO, Mysore 570016 Karnataka India');
    await page.waitForTimeout(500);
    
    // Fill optional fields
    await page.fill('input[name="phone2"]', '+91 98765 43210');
    await page.waitForTimeout(500);
    await page.fill('input[name="website"]', 'www.kaynestechnology.co.in');
    await page.waitForTimeout(500);
    await page.fill('input[name="department"]', 'KT-01');
    await page.waitForTimeout(1000);
    
    await page.waitForTimeout(1000);
    
    // Screenshot 2: Form filled
    console.log('Taking screenshot of filled form...');
    await page.screenshot({ path: path.join(screenshotsDir, '2-filled-form.png'), fullPage: true });
    await page.waitForTimeout(2000);

    // Submit the form - wait for navigation to complete if it happens
    console.log('Submitting form...');
    
    // Listen for console messages
    page.on('console', msg => console.log('Browser console:', msg.text()));
    page.on('pageerror', error => console.log('Page error:', error.message));
    
    // Click submit and wait for either navigation or content change
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 5000 }).catch(() => {}),
      page.click('button[type="submit"]')
    ]).catch(() => {
      // If no navigation, just wait
      return page.waitForTimeout(3000);
    });
    
    await page.waitForTimeout(3000);
    
    // Take screenshot to see current state
    await page.screenshot({ path: path.join(screenshotsDir, '3-after-submit.png'), fullPage: true });
    
    // Check what's on the page
    const bodyText = await page.textContent('body');
    console.log('Page contains preview:', bodyText.includes('Preview') || bodyText.includes('preview'));
    console.log('Page contains visiting:', bodyText.includes('Visiting') || bodyText.includes('visiting'));
    
    // Try to find any preview or card elements with multiple selectors
    const previewCard = await page.$('.preview-card');
    const previewContainer = await page.$('.preview-container');
    const visitingCard = await page.$('.visiting-card');
    const tabsContainer = await page.$('.tabs-container');
    console.log('Elements found - preview-card:', !!previewCard, 'preview-container:', !!previewContainer, 'visiting-card:', !!visitingCard, 'tabs-container:', !!tabsContainer);

    // Screenshot 3: Preview Card
    console.log('Taking screenshot of preview card...');
    await page.screenshot({ path: path.join(screenshotsDir, '3-preview-card.png'), fullPage: true });
    await page.waitForTimeout(2000);

    // Try to interact with the page using JavaScript to trigger React state update
    console.log('Attempting to trigger React state update...');
    try {
      await page.evaluate(() => {
        // Try to find and click the submit button via React
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.click();
        }
      });
      await page.waitForTimeout(4000);
      
      // Check again for preview elements
      const tabsContainer = await page.$('.tabs-container');
      if (tabsContainer) {
        console.log('Tabs container found!');
        await page.screenshot({ path: path.join(screenshotsDir, '4-with-tabs.png'), fullPage: true });
        
        // Try to click visiting card tab
        const tabs = await page.$$('.tab');
        for (const tab of tabs) {
          const text = await tab.textContent();
          if (text && text.trim() === 'Visiting Card') {
            await tab.click();
            await page.waitForTimeout(3000);
            await page.screenshot({ path: path.join(screenshotsDir, '5-visiting-card.png'), fullPage: true });
            break;
          }
        }
      } else {
        // Take final screenshot of whatever is there
        await page.screenshot({ path: path.join(screenshotsDir, '4-final-state.png'), fullPage: true });
      }
    } catch (e) {
      console.log('Error in JavaScript evaluation:', e.message);
    }

    console.log('Demo completed! Screenshots saved in demo-screenshots folder.');
    console.log('Keeping browser open for 10 seconds for manual inspection...');
    
    await page.waitForTimeout(10000);
    await browser.close();
    
  } catch (error) {
    console.error('Error during demo:', error);
    process.exit(1);
  }
})();

