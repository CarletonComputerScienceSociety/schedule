<script>
  import "../Calendar/Calendar.style.scss";
  const DAYS = 7;
  const BLOCKS = 29;
  const PAST12 = 8;
  const START_TIME = 8;
  let militaryTime = false;
  export let events;
  const dayTitles = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let schedule = [[],[],[],[],[],[],[]]
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  // This loop iterates over each day of the week and then checks each event to see if it falls within the day
  // if it does then it appends the event to the day list in the schedule array.
  for(let i = 0; i < dayNames.length; i++) {
    // iterates through each object
    for (const key of Object.keys(events)) {
      // checks if the event is on the day
    if (events[key].days.includes(dayNames[i])) {
      // console.log(events[key].id + " is on " + dayNames[i])
      // adds the event to the day in the schedule array
      schedule[i].push(events[key])
    }
  }
  }

  // this for loop iterates through each list within the array of schedule
  // and sort each item in the day by order of events (by start time)
  for(let i = 0; i < schedule.length; i++) {
    // checks if the day has at least 2 events (requires sorting)
    if(schedule[i].length > 1) {
      schedule[i].sort((a, b) => a.startTime - b.startTime);
    }
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
              <div class="calendar-time-blocks outline" />
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
