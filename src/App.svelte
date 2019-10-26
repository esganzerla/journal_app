<script>
	import Questionnaire from './Questionnaire.svelte'
	import HistoryAnswer from './HistoryAnswer.svelte'
	import { history } from './store.js'
	
	let selectedPage = 'questionnaire'
	
	function changePage(page) {
		return () => selectedPage = page;
	}
</script>

<style>
	.app {
		max-width: 600px;
		margin: 0 auto;
        padding: 0 16px 64px 16px;
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
    .answers {
        margin-top: 48px;
    }
        :global(hr) {
            opacity: 0.15;
            border-color: #000;
            border-width: 1px 0 0 0;
        }
    @media (prefers-color-scheme: dark) {
        :global(body, input, textarea) {
            background-color: #000;
            color: #DDD;
        }
        :global(button) {
            background-color: #333;
            color: #DDD;
        }
        :global(hr) {
            border-color: #FFF;
        }
    }
</style>

<div class="app">
		<ul class="menu">
            {#if selectedPage === 'questionnaire'}
                <li on:click={changePage('questionnaire')}><b>Questionnaire</b></li>
            {:else}
                <li on:click={changePage('questionnaire')}>Questionnaire</li>
            {/if}
            {#if selectedPage === 'history'}
                <li on:click={changePage('history')}><b>History</b></li>
            {:else}
                <li on:click={changePage('history')}>History</li>
            {/if}
		</ul>

	{#if selectedPage === 'questionnaire'}
		<Questionnaire on:newAnswerSaved={changePage('history')} />
	
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