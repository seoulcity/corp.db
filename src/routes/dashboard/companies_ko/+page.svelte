<!-- src/routes/dashboard/companies_ko/+page.svelte -->
<script>
  import Pagination from './Pagination.svelte';

  export let data;
  let searchColumn = data.searchColumn || '';
  let searchQuery = data.searchQuery || '';
  let searchError = false;

  let currentPage = 1;
  const itemsPerPage = 20;
  const maxVisiblePages = 5;

  $: paginatedCompanies = data.companies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  $: totalPages = Math.ceil(data.companies.length / itemsPerPage);

  function goToPage(page) {
    currentPage = page;
  }

  async function search() {
    try {
      const url = new URL(window.location);
      url.searchParams.set('searchColumn', searchColumn);
      url.searchParams.set('searchQuery', searchQuery);
      window.location = url;
    } catch (error) {
      console.error('Error occurred during search:', error);
      searchError = true;
    }
  }
</script>

<div class="mb-4">
<div class="flex items-center">
  <select bind:value={searchColumn} class="mr-2">
    <option value="" disabled selected>Select column</option>
    {#each data.columns as column}
      <option value={column}>{column}</option>
    {/each}
  </select>
  <input type="text" bind:value={searchQuery} placeholder="Search..." class="mr-2" disabled={!searchColumn} on:keydown={(e) => {
    if (e.key === 'Enter' && searchColumn) {
      search();
    }
  }}>
  <button on:click={search} class="px-4 py-2 rounded" class:bg-blue-500={searchColumn} class:text-white={searchColumn} class:bg-gray-300={!searchColumn} class:cursor-not-allowed={!searchColumn} disabled={!searchColumn}>Search</button>
</div>
{#if data.searchQuery && !searchError}
  <p class="mt-2 text-sm text-gray-500">{data.searchQuery} 검색 결과</p>
{:else if searchError}
  <p class="mt-2 text-sm text-red-500">검색을 수행할 수 없습니다. 관리자에게 문의하세요.</p>
{/if}
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