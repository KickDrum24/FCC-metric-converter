'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = (app) => {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      var input = req.query.input;
      console.log("input is " + input)
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      //validity check
      if (initNum == 'invalid' && initUnit == 'invalid') {
        res.json('invalid number and unit')
        return
      } else if (initNum == 'invalid') {
        res.json('invalid number')
        return
      } else if (initUnit == 'invalid') {
        res.json('invalid unit')
        return
      }
      //if check passes respond w/resObject
      let resObject = {}
      resObject['initNum'] = initNum
      resObject['initUnit'] = initUnit
      resObject['returnNum'] = returnNum
      resObject['returnUnit'] = returnUnit
      resObject['string'] = toString

      res.json(resObject)
    });
};
