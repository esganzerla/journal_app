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
        padding: 0 16px 32px 16px;
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
        padding: 0;
        border-bottom: 1px solid #cccccc;
    }
    .menu > li {
        padding: 16px 0 32px 0;
        text-align: center;
        width: 50%;
    }
</style>

<div class="app">
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

	{#if selectedPage === 'questionaire'}
		<Questionaire on:newAnswerSaved={changePage('history')} />
	
	{:else}
        {#if !$history.length}
            <center>
                No history saved yet.
            </center>
        {/if}
		{#each $history as answer}
			<HistoryAnswer {...answer} />
		{/each}
	{/if}
</div>