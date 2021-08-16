const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    // Write the following tests in tests/1_unit-tests.js:

    // convertHandler should correctly read a whole number input.
    test("whole number input", function (done) {
        var input = "58lbs";
        assert.equal(convertHandler.getNum(input), 58);
        done();
    });
    // convertHandler should correctly read a decimal number input.
    test("decimal number input", function (done) {
        var input = "5.8lbs";
        assert.equal(convertHandler.getNum(input), 5.8);
        done();
    });
    // convertHandler should correctly read a fractional input.
    test("fractional input", function (done) {
        var input = "5/8lbs";
        assert.equal(convertHandler.getNum(input), 5 / 8);
        done();
    });
    // convertHandler should correctly read a fractional input with a decimal.
    test("fractional input with a decimal", function (done) {
        var input = "4.5/8lbs";
        assert.equal(convertHandler.getNum(input), .56250);
        done();
    });
    // convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test("return an error on a double-fraction", function (done) {
        var input = "3/2/3mi";
        assert.equal(convertHandler.getNum(input), "invalid");
        done();
    });
    // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test("default to 1 when no numerical input is provided", function (done) {
        var input = "kg";
        assert.equal(convertHandler.getNum(input), 1);
        done();
    });
    // convertHandler should correctly read each valid input unit.
    test("correctly read each valid input unit", function (done) {
        var input = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
        input.forEach(function (uni) {
            assert.equal(convertHandler.getUnit(7.34 + uni), uni);
        });
        done();
    });
    // convertHandler should correctly return an error for an invalid input unit.
    test("correctly return an error for an invalid input unit", function (done) {
        var input = 'nm';
        assert.equal(convertHandler.getUnit(7.34 + input), "invalid");
        done();
    });
    // convertHandler should return the correct return unit for each valid input unit.
    test("correctly read each valid input unit", function (done) {
        var input = {
            'gal': 'L',
            'lbs': 'kg',
            'mi': 'km',
            'L': 'gal',
            'kg': 'lbs',
            'km': 'mi'
        };
        Object.keys(input)
            .forEach(function eachKey(key) {
                assert.equal(convertHandler.getReturnUnit(key), input[key]);
            });
        done();
    });
    // convertHandler should correctly return the spelled-out string unit for each valid input unit.
    test("correctly return the spelled-out string unit for each valid input unit", function (done) {
        var input = {
            'gal': 'liters',
            'L': 'gallons',
            'lbs': 'kilograms',
            'kg': 'pounds',
            'mi': 'kilometers',
            'km': 'miles'
        }
        Object.keys(input)
            .forEach(function eachKey(key) {
                var retString = convertHandler.getString(
                    // initNum
                    38,
                    // initUnit
                    key,
                    // returnNum, 
                    convertHandler.convert(38, key),
                    // returnUnit
                    convertHandler.getReturnUnit(key))
                retString = retString.split(" ");
                console.log(retString)
                assert.equal(retString.slice(-1), input[key]);
            });
        done();
    });
    // convertHandler should correctly convert gal to L.
    test('correctly convert gal to L', function(done) {
        var input = [6, 'gal'];
        var expected = 22.71246;
        assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); 
        done();
      });
    // convertHandler should correctly convert L to gal.
    test('correctly convert mi to km', function(done) {
        var input = [13, 'L'];
        var expected = 3.43424;
        assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); 
        done();
      });
    // convertHandler should correctly convert mi to km.
    test('correctly convert mi to km', function(done) {
        var input = [1, 'mi'];
        var expected = 1.60934;
        assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); 
        done();
      });
    // convertHandler should correctly convert km to mi.
    test('correctly convert km to mi', function(done) {
        var input = [10, 'km'];
        var expected = 6.21373;
        assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); 
        done();
      });
    // convertHandler should correctly convert lbs to kg.
    test('correctly convert lbs to kg', function(done) {
        var input = [175, 'lbs'];
        var expected = 79.37860;
        assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); 
        done();
      });
    // convertHandler should correctly convert kg to lbs.
    test('correctly convert kg to lbs', function(done) {
        var input = [63.2, 'kg'];
        var expected = 139.33226;
        assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); 
        done();
      });

});