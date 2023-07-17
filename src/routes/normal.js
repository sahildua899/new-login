const express = require('express');
const path = require('path')

const normalRouter = express.Router();

normalRouter.get('/', (req,res)=>{
    res.render('index')
})
normalRouter.get('/reset', (req,res)=>{
    res.sendFile(path.join(__dirname,'..','..', 'public', 'pages', 'forgot.html'))
})
normalRouter.get('/newPassword/*', (req,res)=>{
    res.sendFile(path.join(__dirname, '..','..', 'public', 'pages', 'newPassword.html'))
})
normalRouter.get('/authenticate/*', (req,res)=>{
    res.sendFile(path.join(__dirname, '..','..', 'public', 'pages', 'verify.html'))
})
normalRouter.get('/allusers', (req,res)=>{
    res.sendFile(path.join(__dirname, '..','..', 'public', 'pages', 'allusers.html'))
})
normalRouter.get('/dashboard', (req,res)=>{
    res.sendFile(path.join(__dirname, '..','..', 'public', 'pages', 'dashboard.html'))
})




module.exports = normalRouter