<!-- src/routes/dashboard/countries/+page.svelte -->
<script>
    export let data;
  </script>
  
  <h2 class="text-2xl font-bold mb-4">People</h2>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each data.people as person}
      <li class="bg-white shadow rounded p-4">{person.name}</li>
    {/each}
  </ul>