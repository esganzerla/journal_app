<script>
	import Questionaire from './Questionaire.svelte'
	import HistoryAnswer from './HistoryAnswer.svelte'
	import { history } from './store.js'
	
	let selectedPage = 'questionaire'
	
	function changePage(page) {
		return () => selectedPage = page;
	}
</script>

<style>
	.app {
		max-width: 600px;
		margin: 0 auto;
        padding: 16px;
	}
    .menu {
        display: flex;
        align-items: center;
        justify-content: space-around;
        list-style: none;
        box-sizing: border-box;
        cursor: pointer;
        width: 100%;
        height: 64px;
    }
</style>

<div class="app">
	{#if $history.length}
		<ul class="menu">
            {#if selectedPage === 'questionaire'}
                <li on:click={changePage('questionaire')}><b>Questionaire</b></li>
            {:else}
                <li on:click={changePage('questionaire')}>Questionaire</li>
            {/if}
            {#if selectedPage === 'history'}
                <li on:click={changePage('history')}><b>History</b></li>
            {:else}
                <li on:click={changePage('history')}>History</li>
            {/if}
		</ul>
	{/if}

	{#if selectedPage === 'questionaire'}
		<Questionaire on:newAnswerSaved={changePage('history')} />
	
	{:else}
		{#each $history as answer}
			<HistoryAnswer {...answer} />
		{/each}
	{/if}
</div>