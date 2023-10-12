<script lang="ts">
  import A1 from './A1.svelte';
  import A2 from './A2.svelte';
  import A3 from './A3.svelte';
  import B1 from './B1.svelte';
  import B2 from './B2.svelte';
  import B3 from './B3.svelte';
  import Box from './Box.svelte';
  import C1 from './C1.svelte';
  import C2 from './C2.svelte';
  import C3 from './C3.svelte';
  import D1 from './D1.svelte';
  import D2 from './D2.svelte';
  import D3 from './D3.svelte';
</script>

<h1>Task 1</h1>

<ol type="a">
  <li>
    <b>U</b> → <b>L</b>: Balls are <b>U</b>nlabeled, Boxes are <b>L</b>abeled.
    <ol type="1">
      <li><A1 /></li>
      <li><A2 /></li>
      <li><A3 /></li>
    </ol>
  </li>
  <li>
    <b>L</b> → <b>U</b>: Balls are <b>L</b>abeled, Boxes are <b>U</b>nlabeled.
    <ol type="1">
      <li><B1 /></li>
      <li><B2 /></li>
      <li><B3 /></li>
    </ol>
  </li>
  <li>
    <b>L</b> → <b>L</b>: Balls are <b>L</b>abeled, Boxes are <b>L</b>abeled.
    <ol type="1">
      <li><C1 /></li>
      <li><C2 /></li>
      <li><C3 /></li>
    </ol>
  </li>
  <li>
    <b>U</b> → <b>U</b>: Balls are <b>U</b>nlabeled, Boxes are <b>U</b>nlabeled.
    <ol type="1">
      <li><D1 /></li>
      <li><D2 /></li>
      <li><D3 /></li>
    </ol>
  </li>
</ol>
