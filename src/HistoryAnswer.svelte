<script>
import { getReadableDate } from './date.helper.js';

export let date
export let timestamp
export let greatful_reasons = ['','','']
export let contribution_ideas = ''
export let reframe_actions = ''
export let todo_items = ['','','','','']
export let todo_confidence = 0

const dateString = getReadableDate(date);
</script>

<style>
	* { line-height: 1.35em; }
	label { font-weight: 600; cursor: pointer; }
	dl { display: none; margin-top: 8px }
	small { float: right; font-weight: 400; }
	input:checked + dl { display: block; }
	input:not(.todo_item) { visibility: none; position: absolute; top: -999px; left: -999px; }
	
	dt {
		font-weight: 600;
		margin-top: 32px;
		margin-bottom: 8px;
	}
	dd {
		margin-left: 16px;
	}
	ol { margin: 0; padding-left: 16px; }
    hr { margin: 16px 0; }
</style>

<label for="{timestamp}">
    {dateString}
	<small>(expand)</small>
</label>
<input type="checkbox" id="{timestamp}">
<dl>
	<dt>
		1. Reasons to be greatful today?
	</dt>
	<dd>
		<ol>
			{#each greatful_reasons as greatful_reason}
				<li>{greatful_reason}</li>
			{/each}
		</ol>
	</dd>

	<dt>
		2. Which ideas could you have today to contribute for a better world in the present? How can you apply that?
	</dt>
	<dd>
		{contribution_ideas}
	</dd>

	<dt>
		3. If you could back in time and change any event today, what would you do differently?
	</dt>
	<dd>
		{reframe_actions}
	</dd>

	<dt>
		4. What are the most important things you need to do tomorrow?
	</dt>
	<dd>
		<ol>
			{#each todo_items as todo_item}
				<li>{todo_item}</li>
			{/each}
		</ol>
	</dd>

	<dt>
		5. On a scale from 0 to 10, how confident are you that those actions will contribute for a productive day?
	</dt>
	<dd>
		{todo_confidence}
	</dd>
</dl>
<hr>