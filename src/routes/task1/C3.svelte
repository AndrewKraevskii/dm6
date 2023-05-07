<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  let n = 12;
  let k = 7;
</script>

<h4>Arbitrary number of balls per box.</h4>
Для каждого шарика выберем коробку. В этот раз количество выборов одинаковое т.к. можно класть несколько
шариков в коробку.
<Katex math={`k^n = ${k} ^ {${n}} = ${k ** n}`} />

<br />
<Visualizer constraint="any" circles_colored={true} bind:k bind:n boxes_sorted={false} />
