export const parseTime = (time) => {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = Date.now() - (time * 1000);

  if (elapsed < msPerMinute) {
       const timeDiff = Math.floor(elapsed/1000)
       return `${timeDiff} ${timeDiff === 1 ? 'second' : 'seconds'} ago`;   
  }

  else if (elapsed < msPerHour) {
       const timeDiff = Math.floor(elapsed/msPerMinute)
       return `${timeDiff} ${timeDiff === 1 ? 'minute' : 'minutes'} ago`;   
  }

  else if (elapsed < msPerDay ) {
      const timeDiff = Math.floor(elapsed/msPerHour)
      return `${timeDiff} ${timeDiff === 1 ? 'hour' : 'hours'} ago`;   
  }

  else if (elapsed < msPerMonth) {
    const timeDiff = Math.floor(elapsed/msPerDay)
    return `${timeDiff} ${timeDiff === 1 ? 'day' : 'days'} ago`;   
  }

  else if (elapsed < msPerYear) {
    const timeDiff = Math.floor(elapsed/msPerMonth)
    return `${timeDiff} ${timeDiff === 1 ? 'month' : 'months'} ago`;   
  }

  else {
    const timeDiff = Math.floor(elapsed/msPerYear)
    return `${timeDiff} ${timeDiff === 1 ? 'year' : 'years'} ago`;   
  }
}
