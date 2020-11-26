const fs = require('fs');
const path = require('path');
const pify = require('pify');

//print the current working directory in 2 different ways
console.log(path.dirname(__filename));
console.log(process.cwd())

//create 2 .txt files
fs.writeFile('file1.txt', 'This is the first text file!', function (err) {
    if (err) throw err;
});
fs.writeFile('file2.txt', 'This is the second text file!', function (err) {
    if (err) throw err;
});

//read them & print their content to the console
fs.readFile('file1.txt', function(err, data) {
    console.log(data.toString())
});
fs.readFile('file2.txt', function(err, data) {
    console.log(data.toString())
});


//Create 2 folders, 2 files with ‘@’ at the beginning of their names & 2 .json files
fs.exists("./folder1", function(exists){
    if(!exists){
        fs.mkdir("./folder1", function (err) {
            if (err) throw err;
        });
    }
});

fs.exists("./folder2", function(exists){
    if(!exists){
        fs.mkdir("./folder2", function (err) {
            if (err) throw err;
        });
    }
});

fs.writeFile('./folder1/@file1.txt', 'This is the first text file!', function (err) {
    if (err) throw err;
});
fs.writeFile('./folder2/file2.txt', 'This is the second text file!', function (err) {
    if (err) throw err;
});

fs.writeFile('./folder1/file1.json', JSON.stringify({ name: "File1", field: "yes"}), function (err) {
    if (err) throw err;
});
fs.writeFile('./folder2/file2.json', JSON.stringify({ name: "File2", field: "no"}), function (err) {
    if (err) throw err;
});

//print the names of the .json files only (do it while reading the entire directory)
function getAllFiles(dirPath){
    fs.readdir(dirPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                getAllFiles(dirPath + "/" + file)
            }
            if(path.extname(file) === '.json')
                console.log(file); 
        });
    });
}

getAllFiles(".")

fs.readFile("./folder1/file1.json",(err, data) => {
    if (err) throw err;
    let json1 = JSON.parse(data);
    json1["name"] = "changed";
    json1["new_field"] = "new";
    delete json1['field'];

    console.log(json1)
});

