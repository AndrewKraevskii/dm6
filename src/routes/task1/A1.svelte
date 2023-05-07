<script>
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  import * as C from 'js-combinatorics';
  let n = 4;
  let k = 8;
  $: a = C.combination(Math.max(k, 0), Math.max(n, 0));
</script>

<h4>≤ 1 ball per box—injective mapping.</h4>
Выберем <Katex math="k" /> коробок из <Katex math="n" /> коробок чтобы положить туда по <Katex
  math="1"
/> шарику. Это делается за <Katex math="C^n_k" /> раз. Пример для <Katex math={`n = ${n}`} /> и <Katex
  math={`k = ${k}`}
/>: <Katex math={`C^${k}_${n} = ${a}`} />
<br />
<Visualizer constraint="injective" bind:k bind:n />
