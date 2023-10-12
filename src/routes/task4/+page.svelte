<script lang="ts">
  import { uid } from '$lib/utils';
  import * as C from 'js-combinatorics';
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  const [send, receive] = crossfade({
    duration: () => 100000,
  });

  function pascal(height: number) {
    const numbers_in_last_row = height * 2 - 1;
    const columns = numbers_in_last_row * 2 - 1;
    const array = new Array(height).fill(null).map((_, i) => {
      return new Array(columns).fill(null).map((_, j) => {
        const r = j - 2 * height + 2 + i;
        if (r < 0) return { value: 0n, id: uid() };
        if (r % 2 != 0) return { value: 0n, id: uid() };
        return { value: C.combination(i, r / 2), id: uid() };
      });
    });
    return array;
  }

  function random() {
    rows[0][(rows[0].length + 1) / 2].id = rows[1][(rows[0].length + 1) / 2].id;
    rows[0][(rows[0].length + 1) / 2].value = rows[1][(rows[0].length + 1) / 2].value;
    rows[1][(rows[0].length + 1) / 2].id = uid();
    rows[1][(rows[0].length + 1) / 2].value = 1n;
    rows = rows;
  }
  $: rows[0];
  let n = 10;
  $: rows = pascal(n);
</script>

<button type="button" on:click={random}>Move</button>
<input type="number" bind:value={n} />
<div class="container">
  <div class="triangle">
    {#each rows as row (row)}
      <div class="row">
        <!-- <div class="out" /> -->
        {#each row as { value, id } (id)}
          <div class="cell" in:receive={{ key: id }} out:send={{ key: id }} animate:flip={{ duration: 0 }}>
            {value === 0n ? '' : value}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  .triangle {
    --row-height: 30px;
    display: flex;
    width: fit-content;
    flex-direction: column;
  }

  .row {
    align-self: center;
    display: flex;
    flex-direction: row;
    height: var(--row-height);
    width: fit-content;
  }
  .cell {
    margin: 2px;
    width: 20px;
    text-align: center;
  }
</style>
