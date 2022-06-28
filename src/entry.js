const { copyFile } = require("fs/promises");
async function copy() {
    const filePath = "/Users/zhaohaoliang/Desktop/project/noobui/src/stories/components/index.js";
    const targetPath = "/Users/zhaohaoliang/Desktop/project/noobui/lib/es/index.js";
    try {
        await copyFile(filePath, targetPath)
    }
    catch (error) {
        console.log(error.message)
    }
}
copy()
