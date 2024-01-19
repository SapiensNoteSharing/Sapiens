<script>

import Calendar from "$lib/components/Calendar.svelte";

let calendarContainer, extraOptions = {

}
</script>

<div class="h-100">
	<Calendar bind:this={calendarContainer} {extraOptions}/>
</div>

<style lang="scss">
	@import '$css/variables.scss';

	.main-content {
		width: 70%;
		height: 100%;
		box-sizing: border-box;
	}

	.side-content {
		width: 30%;
		height: 100%;
		box-sizing: border-box;
	}

	.box {
		padding: 2rem;
		border: 1px solid rgba($dark, 0.25);
		background: $light;
		border-radius: 2rem;
		cursor: pointer;
		transition: .25s ease-in-out;
	}
</style>