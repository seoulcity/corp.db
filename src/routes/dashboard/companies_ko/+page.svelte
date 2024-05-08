<!-- src/routes/dashboard/companies_ko/+page.svelte -->
<script>
    import Pagination from './Pagination.svelte';
  
    export let data;
  
    let currentPage = 1;
    const itemsPerPage = 20;
    const maxVisiblePages = 5;
  
    $: paginatedCompanies = data.companies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    $: totalPages = Math.ceil(data.companies.length / itemsPerPage);
  
    function goToPage(page) {
      currentPage = page;
    }
  </script>
  <h2 class="text-2xl font-bold mb-4">Companies (Korea)</h2>
  {#if data.error}
    <p class="text-red-500">{data.error}</p>
  {:else if Array.isArray(data.companies)}
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
    <p>No companies found.</p>
  {/if}