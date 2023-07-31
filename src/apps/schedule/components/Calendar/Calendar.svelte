<script>
  import "../Calendar/Calendar.style.scss";
  const DAYS = 7;
  const BLOCKS = 29;
  const PAST12 = 8;
  const START_TIME = 8;
  let militaryTime = false;
  export let events;
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  console.log(events);
</script>

<div class="calendar-container">
  <div class="calendar">
    {#each Array(DAYS + 1) as _, i}
      <div>
        <div class="day-label">
          {#if i !== 0}
            {weekdays[i - 1]}
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
