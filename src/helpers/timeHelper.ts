export function convertTimestamp(timestamp:string | number):string {
  const d = new Date(+timestamp);
  let hh: string | number = d.getHours(),
    mm: string | number = d.getMinutes();
  if(+hh<10){
    hh='0'+hh
  }
  if(+mm<10){
    mm='0'+mm
  }
  // const time = new Intl.DateTimeFormat('en-US').format(d);
  const time = hh+':'+mm
  return time;

}