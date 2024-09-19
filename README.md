# ReactSorting

deploy: https://react-sorting-algorithm.vercel.app

## Scripts

Installation

using yarn

```sh
yarn or yarn install
```

using npm

```sh
npm install
```

To run the dev server for your app, use:

```sh
npx nx serve react-sorting

```

To create a production bundle:

```sh
npx nx build react-sorting
```

To rest NX

```sh
 npx nx rest
```

To repair NX

```sh
 npx nx repair
```

To see all available targets to run for a project, run:

```sh
npx nx show project react-sorting
```

## Dokumentacja Zadania.

Zadanie: Zadanie: Wizualizacja Algorytmu Sortowania

1. stworzenie aplikacji React, która wizualizuje algorytm sortowania, np. QuickSort, MergeSort lub inne, według twojego wyboru
2. Wizualizacja: Stwórz wizualizację procesu sortowania, gdzie kroki algorytmu są krok po kroku prezentowane na interfejsie użytkownika. Na przykład, dla QuickSort, kroki mogą obejmować wybór pivota, podział tablicy, rekurencyjne sortowanie podtablic itp.
3. Animacje: Dodaj animacje do wizualizacji, aby lepiej zobrazować, jak elementy tablicy poruszają się i zmieniają swoje pozycje podczas sortowania.
4. Interaktywność:

- Dodaj przycisk "Sortuj", który inicjuje proces sortowania.
- Zaimplementuj przycisk "Generate new array", który generuje nową losową tablicę do posortowania.
- Udostępnij opcję wyboru algorytmu sortowania spośród co najmniej dwóch różnych algorytmów.
- Pozwól użytkownikowi na dostosowanie rozmiaru tablicy do sortowania.
- Kolorowanie elementów Podczas sortowania, podkreślaj różnymi kolorami elementy tablicy, aby wskazać, które są porównywane, zamieniane, itp.

### Dokumentacja kroków

pod tym punktem opiszę decyzje projektowe i ewentualne trudności napotkane podczas implementacji zadania

1. Wybranie środowiska:

- Setup środowiska to: React + typescript + tailwind dodatkowo wybrałem środowisko opartę na NX + vite, z tego względu, że aplikacje CRA słabo sie skalują. Dodatkowo repo oparte na NX pozwala na lepsze i sprawniejsze zarządzanie + ustawienie testów np w playwright

2. Zadanie rozpocząłem od przygotowania struktury folderów oraz przygotowanie context hooka aby zapobiec "props drilling"

- Wybrałem taką metodę, gdyż potrzebowałem opcji zarządzania wartościami state w różnych komponentach.

3. Dodałem bardzo prostą opcje wyswietlania i generowania (razem z animajcą) sortowania, aby zobrazować sobię aktualny stan i sprawdzic czy wszystkie hooki działają poprawnie.

4. Stworzenie Controllerów do vizualizera aby user ustalać jak ma się sortowanie zachowywać

5. Dodanie pierwszego algorytmu "quick sort"

- Dzieląc kod na mniejsze częsci (aby kod był bardziej czytelny) wykonałem funkcje generatora, który pozwala na "krokowe" wykonywanie algorytmu, dzięki czemu mamy lepszą wizualizacje sortowania, dodatkowo stworzyłem updateArrayWithDelay, która pozwala na ustawienie "delay" dla generatora + możemy dodać kolory aby pokazać jak dokłanie działa dany algorytm i dodatkowo rodzieliłem delay osobo dla generatorów, aby nie mieszac kod w jednej dużej funkjci, tylko w mniejszych - kod jest wtedy bardziej czytelny

- wizualizacje sortowania oparłem na tym źródle: https://commons.wikimedia.org/wiki/File:Quicksort.gif

- **trudności**: wykonanie bardziej "szczegółowego" algorytmu quick sort wymagał ode mnie "doszkolenia" się w zakresie algorytmów i funkcji które trzeba wykorzystać aby wykonać poprawnie zdanie

- **rozwiąnie trudności**: Dokładny research jak i poradniki na yt pomogły mi zrozumieć jak działa ten algorytm.

6. Dodanie drugiego algorytmu "merge sort"

- tak samo jak przy poprzedim algorytmem, **trudnosci** oraz **rozwiazywanie trudnosci** z tą różnicą, że doszedłem trochę szybciej do tego co i jak działa w tym algorytmie

- wizualizacje sortowania do tego algorytmu oparłem na tym źródle: https://commons.wikimedia.org/wiki/File:MergeSort_2.gif

7. W trakcie 6 kroku, zauwazyłem, że w niekórych miejscach kod sie powtarza, więc rodzieliłem kod na poszczeólne elementy, jak components, helpers, modules itp - tak aby każdy napisany kod był na swoim miejscu.

8. Na tym etapie zająłem się dodawaniem styli oraz odpowiedniego "wyglądu" aplikacji, aby była bardziej
   przyjazna oku oraz aby przedstawiała lepiej co się dzieje na ekranie (dzięki komponencie Legend)

- W normalnym projekcie użyłbym tutaj biblioteki react mui lub innej z gotowymi komponentami, tutaj tego nie dodałem, gdyż nie było to wymagane w zadaniu i kodu CSS było na tyle mało, że lepiej było użyc tailinda, niż ściagać inną cieższą libkę, która normalnie może wpłynąć na performance (ooczywiscie to case przy większych projektach). A przy okazji jak wziałem się bardziej za "wizualne" sprawy, to przepisałem trochę komentarzy w kodzie aby bylo bardziej zrozumiałe dla innego deva

- **Naptokany problem**: zmieniając klasy cssowe, na klasy z tailwinda, zauważyłem, że na wykresie nie zmieniają sie kolory, style podstawowe nadpisały nowe klasy.

- **Rozwiazanie**: w głownym stylu styles.css napisałem regółki css aplikujac kolory z tailwinda, dzięki czemu nowe klasy będą miały większy piorytet - co prawda da się w klasie tailwind zwiększyć piorytet za pomocą "!" co oznacza, że kalsa ma dodany !important, ale importantów nie powinno się używać (jedynie jako ostateczność jest to dobra opcja).

9. Zapisywanie danych w localStorage

- Globalna funkcja odpowiedzialna za osadzenie odpowiednich danych w localstorage lub w session stroage (można sobie wybrać)
- Zrobiłem to w ten sposób, źe w contexcie, gdzie trzymam wszystkie moje stany ustawiłem useEffect który wykonuje się tylko raz przy pierwszym renderze aplikacji, dzięki czemu na dzień dobry sprawdza/zapisuje ostatnie podane wartosci - nie ustawiam w useEffect "dependency array" aby zapobiec niepotrzebnym re-renderom w momencie jak zmienia się jedna z wartości zapisywanych, zamiast tego, funkcje set browserStorage umiescilem w kontrolerze do visualizera, gdzie wartości się zmieniają - dzięki temu, mamy odseparowe zmiany dla poszczególnych elementów, więc jak zmienie np szybkosć wykonywania algorytmu, to nie wywołam "potrzeby" zmiany w innych stanach
- Dało się to zrobić prosciej np używajac useEffecta i ustawiając 'dependency array' na zmienionych elementach, ale negatywnie może to wpłynąć na aplikacje, gdyż wywołujemy re-render za kazdym razem na każdej z podanych zmiennych (nawet jak tylko jedna się zmieni) a tego nie chcemy robić.

10. Deploy aplikacji na vercel (wybrałem vercel bo szybko można robić deploy oraz zarządzać nimi) i mam wrażenie, że jest bardziej przyjazny apką reactowym

### Podsumowanie

1. **Wybranie środowiska**:

   - Środowisko: React + TypeScript + Tailwind, z NX + Vite zamiast CRA dla lepszej skalowalności i zarządzania.

2. **Struktura projektu**:

   - Przygotowanie struktury folderów i context hooka, aby uniknąć "props drilling".

3. **Początkowa implementacja**:

   - Dodanie podstawowej funkcji wyświetlania i generowania sortowania z animacją.

4. **Kontrolery wizualizera**:

   - Stworzenie kontrolerów umożliwiających użytkownikowi ustawienie zachowania sortowania.

5. **Algorytm "quick sort"**:

   - Implementacja algorytmu z funkcją generatora dla krokowego wykonywania i wizualizacji.
   - Źródło wizualizacji: [Quicksort GIF](https://commons.wikimedia.org/wiki/File:Quicksort.gif).
   - Trudności: Konieczność doszkolenia się w zakresie algorytmów.
   - Rozwiązanie: Research i poradniki na YouTube.

6. **Algorytm "merge sort"**:

   - Podobne podejście jak przy "quick sort".
   - Źródło wizualizacji: [MergeSort GIF](https://commons.wikimedia.org/wiki/File:MergeSort_2.gif).

7. **Refaktoryzacja kodu**:

   - Podział kodu na komponenty, helpery, moduły itp., aby zwiększyć czytelność.

8. **Stylizacja i wygląd aplikacji**:

   - Dodanie stylów i poprawa wyglądu aplikacji.
   - Problemy: Konflikty stylów przy użyciu Tailwind.
   - Rozwiązanie: Zastosowanie reguł CSS w `styles.css` dla nadpisania stylów Tailwind.

9. **Zapisywanie danych w przeglądarce**:

   - Stworzenie glboalej funckji do zapisywania/pobierania oraz czyszczenia danych
   - dodanie możliwosci wybrania czy to local czy session storage ma być użyty
   - Zoptymalizowanie useEffect i poberania danych (uniknięcie re-renderów)

10. Deploy 
