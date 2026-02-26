import http from "http";
const port = 5001;
const users = [
  { id: 1, name: "Harshit Agrawal", email: "harshit@example.com" },
  { id: 2, name: "John Doe", email: "john@example.com" },
  { id: 3, name: "Jane Smith", email: "jane@example.com" }
];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {

    res.end("Home Page");
  }
    else if (url === "/users" && method === "GET") {
        console.log(users);
    
    res.end(JSON.stringify(users));
  }
  else if (url.startsWith("/users/") && method === "GET") {
    const id = url.split("/")[2];
    const user = users.filter(u=>u.id==id);
    if(!user)
    {
        res.statusCode = 400;
        console.log("user ",id," not found");
        return res.end("User" + id + " not found");
    }
    console.log("user ",id," found successfully");
    res.end(JSON.stringify(user));
    }


    else if(url.startsWith("/createuser") && method == "POST"){
        let body = ""
        req.on("data", (chunk)=>{
            body+=chunk
        })
        req.on("end",()=>{
            const dt = JSON.parse(body)
            const newuser ={
                id : Date.now(),
                name: dt.name,
                email: dt.email
            }
            users.push(newuser)
            res.statusCode = 200
            res.end("create user")
        })
        
    }


    else if(url.startsWith("/users/") && method == "PUT"){
        const id = url.split("/")[2];
        const userIndex = users.findIndex(u=> u.id == id)
        if(userIndex ==-1){
            res.statusCode = 400
            return res.end(`user ${id} not found`)
        }
        let body = ""
        req.on("data",(chunk)=>{
            body+=chunk
        } )
        req.on("end",()=>{
            const data = JSON.parse(body)
            users[userIndex] = {...users[userIndex], ...data};
            console.log(`id ${id} update success`)
            res.end(`id ${id} update success`)
            
        })
    }

    else if (url.startsWith("/users/") && method === "DELETE") {
      const id = url.split("/")[2];
      const userIndex = users.findIndex(u => u.id == id);
      if (userIndex === -1) {
        console.log("User ", id, " not found");
        res.statusCode = 400;
        return res.end("User" + id + " not found");
      }
      users.splice(userIndex, 1);
      console.log("User ", id, " deleted successfully");
    res.end("Delete User");
    }

    else {
      res.statusCode = 404;
      res.end("Not Found");
    }

});

server.listen(5001, () => {
  console.log("Server is running on port 5001");
});