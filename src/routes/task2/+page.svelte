<script lang="ts">
  import Katex from '$components/Katex.svelte';

  function password_generator() {
    function sample<T>(arr: T[], n: number, starting?: T[]): T[] {
      const res: T[] = starting || [];
      while (res.length < n) {
        const rand = Math.floor(Math.random() * arr.length);
        const element = arr[rand];

        if (res.includes(element)) continue;

        res.push(element);
      }
      return res;
    }

    function shuffle<T>(arr: T[]) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const numbers = '0123456789'.split('');
    const all = [...lowerCase, ...upperCase, ...numbers];

    const twoDigits = sample(numbers, 2);
    const upperCaseLetter = sample(upperCase, 1);
    return shuffle(sample(all, 8, [...twoDigits, ...upperCaseLetter])).join('');
  }

  let password = password_generator();
</script>

<h1>Task 2</h1>

<lable>Password: <input readonly value={password} /></lable>
<button
  type="button"
  on:click={() => {
    password = password_generator();
  }}>New password</button
>
<p>
  Размер алфавита <Katex math="26*2+10 = 62" />
  Можно легко посчитать сколько паролей вида 8 символов из a..z+A..Z+0..9 алфавита где буквы не повторяются.
  Это <Katex math="P(n, k) = P(62, 8) = 136325893334400" />. Для того чтобы найти лишние пароли
  которые не удовлетворяют 3му условию используем метод включения исключения. Признаками будут:
</p>
<ol>
  <li><Katex math="P_1=" /> Пароль содержит 0 заглавных букв,</li>
  <li><Katex math="P_2=" /> Пароль содержит 1 или 0 цифр</li>
</ol>
<p>
  <Katex math="X_1, X_2 -" /> множества паролей соответствующие условиям <Katex math="P_1, P_2" /> соответственно
</p>
<p>
  <Katex math="|X_1 \cup X_2| = |X_1| + |X_2| - |X_1 \cap X_2| " />
</p>
<p>
  <Katex math="|X_1| = P(36,8)" /> - так как заглавных букв нет, выбирать приходится из <Katex
    math="62-26=36"
  /> букв<br />
  <Katex math="|X_2| = P(52,8) + 10*8*P(52,7) " /> - если 0 цифр то это просто выбор на 10 символов меньше.
  Если содержит 1 цифру то мы ставим 1 из 10 цифр на 1 из 8 мест и остаётся выбрать <Katex
    math="P(52,7)"
  /> букв<br />
  <Katex math="|X_1 \cap X_2| = P(26,8) + 10*8*P(26,7) " /> это модифицированный случай с цифрами, но
  когда цифры расставили букв меньше на 26 (т.к. ставим только строчные).<br />
  <Katex
    math={'|X_1 \\cup X_2| = P(36,8) + P(52,8) + 10*8*P(52,7) - P(26,8) - 10*8*P(26,7) = \\frac{36!}{(36 - 8)!} + \\frac{52!}{(52 - 8)!} + 10*8*\\frac{52!}{(52 - 7)!} - \\frac{26!}{(26 - 8)!} - 10*8*\\frac{26!}{(26 - 7)!} = 85176153820800'}
  /><br />
  Значит количество подходящих паролей <Katex
    math="136325893334400 - 85176153820800 = 51149739513600"
  />
</p>
<p>
  <Katex math="51149739513600 \thickapprox 5*10^{"{13}"}" />
  Если мы пытаемся подобрать пароль на сайте который принимает его примерно раз в 1 секунду (такое вполне может быть) это потребует примерно <a href="https://en.wikipedia.org/wiki/One_Million_Years_B.C.">1 миллион лет</a>
</p>
<p>
  Возможен также случай когда была взломана база данных и производится попытка подобрать пароль подходящий к хешам сохранённым в базе данных. 
</p>
Скорость алгоритмов хеширования будет примерно <a href="https://automationrhapsody.com/md5-sha-1-sha-256-sha-512-speed-performance/">1 миллион операций в секунду</a>. Тогда это потребует 1 год чтобы подобрать пароли под все хеши в базе данных.

