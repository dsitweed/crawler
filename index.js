const puppeteer = require('puppeteer');
const download = require('image-downloader');

const url = "https://kenh14.vn/ai-roi-cung-khac-cac-hot-girl-nay-cung-khong-ngoai-le-khi-vong-1-cu-ngay-cang-phong-phao-20171207193958533.chn";


(async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
    const articles = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('div.VCSortableInPreviewMode > div > a');
        titleLinks = [...titleLinks];
        let articles = titleLinks.map(link => ({
            title: link.getAttribute('title'),
            url: link.getAttribute('href')
        }));
        return articles;
    });

    await Promise.all(articles.map(select => download.image({
        url: select.url,
        dest: './image'
    })));

    // In ra kết quả và đóng trình duyệt
    console.log(articles);
    await browser.close();
})();