<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  let n = 8;
  let k = 6;

  function p(k: number, n: number): number {
    if (n == 0 && k == 0) return 1;
    if (n <= 0 || k <= 0) return 0;
    return p(k, n - k) + p(k - 1, n - 1);
  }
  function sum(k: number, n: number) {
    let sum = 0;
    for (let index = 1; index <= k; index++) {
      const x = p(index, n);
      sum += x === -1 ? 0 : x;
    }
    return sum;
  }
  $: res = sum(k, n);
</script>

<h4>Arbitrary number of balls per box.</h4>
Тоже что в предыдущем примере, но возможно разбить на меньшее количество частей. Так что просто суммируем
<Katex math="\sum_{'{x=0}'}^k p_x(n) = \sum_{'{x=0}'}^{k} p_x({n}) = {res}" />.

<br />
<Visualizer constraint="any" circles_colored={false} bind:k bind:n boxes_sorted={true} />
