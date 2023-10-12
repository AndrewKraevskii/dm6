<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  let n = 5;
  let k = 7;
</script>

<h4>≤ 1 ball per box—injective mapping.</h4>
В каждую коробку можно положить лишь <Katex math="1" /> шарик и т.к. коробки не пронумерованы неважно
куда мы кладём каждый взятый шарик. По итогу если шарики вообще можно положить в коробку (<Katex
  math="n \leq k"
/>) то есть только <Katex math="1" /> возможный способ.
<Katex math="[n \leq k]" /> ← блин прикольная функция. <Katex
  math="[{n} \leq {k}] = {n <= k ? 1 : 0}"
/>
<br />
<Visualizer constraint="injective" circles_colored={true} bind:k bind:n boxes_sorted={true} />
<small>к сожалению по цветам не сортирует т.к. они рандомные</small>
