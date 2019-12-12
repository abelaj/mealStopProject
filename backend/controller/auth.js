const Customer = require("../models/customer");
const Restaurant = require("../models/restaurant")
const bcrypt = require("bcryptjs");
const hat = require("hat");

const saltRounds = 10; // how many times to salt the password

const rack = hat.rack(64, 16);

exports.checkAuth = (req, res, next) => {
    if (req.body.api_token === undefined) {
        res.status(400).json( {success:false, error: "Missing api_token in request"} );
    }else{
        next();
    }
};

exports.registerCustomer = (req, res) => {
    Customer.find({email: {$regex : new RegExp(req.body.email,"i")}},
    function (err, docs){

        if(err){
            console.log("ERROR " + err);
            res.status(500).json( {error: "Could not save it to database" } );
        }
        if(!docs.length){
            const tempCustomer = new Customer();
            const {name,email,password} = req.body;
            tempCustomer.name = name;
            tempCustomer.email = email;
            tempCustomer.api_token = rack();
            tempCustomer.status = "registered";
            bcrypt.hash(password, saltRounds, function(err, hash){
                tempCustomer.password_hash = hash;
                tempCustomer.save(function(err){
                    if (err){
                        console.log("Error while saving to database ");
                        res.status(500).send(err);
                    }
                    res.status(201);
                    res.json( {message: "Succesfully registered", user_type: "Customer" ,api_token: tempCustomer.api_token} );
                });
            });
        }else{
            res.status(400);
            res.json( {error: "Username or Email belongs to another user"} );
        }
    });
};

exports.loginCustomer = (req, res) => {
    if (req.body.email === undefined || req.body.password === undefined){
        res.status(400).json( {error: "Missing email or password in request"} );
    }else{
      Customer.find(
          {email: req.body.email},
        function (err, docs){
            if(!docs.length || err){
                res.status(401).json( {error: "Could not find account"} );
            }else{
                console.log("Comparing passwords");
                bcrypt.compare(req.body.password, docs[0].password_hash, function(err, valid){
                    if (valid){
                        const {api_token, name, status,email} = docs[0]
                        res.status(201).json({api_token,name,status,email} );
                    }else{
                        res.status(401).json( {error: "Invalid password"} );
                    }
                });
            }
        });
    }
};

exports.validateRestaurant = (req,res,next) =>{
  const {api_token} = req.body;
  if (api_token === undefined) {
      res.status(400).json( {success:false, error: "Missing api_token in request"} );
  }else{
      Restaurant.find({api_token}, (err,docs) => {
        if(err) {
          res.json(400).json({success: false, error: "invalid api token"})
        }
        if(!docs.length){
          res.json(400).json({success: false, error: "invalid api token"})
        }else{
          next();
        }
      })
  }
}
exports.registerRestaurant = (req, res) => {
    Restaurant.find({email: {$regex : new RegExp(req.body.email,"i")}},
    function (err, docs){

        if(err){
            console.log("ERROR " + err);
            res.status(500).json( {error: "Could not save it to database" } );
        }
        if(!docs.length){
            const tempRestaurant = new Restaurant();
            const {name,email,password} = req.body;
            tempRestaurant.name = name;
            tempRestaurant.email = email;
            tempRestaurant.api_token = rack();
            bcrypt.hash(password, saltRounds, function(err, hash){
                tempRestaurant.password_hash = hash;
                tempRestaurant.save(function(err){
                    if (err){
                        console.log("Error while saving to database ");
                        res.status(500).send(err);
                    }
                    res.status(201);
                    res.json( {message: "Sucesfully registered" ,api_token: tempRestaurant.api_token} );
                });
            });
        }else{
            res.status(400);
            res.json( {error: "Username or Email belongs to another user"} );
        }
    });
};

exports.loginRestaurant = (req, res) => {
    if (req.body.email === undefined || req.body.password === undefined){
        res.status(400).json( {error: "Missing email or password in request"} );
    }else{
      Restaurant.find(
          {email: req.body.email},
        function (err, docs){
            if(!docs.length || err){
                res.status(401).json( {error: "Could not find account"} );
            }else{
                console.log("Comparing passwords");
                bcrypt.compare(req.body.password, docs[0].password_hash, function(err, valid){
                    if (valid){
                        const {api_token, name, status,email} = docs[0]
                        res.status(201).json({api_token,name,status,email} );
                    }else{
                        res.status(401).json( {error: "Invalid password"} );
                    }
                });
            }
        });
    }
};
