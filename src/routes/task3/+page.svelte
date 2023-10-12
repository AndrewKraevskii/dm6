<script lang="ts">
  import Katex from '$components/Katex.svelte';
  
  import * as C from 'js-combinatorics';
  import { sample } from '$lib/utils';

  const max = 30;

  const t = new Array(6).fill(null).map(() => {
    return { n: 0, k: 0 };
  });

  function numToChar(num: number) {
    if (0 <= num && num < 10) {
      return '' + num;
    } else {
      return String.fromCharCode(num - 10 + 97);
    }
  }

  function generateString(len: number, max: number, min = 1) {
    return new Array(len)
      .fill(null)
      .map(() => {
        const rand = Math.floor(Math.random() * (max - min)) + min;
        return numToChar(rand);
      })
      .join('');
  }

  function allChars(max: number) {
    return new Array(max).fill(null).map((_, i) => {
      return numToChar(i + 1);
    });
  }

  function getWithoutRepeat(len: number, max: number) {
    if (len > max) return '';
    return sample(allChars(max), len).join('');
  }

  function randomNK(min: number, max: number) {
    const n = min + Math.floor(Math.random() * (max - min));
    const k = min + Math.floor(Math.random() * (max - min));
    return {
      n,
      k,
    };
  }

  function regenerate() {
    t[0] = randomNK(0, max);
    t[1] = randomNK(1, max);
    if (t[1].n < t[1].k) {
      const tmp = t[1].n;
      t[1].n = t[1].k;
      t[1].k = tmp;
    }
  }
  regenerate();
  $: a = generateString(5, 10)
    .split('')
    .sort((a: string, b: string) => {
      return +a - +b;
    });

  function removeNonDigitsFromString(str: string) {
    return str.replace(/\D/g, '');
  }

  let number3 = generateString(5, 10, 0);
  $: number3 = changeNum3(number3);

  function changeNum3(number: string) {
    number = removeNonDigitsFromString('' + number);
    if (number[0] == '-' || number[0] == '+') {
      number = number.slice(1);
    }
    if (number.includes('.')) {
      number = number.slice(0, number.indexOf('.'));
    }

    return number
      .split('')
      .sort((a, b) => +b - +a)
      .join('');
  }

  function generateStarsAndBarsFromNumber(num: string) {
    const star = '\\bullet ';
    const bar = '\\vert ';
    const digits = ('' + num).split('').map((a) => +a);
    const result: string[] = [];
    for (let index = 0; index < 9; index++) {
      const numbers = digits.filter((x) => x == index).length;
      result.push(star.repeat(numbers));
      result.push(bar);
    }
    const numbers = digits.filter((x) => x == 9).length;
    result.push(star.repeat(numbers));
    result.reverse();
    return result.join('');
  }

  function validate(num: number, min: number = 0, max: number = 10000) {
    num = Math.max(num, min);
    num = Math.min(num, max);
    num = Math.floor(num);
    return num;
  }
  let n3 = 10;
  let k3 = 5;
  $: k3 = validate(k3);
  $: n3 = validate(n3);
  let n4 = 10;
  let k4 = 7;
  $: k4 = validate(k4);
  $: n4 = validate(n4);
  // n - разрядность числа
  // k - количество позиций
</script>

<input type="button" on:click={regenerate} value="Regenerate" style="margin-left: 40px;" />

<ol type="a">
  <p>В этой задаче n-количество возможных цифр в числе (для 10 тичной системы без 0 это 9).
  k-это количество цифр в числе.</p>
  <li>
    Digits can be repeated.
    <p>
      Для каждой из 5 позиций выберем одну из 9 цифр (1-9) всего. <Katex math="9^5 = {9 ** 5}" />. Любое число подходит, например это: {generateString(
        5,
        10
      )}. Все числа подходят так что числа не подходящего не будет
      <br />
      <Katex math="n = {t[0].n}\\ k = {t[0].k}\\" />
      <Katex math="n^k = {t[0].n} ^{'{' + t[0].k + '}'} = {t[0].n ** t[0].k}" /><br /> И рандомное число в
      <span class="note" title="{t[0].n}-ричная от 1 до {numToChar(t[0].n)} включительно">{t[0].n}-ричной</span>
      системе счисления с {t[0].k} разрядами
      <Katex math="\overbrace{'{' + generateString(t[0].k, t[0].n + 1) + '}'}^{`{\\text{${t[0].k}}}`}" />
    </p>
  </li>
  <li>
    Digits cannot be repeated.
    <p>
      Для каждой позиции выберем цифру, но с каждым выбором цифр становится меньше. Это k-permutations. <Katex
        math="P(n, k) = P(9, 5) = {C.permutation(9, 5)}"
      />. Пример подходящий:
      {getWithoutRepeat(5, 9)}. Пример неподходящий: {((a) => {
        return a + a.slice(a.length - 1);
      })(getWithoutRepeat(4, 9))}.
      <br />
      Общая формула <Katex math="P(n, k) = P({t[1].n}, {t[1].k}) = {C.permutation(t[1].n, t[1].k)}" />. Пример при таких n и k <Katex
        math="\overbrace{'{' + getWithoutRepeat(t[1].k, t[1].n) + '}'}^{`{\\text{${t[1].k}}}`}"
      />
    </p>
  </li>
  <li>
    Digits can be repeated and must be written in non-increasing order.
    <p>
      Сведём эту задачу к start and bars. Здесь stars будут позиции в числе и их будет k. И мы будем разделять их на n кучек. Если позиция попала в
      1-ю кучку в ней будет число 1 и т.д. Например для числа <input type="number" bind:value={number3} />
      будет выглядеть так <Katex math={generateStarsAndBarsFromNumber(number3)} />. У нас получается n - 1 палочек и k stars. Формула для stars and
      bars будет <Katex math="C(k + n - 1, k) = C({k3}+{n3}-1, {k3}) = {C.combination(k3 + n3 - 1, k3)}" />. <br /><input
        type="number"
        bind:value={n3}
      />
      - разрядность числа(n),
      <input type="number" bind:value={k3} /> - количество позиций(k). <br />
      Для k=5, n=9 это равно <Katex math="C({5}+{9}-1, {5}) = {C.combination(5 + 9 - 1, 5)}" />
    </p>
  </li>
  <li>
    Digits cannot be repeated and must be written in strictly increasing order
    <p>
      Нужно просто выбрать количество цифр равное количеству разрядов и поставить в порядке возрастания. Переставить местами их не выйдет так что
      число будет зависеть только от выбора множества цифр. Это число просто k-combination <Katex
        math="C(n, k) = C({n4}, {k4}) = {C.combination(n4, k4)}"
      />. <br /> <input type="number" bind:value={n4} /> - разрядность числа(n),
      <input type="number" bind:value={k4} /> - количество позиций(k). Для <Katex math="k = 5;n=9; C(9,5)={C.combination(9, 5)}" />
    </p>
  </li>
  <!-- <span class="comment"
    >Кажется в задаче имелось ввиду что мы ищем 10-разрядные числа у которых отсутствуют некоторые цифры а я искал (n+1)-значные числа у которых
    отсутствует 0 (n цифр в целом), но в пунктах до этого ответ не поменяется так как в них мы рассматривали число просто как упорядоченный набор
    цифр. В задаче E это уже важно так что тут n будет ограничено 9ю от 1-9 всего 9 цифр.
  </span> -->
  <li>
    Digits can be repeated and the number must be divisible by 3 or 5.
    <br/>

    Для каждого числа 1234...n заменим цифру x на цифру x-1. Заметим что сумма цифр при этом уменьшилась на n.
    И остаток от деления такого числа на 3 меньше (по модулю) на n mod 3.
<br/>Идея заключается в том чтобы найти количество чисел с цифрами (0..n-1) и остатком от деления суммы цифр (-n) mod 3
тогда количество чисел с цифрами (1..n) будет таким же т.к. мы каждому числу можем найти пару в множестве чисел с другим набором цифр.

Количество чисел <Katex math="<= a"/> которые делятся на 3 без остатка всего <Katex math="\lfloor \frac{"{a}"}{"{3}"} \rfloor + 1"/>. Тогда количество чисел <Katex math="<= a"/> с остатком от деления k будет.
<Katex math="\lfloor \frac{"{a-k}"}{"{3}"} \rfloor + 1"/>.


Используя эту технику мы можем найти
      <br/>


    <Katex math="|X_3|=\lfloor \frac{"{n^k-(n\\mod 3)}"}{"{3}"} \rfloor + 1" /> количество чисел делимых на 3.<br/>
    <Katex math="|X_5|=\lfloor \frac{"{n^k-(n\\mod 5)}"}{"{5}"} \rfloor + 1" /> количество чисел делимых на 5.
    <Katex math="|X_{"{15}"}|=\lfloor \frac{"{n^k-(n\\mod 15)}"}{"{15}"} \rfloor + 1" /> количество чисел делимых на 15.
    
    <Katex math="|X_3 \cup X_5| = |X_3| + |X_5| - |X_15| = \lfloor \frac{"{n^k-(n\\mod 3)}"}{"{3}"} \rfloor + 1 + \lfloor \frac{"{n^k-(n\\mod 5)}"}{"{5}"} \rfloor + 1 - \lfloor \frac{"{n^k-(n\\mod 15)}"}{"{15}"} \rfloor - 1 = \lfloor \frac{"{n^k-(n\\mod 3)}"}{"{3}"} \rfloor + \lfloor \frac{"{n^k-(n\\mod 5)}"}{"{5}"} \rfloor - \lfloor \frac{"{n^k-(n\\mod 15)}"}{"{15}"} \rfloor + 1 "

    <p />
  </li>
  <li>
    Digits cannot be repeated and the sum of the digits must be even.
    <p>
      Сумма цифр чётна, значит надо выбрать из промежутка цифр 1-n чётное количество нечётных цифр и остальные заполнить чётными. Однозначных чётных
      чисел с цифрами от 1 до n всего <Katex math="e = \lfloor{'{n\\over 2}'}\rfloor" />, а нечётных <Katex math="o = \lceil{'{n\\over 2}'}\rceil" />.
      Если n чётное. То <Katex math={'e = o = \\frac{n}{2}'} />. Количество однозначных чётных будет <Katex math="e" />, двузначных чётных будет <Katex
        math={'e2 = e*e + o*o = 2*\\frac{n}{2}*\\frac{n}{2} = \\frac{n^2}{2}'}/>, трёхзначных <Katex math="e*e2 + o*o2 = n/2*e2+n/2*o2"/>

      

    </p>
  </li>
</ol>

<style>
  .note {
    text-decoration: underline;
  }
  .note:hover {
    color: blue;
  }

  .comment {
    color: gray;
  }
</style>
