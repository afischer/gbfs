const fs = require('fs');
const assert = require('chai').assert;
const Ajv = require('ajv');
const parse = require('csv-parse/lib/sync');
const url = require("url")
const systems = parse(fs.readFileSync('systems.csv', 'utf8'), {columns: true});

describe('bike share systems', function() {
  systems.forEach((system) => {
    describe(system['Name'], function() {
      describe('csv entry', function() {
        it('has a valid country code', function() {
          code = system['Country Code']
          assert.isNotEmpty(code)
          assert.lengthOf(code, 2)
        })

        it('has a system name', function() {
          name = system['Name']
          assert.isNotEmpty(name)
        })

        it('has a location', function() {
          loc = system['Location']
          assert.isNotEmpty(loc)
        })

        it('has a valid system id', function() {
          id = system['System ID']
          assert.isNotEmpty(id)
        })

        it('has a valid URL', function() {
          parsedURL = url.parse(system['URL'])
          assert.isNotEmpty(parsedURL.hostname)
        })

        it('has a valid autodiscovery URL', function() {
          parsedURL = url.parse(system['Auto-Discovery URL'])
          assert.isNotEmpty(parsedURL.hostname)
          assert.include(parsedURL.path, 'gbfs', 'url path references gbfs')
        })
      })
    })
  })
})
