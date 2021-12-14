export function convertTimestamp(timestamp:string | number):string {
  const d = new Date(+timestamp)
    //  yyyy = d.getFullYear(),
    // mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
    // dd = ('0' + d.getDate()).slice(-2);      // Add leading 0.
  const time = new Intl.DateTimeFormat('en-US').format(d);
  return time;
}