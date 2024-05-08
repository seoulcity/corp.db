<!-- src/components/Pagination.svelte -->
<script>
    export let currentPage;
    export let totalPages;
    export let maxVisiblePages;
    export let onPageChange;
    import GoToPreviousFivePagesButton from './GoToPreviousFivePagesButton.svelte';
    import GoToPreviousPageButton from './GoToPreviousPageButton.svelte';
    import GoToNextPageButton from './GoToNextPageButton.svelte';
    import GoToNextFivePagesButton from './GoToNextFivePagesButton.svelte';
  
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
  
  </script>
  <div class="mt-4">
    <GoToPreviousFivePagesButton {currentPage} {totalPages} {onPageChange} />
    <GoToPreviousPageButton {currentPage} {onPageChange} />
  {#if visiblePages[0] !== 1}
  <button class="px-2 py-1 mx-1 rounded" on:click={() => onPageChange(1)}>1</button>
  {#if visiblePages[0] !== 2}
  <span class="px-2 py-1 mx-1">...</span>
  {/if}
  {/if}
  {#each visiblePages as page}
  {#if page === currentPage}
  <span class="px-2 py-1 mx-1 font-bold">{page}</span>
  {:else}
  <button class="px-2 py-1 mx-1 rounded" on:click={() => onPageChange(page)}>{page}</button>
  {/if}
  {/each}
  {#if visiblePages[visiblePages.length - 1] !== totalPages}
  {#if visiblePages[visiblePages.length - 1] !== totalPages - 1}
  <span class="px-2 py-1 mx-1">...</span>
  {/if}
  <button class="px-2 py-1 mx-1 rounded" on:click={() => onPageChange(totalPages)}>{totalPages}</button>
  {/if}
  <GoToNextPageButton {currentPage} {totalPages} {onPageChange} />
  <GoToNextFivePagesButton {currentPage} {totalPages} {onPageChange} />
  </div>
  