<div class="fixed text-white font-bold" style={position} >
    <a href="/yes"><button class="w-32 lg:h-12 h-16 bg-green-500 button-shadow hover:bg-green-700 rounded-full mx-4">Ja</button></a>
    <button class="w-32 lg:h-12 h-16 bg-red-500 button-shadow rounded-full mx-4" on:click={noClickHandling} on:mouseenter={noHoverHandling}>Nein</button>
</div>

<script lang="ts">
    export let noClickHandling: () => void
    export let noHoverHandling: () => void
    export let position:string
</script>

<style>
.button-shadow {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}
</style>