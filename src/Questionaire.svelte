<script>
	import { history } from './store.js'
	import { createEventDispatcher } from 'svelte';
    import { isLateNight, isLastNightAnswer, isTodaysAnswer, getRefDateTimestamp} from './date.helper.js';

    const LATE_NIGHT_THRESHOLD = 4;
	const lastAnswer = $history && $history[$history.length - 1];
	
	let greatful_reasons = ['','','']
	let contribution_ideas = ''
	let reframe_actions = ''
	let todo_items = ['','','','','']
	let todo_confidence = ''

    let saveDate;
    let isEditMode = false;

	if (
        lastAnswer
        && (
            isLateNight()
            && isLastNightAnswer(lastAnswer.timestamp)
            || isTodaysAnswer(lastAnswer.timestamp)
        )
    ) {
        isEditMode = true;
	}
    if (isEditMode) {
        greatful_reasons = lastAnswer.greatful_reasons
        contribution_ideas = lastAnswer.contribution_ideas
        reframe_actions = lastAnswer.reframe_actions
        todo_items = lastAnswer.todo_items
        todo_confidence = lastAnswer.todo_confidence
    }
	
	function saveAnswers() {
		if (isEditMode) {
			$history.pop()
		}

		history.update(answers => { return [
            ...answers,
            {
                date: getRefDateTimestamp(),
                timestamp: Date.now(),
                greatful_reasons,
                contribution_ideas,
                reframe_actions,
                todo_items,
                todo_confidence
            }
        ] });

        const dispatch = createEventDispatcher();
		dispatch('newAnswerSaved');

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.controller.postMessage('notify');
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