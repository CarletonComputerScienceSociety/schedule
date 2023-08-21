<script>
  import "../Calendar/Calendar.style.scss";
  const DAYS = 7;
  const BLOCKS = 29;
  const PAST12 = 8;
  const START_TIME = 8;
  let militaryTime = false;
  export let events;
  const dayTitles = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const times = []
  let i = 0


  // the while loop creates the times for the keys on each day and appends the string of the time
  // to the "times" list, line 23 is for skipping "22:30" since it's not on the calendar.
  while (i < 15) {
    let time_string = "";
    if (i < 2) {
      time_string += "0"
    }
    time_string += i+START_TIME + ":00"
    times.push(time_string)
    if(i < 14) {
    time_string = time_string.replace('00', '30')
    times.push(time_string)
    }
    i += 1
  }

  let schedule = {
  }

  const isInThisTime = (pTime, event) => {
    return event.startTime <= pTime && event.endTime > pTime
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  for(const day of dayNames) {
    if(schedule[day] === undefined) {
      schedule[day] = {}
    }
    for(const time of times) {
      if(schedule[day][time] === undefined) {
        schedule[day][time] = []
      }
    }
  }
  for(const event of events) {
    for(const day of event.days) {
      for(const time of times) {
        if(isInThisTime(time, event)) {
          schedule[day][time].push(event)
        }
      }
    }
  }


  const isEventInBlock = (day, time) => {
    const dayName = dayNames[day-1]
    const timeName = times[time]
    return schedule[dayName][timeName].length > 0
  }

  const courseName = (day, time) => {
    const dayName = dayNames[day-1]
    const timeName = times[time]
    const event = schedule[dayName][timeName][0]
    if(event.startTime !== timeName) {
      return ""
    }
    return event.displayName()
  }


</script>

<div class="calendar-container">
  <div class="calendar">
    {#each Array(DAYS + 1) as _, i}
      <div>
        <div class="day-label">
          {#if i !== 0}
            {dayTitles[i - 1]}
          {/if}
        </div>
        <div class="calendar-day">
          {#each Array(BLOCKS) as _, j}
            {#if i !== 0}
              {#if isEventInBlock(i, j)}
                <div class="calendar-time-blocks course-block">{courseName(i, j)}</div>
              {:else}
                <div class="calendar-time-blocks outline" />
              {/if}
            {:else if j % 2 == 0}
              <div class="calendar-time-blocks">
                {#if militaryTime === false && j > PAST12}
                  <div>{Math.floor(j / 2) + START_TIME - 12}:00</div>
                {:else}
                  <div>{Math.floor(j / 2) + START_TIME}:00</div>
                {/if}
              </div>
            {:else}
              <div class="calendar-time-blocks" />
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<div class="buttons-container">
  <button class="button-style" on:click={() => (militaryTime = !militaryTime)}
    >⏰ Toggle Military Time</button
  >
  <button
    class="button-style thing"
    on:click={() => (militaryTime = !militaryTime)}>🗓 Get Schedule Link</button
  >
</div>
