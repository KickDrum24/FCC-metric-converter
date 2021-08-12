
module.exports = function (app) {
  // function ConvertHandler() {
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  let inputRgx = /[a-z]+|[^a-z]+/gi;
  let units = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
  this.getNum = function (input) {
    let result;
    console.log(input.match(inputRgx));
    console.log("segmented input is ");
    result = input.match(inputRgx)[0];

    if (units.includes(result)) { result = 1 }
    else if (result.slice(1).includes('/')) {
      if ((result.slice(1).match(/[/]/g)).length > 1){
        return 'invalid';
      }
      var splt = result.split('/');
      result = splt[0] / splt[1];
    }
    return (isNumeric(result) ? Number(result) : 'invalid');

  };

  this.getUnit = function (input) {
    let result;
    console.log(input)
    if (units.includes(input)) {
      result = input;
    } else {
      result = input.match(inputRgx)[1]
    }
    return (units.includes(result)) ? result : 'invalid';
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    var dex = units.indexOf(initUnit);
    if (dex % 2 == 0) {
      ;
      result = units[dex + 1]
    } else {
      result = units[dex - 1];
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    result = Math.round(result * 100000) / 100000;
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const longUnits = {
      'gal': 'gallons',
      'L': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    }
    let result;
    result = initNum + ' ' + longUnits[initUnit] + ' converts to ' +
      returnNum + ' ' + longUnits[returnUnit];
    return result;
  };

}
// }
// module.exports = ConvertHandler;
