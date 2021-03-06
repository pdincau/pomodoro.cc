var expect = require('chai').expect
var PomodoroValidator = require('./PomodoroValidator')

describe('PomodoroValidator', function () {
  it('validates a Pomodoro', function () {
    expect( PomodoroValidator.isValid() ).to.be.false

    expect( PomodoroValidator.isValid({
      minutes: 5,
      type: 'break',
      startedAt: Date.now()
    }) ).to.be.true
  })

  it('returns errors for empty Pomodoro', function () {
    var errors = PomodoroValidator.validate({})
    expect(errors.minutes).to.equal('required')
    expect(errors.type).to.equal('required')
    expect(errors.startedAt).to.equal('required')

    errors = PomodoroValidator.validate({foo:'bar'})
    expect(errors.minutes).to.equal('required')
    expect(errors.type).to.equal('required')
    expect(errors.startedAt).to.equal('required')
  })

  it('returns errors for invalid Pomodoro', function () {
    var errors = PomodoroValidator.validate({
      type: 'this_is_invalid',
      minutes: 'this_is_invalid',
      startedAt: 'this_is_invalid',
    })
    expect(errors.type).to.equal('"this_is_invalid" is not a valid type')
    expect(errors.minutes).to.equal('"this_is_invalid" are not valid minutes')
    expect(errors.startedAt).to.equal('"this_is_invalid" is not a valid timestamp')
  })

})
