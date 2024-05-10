<!-- src/routes/dashboard/companies_ko/+page.svelte -->
<script>
  import Pagination from './Pagination.svelte';
  import Search from './Search.svelte';

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

  async function handleSearch(column, query) {
    const url = new URL(window.location);
    url.searchParams.set('searchColumn', column);
    url.searchParams.set('searchQuery', query);
    window.location = url;
  }

  let expandedCompany = null;

  function toggleDetails(company) {
    expandedCompany = expandedCompany === company ? null : company;
  }
</script>

<h2 class="text-2xl font-bold mb-4">Companies (Korea)</h2>

<Search {searchColumn} {searchQuery} columns={data.columns} onSearch={handleSearch} {searchError} />

{#if searchQuery}
  <p class="mt-2 text-sm text-gray-500">"{searchQuery}" 검색 결과:</p>
{/if}

{#if data.error}
<p class="text-red-500">{data.error}</p>
{:else if Array.isArray(data.companies) && data.companies.length > 0}
<table class="w-full">
  <thead>
    <tr class="bg-gray-200">
      <th class="py-2 px-4"></th>
      <th class="py-2 px-4">ID</th>
      <th class="py-2 px-4">Created At</th>
      <th class="py-2 px-4">Corp Code</th>
      <th class="py-2 px-4">Corp Name</th>
      <th class="py-2 px-4">Stock Code</th>
      <th class="py-2 px-4">DB Modified At</th>
      <th class="py-2 px-4">Modify Date</th>
    </tr>
  </thead>
  <tbody>
    {#each paginatedCompanies as company, index}
    <tr class:bg-gray-100={index % 2 === 0} on:click={() => toggleDetails(company)} class="cursor-pointer">
      <td class="py-2 px-4">{expandedCompany === company ? '▼' : '▶'}</td>
      <td class="py-2 px-4">{company.id}</td>
      <td class="py-2 px-4">{company.created_at}</td>
      <td class="py-2 px-4">{company.corp_code}</td>
      <td class="py-2 px-4">{company.corp_name}</td>
      <td class="py-2 px-4">{company.stock_code}</td>
      <td class="py-2 px-4">{company.db_modified_at}</td>
      <td class="py-2 px-4">{company.modify_date}</td>
    </tr>
    {#if expandedCompany === company}
    <tr>
      <td colspan="8" class="py-4 px-4">
        <h2 class="text-xl font-bold mb-2">Contents</h2>
        <!-- 여기에 세부 내용을 추가하세요 -->
      </td>
    </tr>
    {/if}
    {/each}
  </tbody>
</table>
<Pagination {currentPage} {totalPages} {maxVisiblePages} onPageChange={goToPage} />
{:else}
<p>No companies found. Please try a different search.</p>
{/if}