<script>
	import Calendar from "$lib/components/Calendar.svelte";

	let calendarContainer, extraOptions = {}
</script>

<div class="h-100">
	<Calendar bind:this={calendarContainer} {extraOptions}/>
</div>

<style lang="scss">
	@import '$css/variables.scss';
</style>