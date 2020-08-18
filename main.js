const fs = require("fs");

const readFiles = (filePath, cb) => {
    fs.readFile(filePath, 'utf-8', (_error, data) => {
        if (_error) {
            cb(_error);
            return;
        }
        fs.stat(filePath, (_error2, stat) => {
            cb(null, stat.size);
        });
    })
};

readFiles("index.html", (_err, size) => console.log(size));