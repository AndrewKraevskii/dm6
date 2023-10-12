<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  import * as C from 'js-combinatorics';
  let n = 7;
  let k = 4;

  let a: BigInt | number = 0;
  $: {
    try {
      a = C.combination(n - 1, n - k);
    } catch {
      a = 0;
    }
  }
</script>

<h4>≥ 1 ball per box—surjective mapping.</h4>
Пихаем по <Katex math="1" /> шарику в коробку и остаётся как то распределить остальные <Katex
  math="n-k"
/> шариков. Делаем это через stars and bars точек <Katex math="n-k" /> палочек <Katex math="k-1" /> получается
<Katex math={`C^{n-1}_{n-k}`} />. Пример для <Katex math={`n = ${n}`} /> и <Katex
  math={`k = ${k}`}
/>: <Katex math={`C^{${n - 1}}_{${n - k}} = ${a}`} />
<br />
<Visualizer constraint="surjective" bind:k bind:n />
