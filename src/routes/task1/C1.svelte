<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  import * as C from 'js-combinatorics';
  let n = 7;
  let k = 10;

  $: a = C.factorial(Math.max(k, 0)) / C.factorial(Math.max(k - n, 0));
</script>

<h4>≤ 1 ball per box—injective mapping.</h4>
Для каждого шарика выбираем в какую коробку положить и для каждого следующего шарика остаётся на 1 коробку
меньше <Katex math="k*(k-1)*(k-2)*...*(k - n + 1)=" />
<Katex math="\frac{'{k!}'}{'{(k-n)!}'} = \frac{`{${k}!}`}{`{${k - n}!}=${a}`}" />

<br />
<Visualizer constraint="injective" circles_colored={true} bind:k bind:n boxes_sorted={false} />
