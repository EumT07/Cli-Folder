const readline = require("readline");
const path = require("path");
const fs = require("fs");
const Doc = require("./docs");

//Interface
let interF = readline.createInterface(process.stdin, process.stdout);

//Tools Folders
const toolsFolder = `
==============================CMD===================================
:me = Menu | :chf = Choose Folder | :cf = Creat a File 
:ed = Edit Folder | :exit = Close App
===================================================================\n`
//Tools Files
const tools = `
==============================CMD=================================== 
:me = Menu | :exit = Close app
===================================================================\n`

const tools2 = `
==============================CMD=================================== 
:me = Menu | :r Read File | :exit = Close app
===================================================================\n`
//Screen
const menu_screen = `
                    =========================================
                                FOLDERS CREATOR
                     ========================================
                     Choose an option: \n
                        1 Create new free Folder.
                        2 Show all Content.
                        3 Creating full Folder(-html/css/js-)
                        4 Close app.
                    =========================================\n>`;
                                                
//Screan messages
const messages = {
    exist: "\nThis Folder exist, try Again",
    folderSucces: "You have creat a new folder",
    changeF: "You have Changed a Folder Name",
    createFile: "You have created a new file",
    menuError: "There is an Error, this line comand does not exist...!!",
    toolScreamError: "This command not exist.."
}

menuScreen();

function menuScreen() {
    process.stdout.write("\033c");
    interF.question(menu_screen, res =>{
        switch(res.trim()){
            case "1":
                createNewFolder();
            break;
            case "2":
                showContent();
            break;
            case "3":
                folderProject();
            break;
            case "4":
                interF.close();
            break;
            default:
                console.log(messages.menuError);
                setTimeout(()=>{
                    menuScreen();
                },1000);
        }
    });
};
function toolScream(){
    // process.stdout.write("\033c");
    // console.log(toolsFolder);
    interF.on("line", (type)=>{
        switch(type.trim()){
            case ":me":
                menuScreen();
            break;
            case ":ed":
                editFolder();
            break;
            case ":chf":
                chooseFolder();
            break;
            case ":cf":
                createNewFile();
            break;
            case ":exit":
                interF.close();
            break;
            default:
                console.log(messages.toolScreamError)
                break;
        }
    })
}
function leaveSeccion(){
    process.stdout.write("\033c");
    const question$ = "Are you sure you want to leave this seccion ? -> (Yes = y/ Not = n) \n>";
    interF.question(question$, (data)=>{
        if(data == "y"){
            process.stdout.write("\33c");
            menuScreen();
        }else if(data == "n"){
            process.stdout.write("\33c");
            createNewFolder();
        }
    })
}
//show Content
function showContent() {
    process.stdout.write("\033c");
    console.log(`
                            =====================
                                   Content
                            =====================
    `);
    console.log(toolsFolder);
    toolScream();
    viewFolders();
}
//view folders
function viewFolders(folderName = ""){
    console.log(`Principal Folder: ./${folderName}`)
    console.log("==========================")
    Doc.folders(`./${folderName}`)
    console.log("==========================")
}
//Create
function createNewFolder(){
    process.stdout.write("\33c");
    console.log(`
                            =====================
                                Creating Folder
                            =====================
    `)
    console.log(tools)
    interF.question("Insert name of the folder: \n", name =>{
        if(name == ":me"){
            process.stdout.write("\33c");
            leaveSeccion()
        }else if(name == ":exit"){
            interF.close();
        }else if(fs.existsSync(name)){ 
            console.log(messages.exist);
            setTimeout(()=>{createNewFolder()},1500)
        }else{
            Doc.creatFolder(name)
            console.log(messages.folderSucces);
            setTimeout(()=>{menuScreen()},2000)
        }
    });
}
//Edit
function editFolder() {
    process.stdout.write("\033c");
    console.log(`
                            =====================
                                Editing Folder
                            =====================
    `)
    viewFolders();
    interF.question("Insert the folder name what you will change: \n>", (data)=>{
        let oldF = data;
        if (fs.existsSync(oldF)){
            interF.question("Insert the new Folder name: \n>", (data =>{
                let newF = data;
                setTimeout(()=>{
                    console.log(messages.changeF)
                    setTimeout(()=>{
                        Doc.edit(oldF,newF);
                        setTimeout(()=>{showContent()},1000)
                    },2000);
                },1000);
                }));
        }else{
            process.stdout.write("\033c");
            console.log(`
                            =====================
                                Editing Folder
                            =====================
            `);
            viewFolders();
            interF.question("This folder Doesn't Exits\nWould you like to creat it..? (yes = y / No = n) \n>", data => {
                if(data == "y"){
                    createNewFolder();
                }else{
                    showContent();
                }
            });
        }
        
    });
    
}
//Creat a file
function createNewFile(){
    process.stdout.write("\33c");
    console.log(`
                            =====================
                                Creating File
                            =====================
    `)
    viewFolders()
    interF.question("Choose the folder: \n>", (data)=>{
        let folderName = data;
        if(fs.existsSync(folderName)){
            interF.question("Write the name of the file: \n>", data =>{
                let nameOfFile = data;
                let fileContent = "";
                interF.question("Do you want to add any content in the file? (Yes = y/ Not = n) \n>", data => {
                    if(data == "y"){
                        process.stdout.write("\33c");
                        interF.question("Write a content: \n>", type =>{
                            fileContent = type;
                            Doc.creatFile(folderName,nameOfFile,fileContent);
                            setTimeout(()=>{
                                process.stdout.write("\33c");
                                viewFolders(folderName);
                                console.log(`
                                0====0====0====0====0====0====0====0====0
                                File: ${nameOfFile}
                                --------------------
                                This is the content:
                                --------------------
                                ${fileContent}
                                0====0====0====0====0====0====0====0====0
                                `)
                                setTimeout(()=>{
                                    menuScreen();
                                },1000)
                            },1000);
                        })
                    }else if(data == "n"){
                        process.stdout.write("\33c");
                        Doc.creatFile(folderName, nameOfFile,fileContent);
                        menuScreen();
                    }
                })
                
            })
        }else{
            console.log("This folder Doesn't exist, You can create a folder or choose an exist folder");
            setTimeout(()=>{
                showContent();
            },2000)
        }
        
    })
}
//Reading File
function readFileContentInsideFolder(folderName){
    process.stdout.write("\033c");
    console.log(tools);
    viewFolders(folderName);
    interF.question("Choose File..!!\n>", data => {
        let fileName = data;
        if (data == ":me"){
            menuScreen();
        }else if(data == ":exit"){
            interF.close();
        }else{
            process.stdout.write("\033c");
            console.log(tools);
            if(fs.existsSync(fileName)){
                setTimeout(()=>{
                    viewFolders(folderName);
                    console.log(`
                    0====0====0====0====0====0====0====0====0
                    File: ${fileName}
                    --------------------
                    This is the content:
                    --------------------
                    "
                    
                    ${Doc.readingFile(folderName,fileName)}
                                                        "
                    0====0====0====0====0====0====0====0====0
                    `)
                },1000);
            }else{
                console.log("Sorry There is not file with that name");
                setTimeout(()=>{showContent()},1000)
            }
        } 
    });
}
//Creating automatic Full folder
function folderProject(){
    process.stdout.write("\033c");
    console.log(`
                        ===========================
                           Creating Full Folder
                        ===========================
    `);
    console.log(`
    ===========================
    Folder "Name" :
        Css
            ----> style.css
        Html
            ----> index.html
        Javascript
            ----> app.js

    This folder Will be Created in desktop root
    ${path.normalize(`${__dirname}\\..`)}
    ===========================
    `);
    interF.question("Insert Name of the Project Folder.!!\n>", (data)=>{
        let folderName = data;
        Doc.automaticFolder(folderName);
        console.log(messages.folderSucces);
        setTimeout(()=>{menuScreen()},2000)
    });
    
}
//Choose folder
function chooseFolder(){
    process.stdout.write("\033c");
    console.log(`
                            =====================
                                Choosing Folder
                            =====================
    `)
    console.log(tools);
    viewFolders();
    interF.question("Choose the Folder name.. \n>", (data)=>{
        let nameFolder = data;
        if (data == ":me"){
            menuScreen();
        }else if(data == ":exit"){
            interF.close();
        }else if(fs.existsSync(nameFolder)){
            process.stdout.write("\033c");
            if (Doc.sheckFolderFiles(nameFolder) == 0){
                console.log(tools)
            }else{
                console.log(tools2)
            }
            viewFolders(nameFolder);
            interF.on("line", (line)=>{
                switch (line.trim()) {
                    case ":me":
                        menuScreen();
                        break;
                    case ":r":
                        readFileContentInsideFolder(nameFolder);
                        break;
                    case ":exit":
                        interF.close();
                        break;
                }
            });
        }else{
            process.stdout.write("\033c");
            console.log(tools)
            console.log(`
                            =====================
                                Choosing Folder
                            =====================
            `)
            viewFolders();
            interF.question("This folder Doesn't Exits\nWould you like to creat it..? (yes = y / No = n) \n>", data => {
                if(data == ":me"){
                    menuScreen();
                }else if(data == ":exit"){
                    interF.close();
                }else if(data == "y"){
                    createNewFolder();
                }else{
                    showContent();
                }
            }); 
        }
    });
}