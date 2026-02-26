import fs from "fs/promises"

async function readData(){
    try{
        const data=await fs.readFile("newData.txt","utf-8");
        console.log("Data=",data)
    }
    catch(err){
        console.log("Error: ",err.message)
    }
}

async function saveData(mydata){
    try{
        await fs.writeFile("newData.txt",mydata);
         console.log("Data written successfully")
    }
    catch(err){
        console.error("Error=",err.message)
    }
}
readData();
saveData("my FSD Data");
readData();