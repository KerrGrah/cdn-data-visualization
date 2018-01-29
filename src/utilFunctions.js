Number.prototype.pad = function (len) {
    return (new Array(len+1).join("0") + this).slice(-len);
}

export function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes().pad(2);
  //const sec = a.getSeconds();
  const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min //+ ':' + sec ;
  const short = date + ' ' + month
  return [time, short];
}
