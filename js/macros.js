const FIRST_YEAR = 1975;
const QUARTERS = {
  "Fall": [9, 12], // september to december
  "Winter": [1, 3], // january to march
  "Spring": [3, 6], // march to june
  "Summer": [6, 9] // june to september
}

const currentYear = new Date().getFullYear();
const yearsInMinistry = currentYear - FIRST_YEAR;
const currentMonth = new Date().getMonth() + 1;
const currentQuarter = Object.keys(QUARTERS).find(quarter => {
  const [start, end] = QUARTERS[quarter];
  return currentMonth >= start && currentMonth <= end;
});


$(document).ready(function() {
  $(".course-weekday").text("Tuesday")
  $(".course-time").text("7-9pm")
  $(".quarter-year").text(`${currentQuarter} ${currentYear}`)
  $(".course-location").html("Old Union 3rd floor Seminar Room 301 <a style='color:#0085a1' target='_blank' href='https://goo.gl/maps/oY2YduWT5R187d7K7'>(map)</a>")
  $(".course-duration").text("2-year")
  $(".years-in-ministry").text(yearsInMinistry)
});
