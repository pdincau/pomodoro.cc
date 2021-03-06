var expect = require('chai').expect
var TimeFormatter = require('./TimeFormatter')

describe('TimeFormatter', function () {
  it('formats seconds to timer display', function () {
    expect(TimeFormatter.formatSeconds(60)).to.equal('01:00')
    expect(TimeFormatter.formatSeconds(10)).to.equal('00:10')
    expect(TimeFormatter.formatSeconds(-1)).to.equal('00:00')
    expect(TimeFormatter.formatSeconds(undefined)).to.equal('00:00')
  })
})
