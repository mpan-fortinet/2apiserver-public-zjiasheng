const crypto = require('crypto');
const fs = require('fs');

const facebookAccessToken = 'EAABwzLixnjYBAEXAMPLETOKEN1234567890'; // 明文存储的 Facebook Access Token

function generateMD5Hash(filePath) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        // 存在CWE-328漏洞：使用弱哈希函数MD5
        const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
        console.log(`MD5 hash of ${filePath}: ${hash}`);
    } catch (err) {
        console.error('Error reading or hashing file:', err);
    }
}

if (process.argv.length < 3) {
    console.log('Usage: node app.js <file_path>');
    process.exit(1);
}

console.log('Using Facebook Access Token:', facebookAccessToken); // 演示Token泄露
generateMD5Hash(process.argv[2]);
