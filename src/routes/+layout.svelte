<nav>
  <ul>
    <li><a href="./">Main</a></li>
    <li><a href="./task1">1</a></li>
    <li><a href="./task2">2</a></li>
    <li><a href="./task3">3</a></li>
    <li><a href="./task4">4</a></li>
    <li><a href="./task5">5</a></li>
    <li><a href="./task6">6</a></li>
  </ul>
</nav>
<slot />

<style>
  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
  }
  li {
    padding-right: 10px;
  }
</style>
