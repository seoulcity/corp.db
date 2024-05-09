<!-- src/routes/dashboard/companies_ko/Search.svelte -->
<script>
    export let searchColumn;
    export let searchQuery;
    export let columns;
    export let onSearch;
    export let searchError;
    
    let inputQuery = searchQuery;
  
    async function handleSearch() {
      try {
        await onSearch(searchColumn, inputQuery);
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
        {#each columns as column}
          <option value={column}>{column}</option>
        {/each}
      </select>
      <input type="text" bind:value={inputQuery} placeholder="Search..." class="mr-2" disabled={!searchColumn} on:keydown={(e) => {
        if (e.key === 'Enter' && searchColumn) {
          handleSearch();
        }
      }}>
      <button on:click={handleSearch} class="px-4 py-2 rounded" class:bg-blue-500={searchColumn} class:text-white={searchColumn} class:bg-gray-300={!searchColumn} class:cursor-not-allowed={!searchColumn} disabled={!searchColumn}>Search</button>
    </div>
    {#if searchError}
      <p class="mt-2 text-sm text-red-500">검색을 수행할 수 없습니다. 관리자에게 문의하세요.</p>
    {/if}
  </div>