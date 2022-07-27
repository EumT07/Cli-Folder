const path = require("path");
const fs = require("fs");

class Docs{
    constructor(){
        this._path = __dirname;
    }
    static creatFolder(name){
        fs.mkdirSync(name)
    }
    static dir(){
        return this._path;
    }
    static sheckFolderFiles(url){
        let dataFolder = fs.readdirSync(url);
        return dataFolder.length
    }
    static folders(url){
        let folders = fs.readdirSync(url);
        let n = 0;
        if(folders.length == 0){
            console.log(`
            --------------------------------
            There is not any File or content
            --------------------------------
            `)
        }else{
            folders.forEach((fo)=>{
                console.log(`\t ${fo}`)
                n++;
            }) 
        }
        
    }
    static edit(oldF, newF){
        fs.renameSync(oldF, newF);
    }
    static readingFile(pathFolder,pathFile){
       let fileContent =  fs.readFileSync(`./${pathFolder}/${pathFile}`, "utf-8");

        return fileContent;
    }
    static creatFile(pathFolder,fileName,fileContent){
        fs.writeFileSync(`./${pathFolder}/${fileName}`, fileContent);
    }
    static automaticFolder(nameFolder){
        let folderRoot = path.normalize(`${__dirname}\\..`);
        //Principal folder
        fs.mkdirSync(`${folderRoot}/${nameFolder}`);

        //Read the folder and creat 3 folders more
        //Html
        let html = "Html";
        fs.mkdir(`${folderRoot}/${nameFolder}/${html}`, (err)=>{
            if(err){
                throw err
            }
            let file = "index.html";
            let fileContent = "";
            fs.writeFileSync(`${folderRoot}/${nameFolder}/${html}/${file}`, fileContent);
        });
        let css = "Css";
        fs.mkdir(`${folderRoot}/${nameFolder}/${css}`, (err)=>{
            if(err){
                throw err
            }
            let file = "style.css";
            let fileContent = "";
            fs.writeFileSync(`${folderRoot}/${nameFolder}/${css}/${file}`, fileContent);
        });
        let javascript = "Javascript"
        fs.mkdir(`${folderRoot}/${nameFolder}/${javascript}`, (err)=>{
            if(err){
                throw err
            }
            let file = "app.js";
            let fileContent = "";
            fs.writeFileSync(`${folderRoot}/${nameFolder}/${javascript}/${file}`, fileContent);
        });

    }
    
}


module.exports = Docs;