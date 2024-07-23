<script lang="ts">
  import { onMount } from 'svelte';

  let message: string = 'Loading...';

  onMount(() => {
    fetch('http://127.0.0.1:5000/')
      .then(response => response.json())
      .then(data => {
        message = data.message;
      })
      .catch(error => {
        message = 'Error loading data';
        console.error(error);
      });
  });
</script>

<main>
  <h1>{message}</h1>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
</style>