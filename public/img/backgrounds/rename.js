const fs = require('fs');

/**
 * Run "node rename.js" to put all file names in asc numerical order
 * like xxx.ext where x = file index of (n) and ext =  file extension.
 */
fs.readdir(__dirname, function(err, items) {
    
    let n = 0;

    items.forEach(img => {
        let ext = img.split('.')[1];
        let newName = `${n}.${ext}`;

        if (newName.split('.')[0].length == 1) 
            newName = `00${newName}`;

        if (newName.split('.')[0].length == 2) 
            newName = `0${newName}`;            

        if (ext != 'js' && ext != 'php') {
            fs.renameSync(`${__dirname}/${img}`, `${__dirname}/${newName}`);
            n++;
        }
    });
});
