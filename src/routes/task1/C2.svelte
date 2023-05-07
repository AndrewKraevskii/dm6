<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  let n = 9;
  let k = 3;

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
    if (n > r) return -1;

    if (n == 0) return 0;

    if (r == n) return 1;

    if (n == 1) return factorial(r - 1);

    if (r - n == 1) return nCr(r, 2);
    else return stirlingNumber(r - 1, n - 1) + (r - 1) * stirlingNumber(r - 1, n);
  }

  $: a = stirlingNumber(n, k);
  $: b = a === -1 ? 0 : a;
  $: c = factorial(n) * b;
</script>

<h4>≥ 1 ball per box— surjective mapping.</h4>
Это как 2b, но мы можем также посчитать перестановки для всех шариков так что домножим на <Katex
  math="n!"
/> прошлую формулу.

<Katex
  math={`n!\\begin{Bmatrix}
k \\\\
n 
\\end{Bmatrix} = ${n}!\\begin{Bmatrix}
${k} \\\\
${n} 
\\end{Bmatrix} = ${c}`}
/>
<br />
<Visualizer constraint="surjective" circles_colored={true} bind:k bind:n boxes_sorted={false} />
