<script lang="ts">
  const width = 100;
  const height = (width * 248) / 452;

  const circle_min_y = 35;
  const circle_max_y = 50;
  const circle_min_x = 15;
  const circle_max_x = 60;
  
  const x_gain = 23;
  const y_gain = -22;

  export let circles = 5;
  export let colored = false;
  $: getColor = colored ? () => Math.floor(Math.random() * 16777215).toString(16) : () => 'FF0000';
  $: c = new Array(circles).fill(0).map(() => {
    const z = Math.random();
    return {
      color: getColor(),
      x: Math.random() * (circle_max_x - circle_min_x) + circle_min_x + x_gain * z,
      y: Math.random() * (circle_max_y - circle_min_y) + circle_min_y + y_gain * z,
    };
  });
</script>

<div>
  <img src="back-box.webp" class="back" alt="back of the box" {width} {height} />

  <svg {width} {height}>
    {#each c as { x, y, color }}
      <circle cx={x} cy={y} r="5" stroke="black" stroke-width="1" fill="#{color}" />
    {/each}
  </svg>

  <img src="front-box.webp" alt="front of the box" {width} {height} />
</div>

<style>
  div {
    display: block;
    position: relative;
    top: 0;
    left: 0;
  }

  .back {
    position: relative;
    top: 0;
    left: 0;
  }

  img,
  svg {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
