<!-- src/routes/+page.svelte -->
<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
  
	let email = '';
	let password = '';
	let errorMessage = '';
  
	async function signInWithEmail() {
	  const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	  });
  
	  if (error) {
		errorMessage = error.message;
	  } else {
		document.cookie = `session=true; path=/; max-age=${60 * 60 * 24 * 7}`; // 쿠키 설정 (7일 동안 유지)
		goto('/dashboard');
	  }
	}
  </script>
  <h1 class="text-2xl text-center">corp.reviews DB</h1>
  
  {#if errorMessage}
	<p>{errorMessage}</p>
  {/if}
  
  <form on:submit|preventDefault={signInWithEmail}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Sign In</button>
  </form>