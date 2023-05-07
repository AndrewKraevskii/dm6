<script lang="ts">
  import Katex from '$components/Katex.svelte';
  import Visualizer from './Visualizer.svelte';
  let n = 9;
  let k = 3;

  function p(k: number, n: number): number {
    if (n == 0 && k == 0) return 1;
    if (n <= 0 || k <= 0) return 0;
    return p(k, n - k) + p(k - 1, n - 1);
  }

  $: res = p(k, n);
</script>

<h4>≥ 1 ball per box— surjective mapping.</h4>
Разбиваем число шариков на возможные составляющие 10 = 7 + 2 + 1. Такое считается через <Katex
  math="p_n(k) = p_{'{'}{n}{'}'}({k}) = {res}"
/>.

<br />
<Visualizer constraint="surjective" circles_colored={false} bind:k bind:n boxes_sorted={true} />
