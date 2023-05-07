<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  import * as C from 'js-combinatorics';
  let n = 7;
  let k = 10;
</script>

<h4>≤ 1 ball per box—injective mapping.</h4>
Если мячики влезут то только одним способом.
<Katex math="[n \leq k]=" />
<Katex math="[{n} \leq {k}] = {n <= k ? 1 : 0}" />
<br />
<Visualizer constraint="injective" circles_colored={false} bind:k bind:n boxes_sorted={true} />
