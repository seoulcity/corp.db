<!-- src/components/GoToPreviousPageButton.svelte -->
<script>
    export let currentPage;
    export let onPageChange;
  </script>
  <button
  class="px-2 py-1 mx-1 rounded"
  class:bg-blue-500={currentPage !== 1}
  class:text-white={currentPage !== 1}
  on:click={() => onPageChange(currentPage - 1)}
  disabled={currentPage === 1}>
  
  
  &lt;
  </button>