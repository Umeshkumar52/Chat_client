function timer(){
const hours = new Date(Date.now()).getHours();
let realHours;
let newFormat;
if (hours > 12) {
  realHours = hours - 12;
} else if (hours < 12) {
  realHours = hours;
} else if (hours == 12) {
  realHours = hours;
}
if (hours >= 12) {
  newFormat = "PM";
} else {
  newFormat = "AM";
}
 return realHours + ":" + new Date(Date.now()).getMinutes() + " " + newFormat
}
export default timer