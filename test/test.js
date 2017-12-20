const fs = require('fs');
const assert = require('chai').assert;
const Ajv = require('ajv');
const parse = require('csv-parse/lib/sync');
const url = require("url")
const systems = parse(fs.readFileSync('systems.csv', 'utf8'));



  describe('System Tests', function() {
    systems.forEach((system) => {
      describe(`${system[1]} tests`, function() {
        it('is okay', function() {
          assert.isOk(true)
        })
      })
    });

    describe('test describe', function() {
      it('is okay', function() {
        assert.isOk(true)
      })
    })

  });

//   run();
// }, 500);



/*
setTimeout(function() {

  describe('All systems', function() {
    // load and check CSV


    for (var i in systems) {
      system = systems[i]
      var systemName = system[1]
      describe(`${systemName}`, function() {
        it("is a system", function() {
          console.log(foo);
          assert.isOk(true)
        })
      })
    }

    // describe('#indexOf()', function() {
    //   it('should return -1 when the value is not present', function() {
    //     console.log(systems);
    //     assert.equal([1,2,3].indexOf(4), -1);
    //   });
    // });
  });
}, 2000);
*/
