const { dateConverter } = require('../utils/utils');

describe('#DateConverter', () => {
  it('tests date is converted into Month,Day,Year Format', () => {
    expect(dateConverter('2018-05-30T15:59:13.341Z')).toBe('May 30, 2018');
  });
});
