<script>
  import { onInterval } from "./utils.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let name;
  export let date;
  export let time;

  let backgrounds = [
    "blue-bubbles-sharon-mccutcheon",
    "bronze-bubbles-kai-dahms",
    "clear-bubbles-alfred",
    "color-bubbles-david-clode",
    "paint-stripes-david-pisnoy",
    "purple-bubbles-sharon-mccutcheon",
    "tye-dye-roses-denise-chan"
  ];
  let image = Math.floor(Math.random() * 6 + 1);

  const deleteEvent = () => dispatch("deleteEvent", name);

  let countdownDate = new Date(`${date.replace(/-/g, "/")} ${time}`).getTime();

  function dateFormat(date){
  date = date.replace(/-/g, "/");
  return new Date(date).toDateString();
  }

  function timeFormat(time) {
    let hour = time.slice(0, 2);
    let partOfDay = hour >= 12 ? "pm" : "am";
    let minute = time.slice(3);

    hour = parseInt(hour) % 12;
    if (hour === 0) {
      hour = 12;
    }

    return `${hour}:${minute} ${partOfDay}`;
  }

  // Get today's date and time
  $: now = new Date().getTime();

  // Find the distance between now and the count down date
  $: distance = countdownDate - now;

  // Time calculations for days, hours, minutes and seconds
  $: days = Math.floor(distance / (1000 * 60 * 60 * 24));
  $: hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  $: minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  $: seconds = Math.floor((distance % (1000 * 60)) / 1000);

  onInterval(() => (now = new Date().getTime()), 1000);
</script>

<style>
  .event {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    width: 300px;
    /* height: 250px; */
    padding: 20px;
    margin-bottom: 25px;
    position: relative;
    font-weight: bold;
  }
  .event-info {
    background: hsla(270, 100%, 98%, 0.9);
    /* background: rgba(255, 255, 255, 0.9); */
    min-height: 80%;
    min-width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10% 0;
    padding: 1rem;
  }
  .event-name {
    font-size: 1.5rem;
    color: #9f7aea;
  }
  .countdown span {
    font-size: 2rem;
    color: #9f7aea;
  }
  button {
    background: none;
    border: none;
  }
</style>

<div
  class="event"
  style="background: url('img/{backgrounds[image]}.jpg') no-repeat;
  background-size: cover;">

  <div style="position: absolute; top:0;right:-5px;">
    <button id="delete-event" on:click={deleteEvent}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke=" #ff000080"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash-2">
        <title>Delete Event Button</title>
        <polyline points="3 6 5 6 21 6" />
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2
          0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        <style>
          svg:hover {
            stroke: #ff0000;
          }
        </style>
      </svg>
    </button>
  </div>
  <div class="event-info">
    <div>
      <span class="event-name">{name}</span>
      <br />
      {dateFormat(date)}
      <br />
      at
      <br />
      {timeFormat(time)}
    </div>

    {#if distance > 0}
      <div class="countdown">
        {#if days > 0}
          <span class="">{days}</span>
          {days === 1 ? 'day' : 'days'}
        {/if}
        {#if hours > 0}
          <span class="">{hours}</span>
          {hours === 1 ? 'hour' : 'hours'}
        {/if}
        {#if minutes > 0}
          <span class="">{minutes}</span>
          {minutes === 1 ? 'minute' : 'minutes'}
        {/if}
        <br />
        <span class="">{seconds}</span>
        {seconds === 1 ? 'second' : 'seconds'}
      </div>
    {:else}
      <span style="color: red; font-weight: bold;">TIME'S UP</span>
    {/if}
  </div>
</div>
