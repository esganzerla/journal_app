<script>
	import { history } from './store.js'
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	
	function saveAnswers() {
		if (questionaireMode === 'edit') {
			$history.pop()
		}

		history.set([
			...$history,
			{
				timestamp: Date.now(),
				greatful_reasons,
				contribution_ideas,
				reframe_actions,
				todo_items,
				todo_confidence
			}
		])
		dispatch('newAnswerSaved')
	}
	
	let questionaireMode = 'create'
	let greatful_reasons = ['','','']
	let contribution_ideas = ''
	let reframe_actions = ''
	let todo_items = ['','','','','']
	let todo_confidence = ''

	const lastHistory = $history && $history[$history.length - 1];
	if (lastHistory) {
		const today = new Date();
		const earlyMorning = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 4);
		const lateNight = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1, 3, 59);

		if (
				lastHistory.timestamp > +earlyMorning
				&& lastHistory.timestamp < +lateNight
		) {
			questionaireMode = 'edit'
			greatful_reasons = lastHistory.greatful_reasons
			contribution_ideas = lastHistory.contribution_ideas
			reframe_actions = lastHistory.reframe_actions
			todo_items = lastHistory.todo_items
			todo_confidence = lastHistory.todo_confidence
		}
	}
</script>

<style>
	label {
		font-weight: 500;
		display: inline-block;
		margin-bottom: 8px;
		margin-top: 32px;
		line-height: 1.35em;
	}
	textarea, input {
		width: 100%;
	}
	textarea {
		height: 7em;
	}
	ol {
		margin: 0;
		padding-left: 32px;
	}
	li {
		padding-left: 12px;
	}
	button {
		width: 100%;
		padding: 16px;
		margin-top: 32px;
	}
</style>

<form on:submit|preventDefault={saveAnswers}>
	<label for="greatful_reasons">
		1. Reasons to be greatful today?
	</label>
	<ol>
		<li><input type="text" id="greatful_reasons" bind:value={greatful_reasons[0]}></li>
		<li><input type="text" bind:value={greatful_reasons[1]}></li>
		<li><input type="text" bind:value={greatful_reasons[2]}></li>
	</ol>

	<label for="contribution_ideas">
		2. Which ideas could you have today to contribute for a better world in the present? How can you apply that?
	</label>
	<textarea id="contribution_ideas" bind:value={contribution_ideas}></textarea>

	<label for="reframe_actions">
		3. If you could back in time and change any event today, what would you do differently?
	</label>
	<textarea id="reframe_actions" bind:value={reframe_actions}></textarea>

	<label for="todo_items">
		4. What are the most important things you need to do tomorrow?
	</label>
	<ol>
		<li><input type="text" id="todo_items" bind:value={todo_items[0]}></li>
		<li><input type="text" bind:value={todo_items[1]}></li>
		<li><input type="text" bind:value={todo_items[2]}></li>
		<li><input type="text" bind:value={todo_items[3]}></li>
		<li><input type="text" bind:value={todo_items[4]}></li>
	</ol>

	<label for="todo_confidence">
		5. On a scale from 0 to 10, how confident are you that those actions will contribute for a productive day?
	</label>
	<input type=number id="todo_confidence" bind:value={todo_confidence} min=0 max=10>

	<button>
		Save Answers
	</button>
</form>