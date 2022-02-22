
// var datestr = 'Feb 18th, 2022 at 3:11 am'.replace('at ','')
// var rmSt = datestr.replace('st,','')
// var rmNd = rmSt.replace('nd,','')
// var rmTh = rmNd.replace('th,','')
// var rmRd = rmTh.replace('rd,','')
// var date = rmRd
// var unxdate = Date.parse(date)  
// console.log(unxdate);
// console.log(new Date());



// const addDateSuffix = (date) => {
//     let dateStr = date.toString();
  
//     // get last char of date string
//     const lastChar = dateStr.charAt(dateStr.length - 1);
  
//     if (lastChar === '1' && dateStr !== '11') {
//       dateStr = `${dateStr}st`;
//     } else if (lastChar === '2' && dateStr !== '12') {
//       dateStr = `${dateStr}nd`;
//     } else if (lastChar === '3' && dateStr !== '13') {
//       dateStr = `${dateStr}rd`;
//     } else {
//       dateStr = `${dateStr}th`;
//     }
  
//     return dateStr;
//   };


// function beautifytime(
//     timestamp,
//     { monthLength = 'short', dateSuffix = true } = {}
//   ){
//     // create month object
//     const months = {
//       0: monthLength === 'short' ? 'Jan' : 'January',
//       1: monthLength === 'short' ? 'Feb' : 'February',
//       2: monthLength === 'short' ? 'Mar' : 'March',
//       3: monthLength === 'short' ? 'Apr' : 'April',
//       4: monthLength === 'short' ? 'May' : 'May',
//       5: monthLength === 'short' ? 'Jun' : 'June',
//       6: monthLength === 'short' ? 'Jul' : 'July',
//       7: monthLength === 'short' ? 'Aug' : 'August',
//       8: monthLength === 'short' ? 'Sep' : 'September',
//       9: monthLength === 'short' ? 'Oct' : 'October',
//       10: monthLength === 'short' ? 'Nov' : 'November',
//       11: monthLength === 'short' ? 'Dec' : 'December',
//     };
  
//     const dateObj = new Date(timestamp);
//     const formattedMonth = months[dateObj.getMonth()];
  
//     const dayOfMonth = dateSuffix
//       ? addDateSuffix(dateObj.getDate())
//       : dateObj.getDate();
  
//     const year = dateObj.getFullYear();
//     let hour =
//       dateObj.getHours() > 12
//         ? Math.floor(dateObj.getHours() - 12)
//         : dateObj.getHours();
  
//     // if hour is 0 (12:00am), change it to 12
//     if (hour === 0) {
//       hour = 12;
//     }
  
//     const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  
//     // set `am` or `pm`
//     const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
  
//     const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
//     return formattedTimeStamp;
//   }


const reviews = [
  {
      manager : {
          employeeId : 'Aliammar-AR'
      },
      month : 'January 2022',
      review : 'Alway using his phone'
  },
  {
      manager : {
          employeeId : 'Uzair-UM'
      },
      month : 'January 2022',
      review : 'Coming Late'
  },
  {
      manager : {
          employeeId : 'Zanir-ZM'
      },
      month : 'January 2022',
      review : 'Need to Talk About Photography'
  },
  {
      manager : {
          employeeId : 'Iqbal-IK'
      },
      month : 'December 2021',
      review : 'Good job!'
  },
  {
      manager : {
          employeeId : 'Zanir-ZM'
      },
      month : 'December 2021',
      review : 'Well Done'
  },
  {
      manager : {
          employeeId : 'Aliammar-AR'
      },
      month : 'December 2021',
      review : 'Coming Late'
  },
  {
      manager : {
          employeeId : 'Shermyn-SM'
      },
      month : 'November 2021',
      review : 'Takes long Breaks'
  },
  {
      manager : {
          employeeId : 'Zanir-ZM'
      },
      month : 'November 2021',
      review : 'Talk About Future Plans'
  },
  {
      manager : {
          employeeId : 'Iqbal-IK'
      },
      month : 'November 2021',
      review : 'Picture Quality is bad'
  }  
]

const monthsarr = []

for (let i = 0; i <reviews.length; i++){
   monthsarr.push(reviews[i].month)
}

const uniquemonthsarr = [...new Set(monthsarr)]

for (let i = 0; i < uniquemonthsarr.length; i++){
  const uniquemonthsarr[i] = reviews.filter((oneReview) => oneReview.month == uniquemonthsarr[i])
}

















