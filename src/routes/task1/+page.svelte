<script lang="ts">
    import Katex from "$components/Katex.svelte";  
	import { onMount } from "svelte";

    let x = 0;

    onMount(()=>{
        let timer = setInterval(() => {
            x++;
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    });
</script>

<h1>Task 1</h1>

<Katex math={`e^{\\pi }=${x}`} />
