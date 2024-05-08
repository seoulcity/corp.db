<!-- src/components/GoToNextFivePagesButton.svelte -->
<script>
  export let currentPage;
  export let totalPages;
  export let onPageChange;

  function goToNextGroup() {
    onPageChange(Math.min(totalPages, currentPage + 5));
  }
</script>
<button
class="px-2 py-1 mx-1 rounded"
class:bg-blue-500={currentPage !== totalPages}
class:text-white={currentPage !== totalPages}
on:click={goToNextGroup}
disabled={currentPage === totalPages}>
&gt;&gt;
</button>