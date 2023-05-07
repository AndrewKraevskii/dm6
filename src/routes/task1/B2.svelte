<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  let n = 12;
  let k = 6;

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

  $: a = stirlingNumber(n, k);
</script>

<h4>≥ 1 ball per box— surjective mapping.</h4>
Это количество способов разложить элементы на разные не пустые множества. Звучит как определение числа
Стирлинга
<Katex
  math={`\\begin{Bmatrix}
k \\\\
n 
\\end{Bmatrix} = \\begin{Bmatrix}
${k} \\\\
${n} 
\\end{Bmatrix} = ${a === -1 ? 0 : a}`}
/>
<br />
<Visualizer constraint="surjective" circles_colored={true} bind:k bind:n boxes_sorted={true} />
