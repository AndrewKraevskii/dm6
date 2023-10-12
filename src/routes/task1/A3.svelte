<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  import * as C from 'js-combinatorics';
  let n = 12;
  let k = 7;

  let a: BigInt | number = 0;
  $: {
    try {
      a = C.combination(k + n - 1, k);
    } catch {
      a = 0;
    }
  }
</script>

<h4>Arbitrary number of balls per box.</h4>
Это просто stars and bars точек <Katex math="n" /> палочек <Katex math="k-1" /> получается
<Katex math={`C^{k + n - 1}_{k}`} />. Пример для <Katex math={`n = ${n}`} /> и <Katex
  math={`k = ${k}`}
/>: <Katex math={`C^{${k + n - 1}}_{${k}} = ${a}`} />
<br />
<Visualizer constraint="any" bind:k bind:n />
