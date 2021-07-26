require('dotenv').config();
const datetime = require('node-datetime');
const axios = require('axios');
const { response } = require('express');
const passKey = process.env.PASSKEY;
const shortCode = process.env.SHORTCODE;
const consumerKey = process.env.CONSUMERKEY;
const consumerSecret = process.env.CONSUMERSECRET;

const newPassword =  (req,res) => {
    const dt = datetime.create();
    const formarted = dt.format('YmdHMS');

    const passString = shortCode + passKey + formarted;

    const base64Encodedpassword = Buffer.from(passString).toString('base64');

    return base64Encodedpassword;
};

const mpesaPassword = (req,res) => {

    res.send(newPassword());

};

const token = (req,res,next) => {
  
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const auth = 'Basic ' + Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');
    const headers = {
        Authorization:auth,
    };
    
    axios
    .get(url,{
        headers:headers,
    })
    .then((response) => {
        let data =response.data;
        let access_token =data.access_token;
        req.token = access_token;
        console.log(access_token);
        next();

    })
    .catch((error) => console.log(error));

};

const stkPush = (req,res) => {
 const token = req.token;
 res.send(token);
 const dt = datetime.create();
 const formarted = dt.format('YmdHMS');


 const headers = {
    Authorization: 'Bearer ' + token,
 };

 const stkUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
 const data = {
    BusinessShortCode:shortCode,
    Password: newPassword(),
    Timestamp:formarted,
    TransactionType: "CustomerPayBillOnline",
    Amount: 10,
    PartyA: 254714129852,
    PartyB: 174379,
    PhoneNumber: 254714129852,
    CallBackURL: "https://mydomain.com/path",
    AccountReference: "CompanyXLTD",
    TransactionDesc: "Am working" 
  };

  axios
  .post(stkUrl,data,{
        headers:headers,
      }).then((response) => res.send(response.data));

};


module.exports = {
    newPassword,
    mpesaPassword,
    token,
    stkPush
   
};