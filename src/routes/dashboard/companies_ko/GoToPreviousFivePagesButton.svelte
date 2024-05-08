<!-- src/components/GoToPreviousFivePagesButton.svelte -->
<script>
    export let currentPage;
    export let onPageChange;
  
    function goToPreviousGroup() {
      onPageChange(Math.max(1, currentPage - 5));
    }
  </script>
  <button
  class="px-2 py-1 mx-1 rounded"
  class:bg-blue-500={currentPage !== 1}
  class:text-white={currentPage !== 1}
  on:click={goToPreviousGroup}
  disabled={currentPage === 1}>
  &lt;&lt;
  </button>