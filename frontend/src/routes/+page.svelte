<script>
  import { onMount } from 'svelte';

  let message = '';
  let error = '';

  async function fetchData() {
    try {
      const response = await fetch('http://localhost/api/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      message = data.message;
    } catch (err) {
      error = err.message;
    }
  }

  onMount(() => {
    fetchData();
  });
</script>

<h1 class="text-3xl font-bold underline">{message}</h1>
{#if error}
  <p class="text-red-500">{error}</p>
{/if}
