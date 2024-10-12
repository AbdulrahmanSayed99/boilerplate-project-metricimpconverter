'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req,res)=>{
    let input = req.query.input
    let initNum = convertHandler.getNum(input);
    let initUnit= convertHandler.getUnit(input);
    let returnNum= convertHandler.convert(initNum, initUnit);
    let returnUnit= convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    if(initNum === 'invalid number' && initUnit === 'invalid unit'){
     return res.json('invalid number and unit')
    }
  
    if(initNum === 'invalid number'){
      return res.json('invalid number')
    }  
  
    if(initUnit === 'invalid unit'){
      return res.json('invalid unit')
    }  
  
    let responseObject = {}
    responseObject['initNum'] = parseFloat(initNum)
    responseObject['initUnit'] = initUnit
    responseObject['returnNum'] = parseFloat(returnNum)
    responseObject['returnUnit'] = returnUnit
    responseObject['string'] = string
  
    res.json(responseObject)
  });
  }
