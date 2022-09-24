<script>
	import '../app.postcss';
</script>


<div class="w-screen h-screen gradient flex justify-center overflow-hidden">
	<div class="flex flex-col items-center justify-begin w-2/3 lg:w-5/12 ">
		<slot />
	</div>
</div>

<style>
	.gradient {
		background: linear-gradient(45deg,#F17C58,#E94584,#24AADB,#27DBB1,#FFDC18,#FF3706);
	}
</style>
