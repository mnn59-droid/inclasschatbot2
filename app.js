const express = require("express");

const app = express();
const PORT = 3000;
app.use(express.json());
function simpleBot(message){
  const text = message.toLowerCase().trim();
if(text.includes("hello!") || text.includes("hi")) {
return "Hello! Welcome to Full Stack Development. ";}
else if (text.includes("javaScript")) {
return "JavaScript is one of the core languages for full stack development.";
}else if (text.includes ("react")) {
return "React is used to build interactive user interface.";
}else if (text.includes("bye")) {
return "GoodBye! See you next Lesson.";
}else{
return "I am still learning. Please ask about JavaScript, React, or Node.js";
}
}
app.get("/", (req,res) => {
    res.send(`
    <html lang="">
      <head>
        <title>Lesson 1 AI Chatbot</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 40px auto;
          }
          h1 {
            color: #cc0033;
          }
          input, button {
            padding: 10px;
            font-size: 16px;
            margin-top: 10px;
          }
          input {
            width: 70%;
          }
          button {
            cursor: pointer;
          }
          #response {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid #ccc;
            background: #f9f9f9;
          }
        </style>
      </head>
      <body>
        <h1>My first WebStack: simple AI-like ChatBot</h1>
        <p>Type a message such as: <b>hello</b>, <b>javascript</b>, <b>react</b>, <b> node</b>, or <b>bye</b>.</p>
         
        <input type = "text" id = "message" placeholder="Enter your message"/>
         <button onclick="sendMessage()"> Send</button>
         
         <div id="response"> <b> Bot reply will appear here.</b></div>
         
         <script>
            async function sendMessage() {
                const message = document.getElementById("message").value;
                
                const res = await fetch("/chat",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({message: message})
            });
                
            const data = await res.json();
            
            document.getElementById("response").innerHTML = 
                "<b> YOU: </b>" +data.user + "<br><b>Bot</b>>" + data.bot;//server is responding to the bot
             }
          </script>
      </body>
    </html>
    `)
});

app.post("/chat", (req, res) => {
    const userMessage = req.body.user || " ";
    const reply = simpleBot(userMessage);

    res.json({
        user: userMessage,
        bot : reply
    });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});