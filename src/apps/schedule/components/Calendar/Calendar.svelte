<script>
  import "../Calendar/Calendar.style.scss";

  const DAYS = 7;
  const BLOCKS = 24;
</script>

<div class="calendar">
  {#each Array(DAYS) as _, i}
    <div>
      <div>Day: {i}</div>
      <div class="calendar-day">
        {#each Array(BLOCKS) as _, j}
          {#if j % 2 === 0}
            <div class="calendar-time-blocks">
              Block: {j} (even)
            </div>
          {:else}
            <div class="calendar-time-blocks">
              Block: {j} (odd)
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</div>
