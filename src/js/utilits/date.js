import MONTHS from '../constants/months';

function cardDate(dateItem) {
  const day = dateItem.getDate();
  const month = dateItem.getMonth();
  const year = dateItem.getFullYear();
  return `${day} ${MONTHS[month]}, ${year}`;
}

// function apiDate(dateItem) {
//   const day = dateItem.getDate().toString().padStart(2, '0');
//   const month = (1 + dateItem.getMonth()).toString().padStart(2, '0');
//   const year = dateItem.getFullYear();
//   return `${year}-${month}-${day}`;
// }

// function nthDaysAgoFromDate(dateItem, days) {
//   const daysMs = 1000 * 60 * 60 * 24 * days;
//   const sevenDaysItem = new Date(Date.parse(dateItem) - daysMs);
//   return apiDate(sevenDaysItem);
// }

export default {
  cardDate
};