<script lang="ts">
  import Box from './Box.svelte';

  export let constraint: 'any' | 'injective' | 'surjective' = 'any';
  export let boxes_sorted: boolean = false;
  export let circles_colored: boolean = false;

  export let n = 5;
  export let k = 5;

  $: {
    n = Math.floor(n);
  }
  $: {
    k = Math.floor(k);
  }

  $: if (n < 0) {
    n = 0;
  }

  $: if (k < 0) {
    k = 0;
  }

  $: impossible = (n > k && constraint === 'injective') || (n < k && constraint === 'surjective');

  let c: { circles: number }[] = [];
  $: if (k > 0 && !impossible) {
    inf: while (true) {
      let balls_left = n;
      if (constraint === 'surjective') {
        c = new Array(k).fill(0).map(() => {
          return {
            circles: 1,
          };
        });
        balls_left -= k;
      } else {
        c = new Array(k).fill(0).map(() => {
          return {
            circles: 0,
          };
        });
      }
      while (balls_left) {
        const random = Math.floor(Math.random() * k);
        if (constraint === 'injective' && c[random].circles >= 1) {
          continue;
        }
        c[random].circles++;
        balls_left--;
      }

      break;
    }

    if (boxes_sorted) {
      c.sort((a, b) => {
        return b.circles - a.circles;
      });
    }
  }
</script>

<label>Значение n: <input type="number" bind:value={n} /></label>
<label>Значение k: <input type="number" bind:value={k} /></label>
<div class="container">
  {#if impossible}
    <strong style="color: red;">Impossible</strong><br />
  {:else}
    {#each c as { circles }, index}
      <div>
        {#if !boxes_sorted}
          <span style="text-align: center; display: block;">{index + 1}</span>
        {/if}
        <Box {circles} colored={circles_colored} />
      </div>
    {/each}
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
