const chromium = require('chrome-aws-lambda');

exports.handler = async (event) => {

    const loginPage = 'https://binusmaya.binus.ac.id/login';
    const username = JSON.parse(event.body).username;
    const password = JSON.parse(event.body).password;
    console.log(event.body.username);

    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    // don't load css and images to improve speed
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if(req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image'){
            req.abort();
        }
        else {
            req.continue();
        }
    });

    // simulate user login
    await page.goto(loginPage, { waitUntil: 'networkidle2' });
    await page.type('input[placeholder="Username"]', username);
    await page.type('input[placeholder="Password"]', password);
    await page.click('input[value="Login"]');

    const pageUrl = page.url();
    let error = false;

    if (pageUrl.includes("?error=1")) {
        // username or password invalid
        error = "Invalid username or password !";

    } else if (pageUrl.includes("?error=2")) {
        // user not found
        error = "Username not found";

    } else if (pageUrl.includes("?error=3")) {
        // user and password must be filled
        error = "Username and password must be filled";

    } else if (pageUrl.includes("?error=4")) {
        // captcha error
        error = "Captcha error";

    } else if (pageUrl.includes("/login")) {
        // unknown error, still in login page
        error = "Unknown error";
    }

    if (error) {
        await browser.close();
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: error,
                pageUrl
            })
        }
    } else {
        const cookies = await page.cookies();
        await browser.close();
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Cookies acquired successfully :D`,
                cookies: cookies,
                pageUrl
            })
        }
    }
}
