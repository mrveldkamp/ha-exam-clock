function updateClock() {
  // Get the current date and time
  const now = new Date()

  // Output current date
  document.getElementById("today").innerHTML = now.toDateString()

  // Formats to "HH:MM:SS AM/PM" automatically based on options
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })

  // Inject the string into your HTML element
  document.getElementById("digital-clock").textContent = timeString

  // Update Time Taken Codes
  updateTimeTakenCodes(now)
}

function updateTimeTakenCodes(now) {
  let rows = document.querySelectorAll(".exam-times tr")
  for (let row of rows) {
    let startTime = row.children[1].textContent
    row.children[3].innerHTML = getTimeCode(now, startTime)
  }
}

function getTimeCode(now, startTime) {
  let startDate = parseTime(startTime)
  if (startDate) {
    let diffInMins = (now - startDate) / (1000 * 60)
    if (diffInMins < 0) {
      return "-------"
    } else if (diffInMins < 150) {
      return 'A <em class="not-bold">(< 2.5 hours)</em>'
    } else if (diffInMins < 180) {
      return 'B <em class="not-bold">(2.5 to 3 hours)</em>'
    } else if (diffInMins < 210) {
      return 'C <em class="not-bold">(3 to 3.5 hours)</em>'
    } else if (diffInMins < 240) {
      return 'D <em class="not-bold">(3.5 to 4 hours)</em>'
    } else if (diffInMins < 270) {
      return 'E <em class="not-bold">(4 to 4.5 hours)</em>'
    } else if (diffInMins < 300) {
      return 'F <em class="not-bold">(4.5 to 5 hours)</em>'
    } else if (diffInMins < 330) {
      return 'G <em class="not-bold">(5 to 5.5 hours)</em>'
    } else if (diffInMins < 360) {
      return 'H <em class="not-bold">(5.5 to 6 hours)</em>'
    } else {
      return "-------"
    }
  } else {
    return "-------"
  }
}

function parseTime(timeString) {
  // 1. Create a new date object for today
  const date = new Date()

  // 2. Separate the numbers and the AM/PM part
  const match = timeString.match(/^(\d+):(\d+)\s*(AM|PM)$/i)
  if (!match) {
    return false
  }

  let hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  const ampm = match[3].toUpperCase()

  // 3. Fix the hours for afternoon and midnight
  if (ampm === "PM" && hours < 12) hours += 12
  if (ampm === "AM" && hours === 12) hours = 0

  // 4. Set the hours and minutes
  date.setHours(hours, minutes, 0, 0)
  return date
}
