import http from "http";
import os from "os";

const port = 5001;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // `req` is the request object: it contains details about the incoming HTTP request (method, URL, headers, etc.)
  // `res` is the response object: it is used to send data back to the client (browser, API consumer, etc.)

  const url = req.url; 
  // `req.url` gives the path part of the request (e.g., "/", "/system"). It helps us know which route the client is asking for.

  if (url === "/" && req.method === "GET") {
    // `res.writeHead` sets the HTTP status code and headers for the response
    res.writeHead(200, { "Content-Type": "text/html" });

    // `res.write` sends chunks of data to the client. Here we send HTML content.
    res.write("<h1>Harshit Agrawal</h1>");

    // `res.end` signals that the response is complete. Without this, the client would keep waiting.
    res.end();
  } 
  
  else if (url === "/system" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });

    // Collect system information using Node's `os` module
    const data = {
      platform: os.platform(),   // Operating system platform (e.g., 'win32', 'linux')
      cpu: os.cpus().length,     // Number of CPU cores
      arch: os.arch(),           // CPU architecture (e.g., 'x64')
      freeMemory: os.freemem(),  // Free memory in bytes
      totalMemory: os.totalmem() // Total memory in bytes
    };

    // `JSON.stringify` converts the JavaScript object into a JSON string so it can be sent over HTTP
    res.write(JSON.stringify(data, null, 2));

    // End the response so the client knows it's finished
    res.end();
  }
  
  else if (url === "/senddata" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString(); // Convert buffer to string
    });
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Data received", data: body }));
    });
  }
  
  else {
    // If no matching route is found, return a 404 error
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page Not Found</h1>");
  }
});

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});