<!-- src/routes/dashboard/companies_ko/+page.svelte -->
<script>
  import Pagination from './Pagination.svelte';

  export let data;
  let searchColumn = data.columns[0] || '';
  let searchQuery = '';

  let currentPage = 1;
  const itemsPerPage = 20;
  const maxVisiblePages = 5;

  $: paginatedCompanies = data.companies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  $: totalPages = Math.ceil(data.companies.length / itemsPerPage);

  function goToPage(page) {
    currentPage = page;
  }

  function search() {
    const url = new URL(window.location);
    url.searchParams.set('searchColumn', searchColumn);
    url.searchParams.set('searchQuery', searchQuery);
    window.location = url;
  }
</script>

<div class="mb-4">
<div class="flex items-center">
  <select bind:value={searchColumn} class="mr-2">
    {#each data.columns as column}
      <option value={column}>{column}</option>
    {/each}
  </select>
  <input type="text" bind:value={searchQuery} placeholder="Search..." class="mr-2" on:keydown={(e) => {
    if (e.key === 'Enter') {
      search();
    }
  }}>
  <button on:click={search} class="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
</div>
</div>

<h2 class="text-2xl font-bold mb-4">Companies (Korea)</h2>
{#if data.error}
<p class="text-red-500">{data.error}</p>
{:else if Array.isArray(data.companies) && data.companies.length > 0}
<ul>
  {#each paginatedCompanies as company, index}
    <li class="p-4" class:bg-gray-100={index % 2 === 0}>
      <h3 class="text-lg font-bold">{company.corp_name}</h3>
      <p>ID: {company.id}</p>
      <!-- Display other relevant fields from the companies_ko table -->
    </li>
  {/each}
</ul>
<Pagination {currentPage} {totalPages} {maxVisiblePages} onPageChange={goToPage} />
{:else}
<p>No companies found. Please try a different search.</p>
{/if}