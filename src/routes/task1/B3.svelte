<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  let n = 12;
  let k = 7;

  function factorial(n: number) {
    if (n == 0) return 1;

    if (n < 0) return -1;
    let res = 1;
    for (let i = 2; i < n + 1; ++i) res *= i;
    return res;
  }

  function nCr(n: number, r: number): number {
    if (r > n) return -1;

    if (n == r) return 1;

    if (r == 0) return 1;

    return nCr(n - 1, r - 1) + nCr(n - 1, r);
  }

  function stirlingNumber(r: number, n: number): number {
    if (r < 0 || n < 0) return 0;

    if (n > r) return -1;

    if (n == 0) return 0;

    if (r == n) return 1;

    if (n == 1) return factorial(r - 1);

    if (r - n == 1) return nCr(r, 2);
    else return stirlingNumber(r - 1, n - 1) + (r - 1) * stirlingNumber(r - 1, n);
  }

  function sum(k: number, n: number) {
    let sum = 0;
    for (let index = 0; index < n; index++) {
      const x = stirlingNumber(k, index);
      sum += x === -1 ? 0 : x;
    }
    return sum;
  }

  $: a = sum(n, k);
</script>

<h4>Arbitrary number of balls per box.</h4>
Похоже на предыдущий номер но тут могут быть пустые коробки. Давайте учтём варианты с пустыми коробками
посчитав число Стирлинга для меньшего количества коробок.
<Katex
  math={'\\sum_{x=0}^{n}\\begin{Bmatrix}k \\\\x \\end{Bmatrix}=\\sum_{x=0}^{' +
    n +
    '}\\begin{Bmatrix}' +
    k +
    ' \\\\x \\end{Bmatrix} = ' +
    a}
/>
<br />
<Visualizer constraint="any" circles_colored={true} bind:k bind:n boxes_sorted={true} />
