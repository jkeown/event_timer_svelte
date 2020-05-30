import { afterUpdate, onDestroy } from "svelte";

export function onInterval(callback,milliseconds) {
    const interval = setInterval(callback, milliseconds);
  
    afterUpdate(() => {
      onInterval;
    });

  onDestroy(() => {
    clearInterval(interval);
  });
}
