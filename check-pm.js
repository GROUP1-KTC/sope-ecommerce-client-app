const fs = require("fs");
const path = require("path");

const usedPM = process.env.npm_config_user_agent;

if (!usedPM.startsWith("pnpm")) {
    const lockFile = path.join(__dirname, "package-lock.json");
    if (fs.existsSync(lockFile)) {
        fs.rmSync(lockFile, { force: true });
    }

    console.error(`
🔍 Kiểm tra trình quản lý gói: ${usedPM}

❌ Dự án này **bắt buộc** phải dùng pnpm.

➡️ Hãy cài pnpm nếu bạn chưa có:
   npm install -g pnpm

➡️ Sau đó chạy lại:
   pnpm install
`);
    process.exit(1);
}
