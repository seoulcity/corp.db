<!-- src/routes/dashboard/companies_ko/+page.svelte -->
<script>
    export let data;
  
    let currentPage = 1;
    const itemsPerPage = 20;
    const maxVisiblePages = 5;
  
    $: paginatedCompanies = data.companies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    $: totalPages = Math.ceil(data.companies.length / itemsPerPage);
    $: visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages);
  
    function getVisiblePages(currentPage, totalPages, maxVisiblePages) {
      let startPage, endPage;
      if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
      } else {
        let maxPagesBeforeCurrentPage = 2;
        let maxPagesAfterCurrentPage = 2;
        if (currentPage <= maxPagesBeforeCurrentPage) {
          startPage = 1;
          endPage = maxVisiblePages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
          startPage = totalPages - maxVisiblePages + 1;
          endPage = totalPages;
        } else {
          startPage = currentPage - maxPagesBeforeCurrentPage;
          endPage = currentPage + maxPagesAfterCurrentPage;
        }
      }
      return Array(endPage - startPage + 1).fill().map((_, idx) => startPage + idx);
    }
  
    function goToPage(page) {
      currentPage = page;
    }
  
    function goToPreviousGroup() {
      currentPage = Math.max(1, currentPage - 5);
    }
  
    function goToNextGroup() {
      currentPage = Math.min(totalPages, currentPage + 5);
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
  
    <!-- Pagination -->
    <div class="mt-4">
      <button
        class="px-2 py-1 mx-1 rounded"
        class:bg-blue-500={currentPage !== 1}
        class:text-white={currentPage !== 1}
        on:click={goToPreviousGroup}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
  
      <button
        class="px-2 py-1 mx-1 rounded"
        class:bg-blue-500={currentPage !== 1}
        class:text-white={currentPage !== 1}
        on:click={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
  
      {#if visiblePages[0] !== 1}
        <button class="px-2 py-1 mx-1 rounded" on:click={() => goToPage(1)}>1</button>
        {#if visiblePages[0] !== 2}
          <span class="px-2 py-1 mx-1">...</span>
        {/if}
      {/if}
  
      {#each visiblePages as page}
        {#if page === currentPage}
          <span class="px-2 py-1 mx-1 font-bold">{page}</span>
        {:else}
          <button
            class="px-2 py-1 mx-1 rounded"
            on:click={() => goToPage(page)}
          >
            {page}
          </button>
        {/if}
      {/each}
  
      {#if visiblePages[visiblePages.length - 1] !== totalPages}
        {#if visiblePages[visiblePages.length - 1] !== totalPages - 1}
          <span class="px-2 py-1 mx-1">...</span>
        {/if}
        <button class="px-2 py-1 mx-1 rounded" on:click={() => goToPage(totalPages)}>{totalPages}</button>
      {/if}
  
      <button
        class="px-2 py-1 mx-1 rounded"
        class:bg-blue-500={currentPage !== totalPages}
        class:text-white={currentPage !== totalPages}
        on:click={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
  
      <button
        class="px-2 py-1 mx-1 rounded"
        class:bg-blue-500={currentPage !== totalPages}
        class:text-white={currentPage !== totalPages}
        on:click={goToNextGroup}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  {:else}
    <p>No companies found.</p>
  {/if}