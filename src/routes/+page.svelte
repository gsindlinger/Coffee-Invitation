<HeaderText {headerText}/>
<div class="flex flex-row justify-center max-height-gif max-width-gif mt-8">
    {#if g.url==''}
        <LoadingSpinner/>
    {:else}
        <img class="h-full" src={g.url} alt={g.description}/>
    {/if}
</div>

{#if !isAccepted}
<YesNoButtons {position} {noClickHandling} {noHoverHandling}/>
{/if}

<script lang="ts">
    import { onMount } from 'svelte'

	import { grab_data, gif_list } from '$lib/loadGifs';
    import {buttonPositions} from '$lib/positions';
    import type {Gif} from '$lib/loadGifs'

    import YesNoButtons from '$lib/components/YesNoButtons.svelte'
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    import HeaderText from '$lib/components/HeaderText.svelte';


    onMount(async () => grab_data());
    
    const isAccepted:boolean = false;
    let g: Gif = {
		url: ''
	}
    let position = "bottom: 15%"
    let headerText = "Willst du mit mir Kaffee trinken?"
    let headerCounter = 0

    $: {
        if($gif_list.length > 0) {
            let g_temp = g
            while(g == g_temp) {
                g_temp = $gif_list[Math.floor(Math.random()*$gif_list.length)];
            }
            g = g_temp
        }
    }

    function noClickHandling() {
        switch(headerCounter) {
            case 0:
                headerText = "Überlegs dir doch nochmal..."
                break
            case 3:
                headerText = "Bittööö..."
                break
        }
        changeGif()
        headerCounter++
    }

    function noHoverHandling() {
        setTimeout(() => {  
            changeGif()
            switchButtonPosition()
         }, 100);
    }

    function switchButtonPosition() {
        const tempPosition = position
        while(tempPosition == position) {
            position = buttonPositions[Math.floor(Math.random()*buttonPositions.length)];
        }
    }

    function changeGif() {
        if($gif_list.length > 0) {
            let g_temp = g
            while(g == g_temp) {
                g_temp = $gif_list[Math.floor(Math.random()*$gif_list.length)];
            }
            g = g_temp
        }
    }

</script>

<style>

    
</style>

