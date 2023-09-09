const express = require('express');
const {contacts} = require("../dummydata");
const router = express.Router();

//const sequelize = require('./database/dbConfig');
const Contact = require("../database/model");

module.exports = () =>{
    router.get("/",async (req, res)=>{
        const contactList = await Contact.findAll();
        console.log("hello",contactList[0])
        res.render("home", {contacts: contactList});
    });

    // landing page
    router.get("/contacts",(req,res)=>{
        res.send("contacts page");
    })

    // por saving a new post
    router.post("/new",async (req,res)=>{
        console.log(req.body);
        await Contact.create(req.body);
        //res.send("new contact saved page")
        res.redirect("/");
    });

    // for updating a post
    router.post("/update/:contactId", async (req, res)=>{
        console.log(req.body);
        const id = req.params.contactId;
        console.log("id: ", id);

        // update
        const {name, mobile} = req.body;
        await Contact.update({name, mobile},{where:{id}});

        res.redirect("/");
    });

    // for deleting a post
    router.post("/delete/:contactId",async (req,res)=>{
        console.log(req.body);
        const id = req.body.id;
        //res.send("contacts deleted page")
        await Contact.destroy({where:{id}})
        res.status(200).send();
    });

    router.post("/search",async (req, res)=>{
        const {name} = req.body;
        // now search in Contacts
        const searchResult = await Contact.findOne({where:{name}});
        const statusCode = searchResult? 200 : 204;
        res.status(statusCode).send(searchResult);
    })

    return router;
}