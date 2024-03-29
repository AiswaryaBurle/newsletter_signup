const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res)
{
  res.sendFile(__dirname+ "/signup.html")
})

app.post("/", function(req, res)
{
  const firstName= req.body.fname;
  const lastName= req.body.lname;
  const mail= req.body.email;

  const data=
  {
    members:
    [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields:
        {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData= JSON.stringify(data);
  const url= "https://us10.api.mailchimp.com/3.0/lists/198a667c6d";
  const options=
  {
    method: "POST",
    auth: //Your API link
  }

  const request= https.request(url, options, function(response)
  {
    if(response.statusCode=== 200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else
    {
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data", function(data)
    {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req, res)
{
  res.redirect("/");
})

app.listen(3000, function()
{
  console.log("Server is running on port 3000");
});


//API key
//8cd13d422c504818351254c6b3b20efc-us10
//list id
//198a667c6d
