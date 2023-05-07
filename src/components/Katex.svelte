<script lang="ts">
	import katex from "katex";
	import "katex/dist/katex.min.css";
	import type { KatexOptions } from "katex";
	export let math: string;
	export let displayMode = false;
	
	const options: KatexOptions = {
		displayMode: displayMode,
		throwOnError: false,
	}
	
	$: katexString = katex.renderToString(math, options);
</script>


{@html katexString}