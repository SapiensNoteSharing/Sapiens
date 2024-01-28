<script>
    import { onMount } from 'svelte';
    import { Calendar } from '@fullcalendar/core';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';	
    import listPlugin from '@fullcalendar/list'
    import interactionPlugin from '@fullcalendar/interaction';
    
    // General Props
    /** @type {string} */
    let classes = null;
    export { classes as class };
    /** @type {string} */
    export let style = null;

    /** @type {import('@fullcalendar/core').CalendarOptions}  */
    export let extraOptions = {};

    let events = []; 

    /** @type {import('@fullcalendar/core').CalendarOptions} */
$:  options = {
        initialView: 'timeGridWeek',
        droppable: true,
        editable: true,
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        weekends: true,
        eventOverlap: false,
        dayHeaderClassNames: 'calendar-header',
        height: '100%',
        eventMinHeight: 5,
        eventResizableFromStart: true,
        expandRows: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        ...extraOptions,
        events: events
    }

    /** @type {import('@fullcalendar/core').Calendar}  */
    let calendar;
    let calendarEl;

    onMount(async () => {
        initCalendar();
        reload();
        return () => {
            calendar && calendar.destroy();
        };
    });

$: if (calendar && options) updateCalendarOptions();
    
    export async function reload() {
        const resp = await fetch(`/api/calendar`);
        events = (resp.ok && await resp.json()).events || [];
        events = events.map(event => ({
            ...event,
            daysOfWeek: [event.dayOfWeek],
            allDay: false,
            backgroundColor: event?.content?types[event.content.type].eventColor:undefined,
            borderColor: event?.content?types[event.content.type].borderColor:undefined,
        }))
    }

    export function changeView(type, range) {
        calendar.changeView(type, range)
    }
    
    export function getView() {
        return calendar.view;
    }

    export function prevDay() {
        calendar.prev();
    }

    export function nextDay() {
        calendar.next();
    }

    export function today() {
        if (calendar.view.type == 'timeGridWeek') 
            calendar.changeView('timeGridDay')
        calendar.today();
    }

    function initCalendar() {
        calendar = new Calendar(calendarEl, options);
        calendar.render();
    }
    
    function updateCalendarOptions() {
        calendar.pauseRendering();
        calendar.resetOptions(options);
        calendar.resumeRendering();
    }
</script>
    
<div bind:this={calendarEl} class={classes} {style}></div>

<style>
    :global(.calendar-header) {
        text-decoration: none;
        color: white;
    }
</style>