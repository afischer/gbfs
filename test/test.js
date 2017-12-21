const request = require('request');
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

      describe('autodiscovery feed', function() {
        var autoDiscovery
        before(function(done) {
          params = {
            url: system['Auto-Discovery URL'],
            json: true,
            timeout: 1000,
            headers: {'User-Agent': 'GBFS Validator'}
          }
          request(params, (err, res, body) => {
            if (err) done(err);
            assert.isNotEmpty(body)
            autoDiscovery = body
            done()
          })
        })
        after(() => request.server.close());

        it('has at least one language', function() {
          assert.isNotEmpty(autoDiscovery)
          languages = Object.keys(autoDiscovery.data).length
          assert.isAtLeast(languages, 1, 'feed has >=1 language')
        })

        it('has all required feeds', function() {
          langs = autoDiscovery.data
          for (var langCode in langs) {
            feeds = langs[langCode].feeds.map(x => x['name'])
            assert.include(feeds, 'system_information')
            assert.include(feeds, 'station_information')
            assert.include(feeds, 'station_status')
          }
        })
      })
    })
  })
})
