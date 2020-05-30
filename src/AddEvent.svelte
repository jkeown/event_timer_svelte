<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let event = {
    name: "",
    date: "",
    time: ""
  };

  function sendEvent(e) {
    dispatch("addEvent", event);
    event = {
      name: "",
      date: "",
      time: "",
      id: Date.now()
    };
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto 1rem;
    max-width: 300px;
  }
    
  input {
    width: 100%;
    padding: 5px;
    border-color: #d6bcfa;
    margin-bottom: 1rem;
    box-shadow: none;
  }
  input:focus {
    outline: none;
    border: 2px solid #6b46c1;
  }
  
  button {
    color: #805ad5;
    border: 2.5px solid #805ad5;
    background: none;
    padding: 7px;
    font-weight: bold;
  }
  button:hover {
    color: #faf5ff;
    background: #805ad5;
  }
</style>

<form on:submit|preventDefault={sendEvent} class="inputs">

  <div>
    <input
      bind:value={event.name}
      id="name"
      type="text"
      placeholder="Event Name"
      required />
    <input
      bind:value={event.date}
      id="date"
      type="date"
      placeholder="Event Date"
      required />
    <input
      bind:value={event.time}
      id="time"
      type="time"
      placeholder="Event Time"
      required />
  </div>
  <div>
    <button type="submit">Add Event</button>
  </div>

</form>
