<HeaderText {headerText}/>
<div class="flex flex-row justify-center max-height-gif max-width-gif mt-8">
    {#if g.url==''}
        <LoadingSpinner/>
    {:else}
        <img class="h-full" src={g.url} alt={g.description}/>
    {/if}
</div>

<script lang="ts">
    import { onMount } from 'svelte'
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import HeaderText from '$lib/components/HeaderText.svelte';
    import Datepicker from '$lib/components/Datepicker.svelte';
	import { grab_data, type Gif } from '$lib/loadGifs';
    import { gif_yes_list } from '$lib/loadGifs';

    onMount(async () => {
        if($gif_yes_list.length == 0) {
            console.log("Test")
            grab_data()
        }
    });

    let headerText = "Wann?"
    let g: Gif = {
		url: ''
	}

    $: {
        if($gif_yes_list.length > 0) {
            let g_temp = g
            while(g == g_temp) {
                g_temp = $gif_yes_list[Math.floor(Math.random()*$gif_yes_list.length)];
            }
            g = g_temp
        }
    }
</script>