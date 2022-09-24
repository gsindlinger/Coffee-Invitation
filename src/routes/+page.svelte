<div class="w-screen h-screen gradient flex justify-center">
    <div class="flex flex-col items-center justify-begin w-2/3 lg:w-5/12 ">
        <div class="flex flex-row items-center height-20">
            <div class="flex py-8 px-16 bg-slate-600 rounded-full">
                <h1 class="text-white text-3xl text-center">{headerText}</h1>
            </div>
        </div>
        <div class="flex flex-row justify-center max-height-gif max-width-gif mt-8">
            <img class="h-full" src={g.url} alt={g.description}/>
        </div>
        
    </div>
    {#if !isAccepted}
        <YesNoButtons {position} {noClickHandling} {noHoverHandling}/>
    {/if}
</div>

<script lang="ts">
	import { grab_data, gif_list } from '$lib/loadGifs';
    import {buttonPositions} from '$lib/positions';
    import { onMount } from 'svelte'
    import type {Gif} from '$lib/loadGifs'
    import YesNoButtons from '$lib/components/YesNoButtons.svelte'

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
    .gradient {
        background: linear-gradient(45deg,#F17C58,#E94584,#24AADB,#27DBB1,#FFDC18,#FF3706);
    }

    .button-shadow {
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    }

    .max-height-gif {
        max-height: 20rem;
    }

    .max-width-gif {
        max-width: 30rem;
    }
    .height-20 {
        height: 25%;
    }

    .height-40 {
        height: 40%;
    }

</style>

