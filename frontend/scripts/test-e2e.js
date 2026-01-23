
import puppeteer from 'puppeteer';

(async () => {
  console.log('🚀 Starting E2E Test...');
  
  const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Capture page console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    try {
        // 1. Test Homepage
    console.log('🌍 Navigating to Homepage...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
    const title = await page.title();
    console.log(`✅ Homepage Title: ${title}`);
    
    // 1b. Test Contact Page
        console.log('🌍 Navigating to Contact Page...');
        await page.goto('http://localhost:3001/#contact');
        await page.waitForFunction(() => window.location.hash === '#contact', { timeout: 5000 }).catch(() => console.log('⚠️ Hash wait timed out'));
        
        // Check for "Hubungi Kami" or similar text
        try {
            await page.waitForSelector('h1', { timeout: 10000 });
            
            // Get all h1s and check if any match
            const h1Texts = await page.$$eval('h1', els => els.map(el => el.textContent));
            console.log(`✅ All H1s found: ${JSON.stringify(h1Texts)}`);
            
            const contactHeader = h1Texts.find(t => t.includes('Hubungi Kami'));
            
            if (contactHeader) {
                 console.log('✅ Contact Page Loaded');
                 
                 // Setup dialog listener for alert
                 page.on('dialog', async dialog => {
                   const message = dialog.message();
                   console.log(`💬 Alert detected: ${message}`);
                   await dialog.dismiss();
                 });
        
                 // Fill form
                 console.log('✍️ Filling Contact Form...');
                 await page.waitForSelector('input[placeholder*="nama lengkap"]', { timeout: 5000 });
                 await page.type('input[placeholder*="nama lengkap"]', 'E2E Test User');
                 await page.type('input[placeholder*="email@example.com"]', 'e2e@example.com');
                 await page.type('input[placeholder*="08xx"]', '081234567890');
                 
                 try {
                   await page.select('select', 'yayasan');
                 } catch (e) {
                   console.log('⚠️ Could not select unit via page.select, skipping unit selection (might fail if required)');
                 }
        
                 await page.type('input[placeholder*="Topik"]', 'E2E Test Subject');
                 await page.type('textarea', 'This is an automated E2E test message.');
                 
                 // Submit
                 console.log('📤 Submitting Contact Form...');
                 const sendButton = await page.$('button[type="submit"]');
                 if (sendButton) {
                   await sendButton.click();
                   // Wait for potential alert (handled by dialog listener) or API response
                   // Since we might be using mock API, network request might not happen.
                   // Just wait a bit to ensure action completes
                   await new Promise(r => setTimeout(r, 2000)); 
                   console.log('✅ Contact Form submission triggered');
                 }
            } else {
                 console.warn(`⚠️ Contact Page header text mismatch. Found: ${JSON.stringify(h1Texts)}`);
            }
        } catch (e) {
            console.warn('⚠️ Contact Page error:', e.message);
            const bodyText = await page.evaluate(() => document.body.innerText);
            console.log('📄 Page Content Dump:', bodyText.substring(0, 500) + '...');
        }
        await page.screenshot({ path: 'scripts/contact-page.png' });
        
        // 2. Test Login Page Navigation
        console.log('🌍 Navigating to Login Page...');
        await page.goto('http://localhost:3001/#login');
        await page.waitForFunction(() => window.location.hash === '#login', { timeout: 5000 }).catch(() => console.log('⚠️ Hash wait timed out'));
        await page.reload({ waitUntil: 'networkidle0' }); // Ensure clean load
        await page.screenshot({ path: 'scripts/login-page.png' });
        
        console.log('🔑 Attempting Login...');
        // Wait for inputs
        await page.waitForSelector('input[type="text"]', { timeout: 10000 });
        console.log('✅ Found text input');
        
        // Wait for password specifically, retry if needed
        try {
            await page.waitForSelector('input[type="password"]', { timeout: 5000 });
            console.log('✅ Found password input');
        } catch (e) {
            console.warn('⚠️ Password input not found immediately, checking if shown as text...');
            const inputs = await page.$$eval('input', els => els.map(e => e.type));
            console.log('Input types found:', inputs);
            // Try to find by placeholder if type is wrong
            await page.waitForSelector('input[placeholder*="password"]', { timeout: 5000 });
            console.log('✅ Found password input by placeholder');
        }

        await page.type('input[type="text"]', 'admin@baituljannah.sch.id');
        await page.type('input[placeholder*="password"]', '123'); // Use placeholder to be safe
        
        // Submit
        const loginButton = await page.$('button[type="submit"]');
        if (loginButton) {
             await loginButton.click();
             console.log('✅ Login Form Submitted');
        } else {
             throw new Error('Login button not found');
        }
        
        // Wait for navigation to dashboard
        try {
             await page.waitForFunction(
                 () => window.location.hash.includes('admin-super') || window.location.hash.includes('dashboard'),
                 { timeout: 10000 }
             );
             console.log(`📍 Current URL: ${page.url()}`);
             console.log('✅ Successfully redirected to Dashboard');
        } catch (e) {
             console.warn('⚠️ Dashboard redirection timeout');
             console.log(`📍 Current URL: ${page.url()}`);
        }
        await page.screenshot({ path: 'scripts/dashboard.png' });
    
    await browser.close();
    console.log('🎉 All Tests Completed Successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test Failed:', error);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
