let localTime = document.getElementById('local-time')
let utcTime = document.getElementById('utc-time')

let utcFormated = formatUtc(utcTime.innerHTML)
utcTime.innerHTML = utcFormated

// Function to format the UTC time given by the API in a more presentable way
function formatUtc(date) {
  let month = date.slice(5, -10)
  let day = date.slice(8, -7)
  let year = date.slice(0, -13)
  let hours = date.slice(11, -4)
  let minutes = date.slice(14, -1)
  return month + "/" + day + "/" + year + "  " + hours + ':' + minutes
}

let d = new Date()
localTime.innerHTML = formatDate(d)

// Formatting the local time
function formatDate(date) {
  let hours = date.getHours()
  hours = hours < 10 ? '0'+hours : hours
  let minutes = date.getMinutes()
  minutes = minutes < 10 ? '0'+minutes : minutes
  let day = date.getDate()
  day = day < 10 ? '0'+day : day
  let month = date.getMonth() + 1
  month = month < 10 ? '0'+month : month
  return month + "/" + day + "/" + date.getFullYear() + "  " + hours + ':' + minutes
}