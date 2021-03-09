import moment from 'moment';

function transformIndeedResults(result) {
  let daysAgo = result.date.split(' ')[0].replace('+', '');
  result._date = moment().subtract(Number(daysAgo), 'd').format('DD-MM-YY');
  result.hours = result.title.includes('Part-time') ? 'PT' : 'FT';
  result.remote = result.title.includes('Remote') ? true : false;
  /*let daysAgo = result.date.split(' ')[0].replace('+', '');*/
  /*result._date = moment()*/
  /*.subtract(Number(daysAgo), 'd')*/
  /*.format('DD-MM-YY');*/
}
function transformMonsterResults(result) {
  let daysAgo = result.date.split(' ')[0].replace('+', '');
  result._date = moment().subtract(Number(daysAgo), 'd').format('DD-MM-YY');
  result.hours = result.title.includes('Part-time') ? 'PT' : 'FT';
  result._salary = result.salary.split('\n');
  result.remote = result.title.includes('Remote') ? true : false;
}
export default { transformMonsterResults };
