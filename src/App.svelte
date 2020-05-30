<script>
  import AddEvent from "./AddEvent.svelte";
  import Event from "./Event.svelte";
  import { fade } from "svelte/transition";
  export let name;

  let events = new Set();

  if (localStorage.getItem("events")) {
    events = JSON.parse(localStorage.getItem("events"));
  } else {
    localStorage.setItem("events", JSON.stringify(events));
  }

  let showEvents = true;

  const toggleEvents = () => (showEvents = !showEvents);

  function addEvent(e) {
    const newEvent = e.detail;
    events = [...events, newEvent];

    localStorage.setItem("events", JSON.stringify(events));
    events = JSON.parse(localStorage.getItem("events"));


    if (showEvents === false) showEvents = true;
  }

  function deleteEvent(e) {
    events = events.filter(event => event.name !== e.detail);
    events = [...events];
    localStorage.setItem("events", JSON.stringify(events));
    events = JSON.parse(localStorage.getItem("events"));


  }
</script>

<style>
  main {
    text-align: center;
    padding: 1rem;
    max-width: 240px;
    margin: 0 auto;
  }
  button {
    background: none;
    border: none;
  }
  button:focus {
    outline: none;
  }

  h1 {
    color: #553c9a;
    text-transform: uppercase;
    margin-bottom: -10px;
    font-weight: 100;
  }

  .events {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  #no-events {
    margin-top: 2rem;;
  }
  #no-events img{
    width: 100%;
  }
  #events button {
    color: #805ad5;
    border: 2.5px solid #805ad5;
    background: none;
    padding: 7px;
    font-weight: bold;
    margin: 1rem 0;
  }
  #events button:hover {
    color: #faf5ff;
    background: #805ad5;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
    #no-events img{
    width: 80%;
  }
  }
</style>

<main>
  <h1>{name}</h1>
  <p>Tracking the days, hours, minutes, and seconds until your event!</p>

  <AddEvent on:addEvent={addEvent} />

  <hr>

  {#if events.length >= 1}
    <section id="events">

      <button on:click={toggleEvents}>
        {#if showEvents}Hide Events{:else}Show Events{/if}
      </button>
      {#if showEvents}
        <div class="events" transition:fade>
          {#each events as event (event.id)}
            <Event {...event} on:deleteEvent={deleteEvent} />
          {/each}
        </div>
      {/if}
    </section>
    {:else}
    <div id="no-events">
      <img src="img/undraw_pitching_36ol.svg" alt="no events">
      <p>Don't just stand around... add an event</p>
    </div>
  {/if}

</main>
