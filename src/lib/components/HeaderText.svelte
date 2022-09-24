<div class="flex flex-row items-center height-20">
    <div class="flex py-8 px-16 bg-slate-600 rounded-full">
        <h1 class="text-white text-3xl text-center">{headerText}</h1>
    </div>
</div>

<script lang="ts">
    export let headerText:string
</script>

<style>
    .height-20 {
        height: 25%;
    }

    .height-40 {
        height: 40%;
    }
</style>