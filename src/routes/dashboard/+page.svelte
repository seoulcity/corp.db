<!--  -->
<script>
	export let data;
</script>

<section class="mt-8">
  <h2 class="text-2xl font-bold mb-4">Countries</h2>
  <ul class="list-none">
	  {#each data.countries as country}
		  <li class="py-2">{country.name}</li>
	  {/each}
  </ul>
</section>