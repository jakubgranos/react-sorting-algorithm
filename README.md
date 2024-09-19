# ReactSorting

## Scripts

To run the dev server for your app, use:

```sh
npx nx serve react-sorting

```

To create a production bundle:

```sh
npx nx build react-sorting
```

To see all available targets to run for a project, run:

```sh
npx nx show project react-sorting
```

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
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

- Dzieląc kod na mniejsze częsci (aby kod był bardziej czytelny) wykonałem funkcje generatora, który pozwala na "krokowe"
  wykonywanie algorytmu, dzięki czemu mamy lepszą wizualizacje sortowania, dodatkowo stworzyłem updateArrayWithDelay,
  która pozwala na ustawienie "delay" dla generatora + możemy dodać kolory aby pokazać jak dokłanie działa dany algorytm.

- wizualizacje sortowania oparłem na tym źródle: https://commons.wikimedia.org/wiki/File:Quicksort.gif

- **trudności**: wykonanie bardziej "szczegółowego" algorytmu quick sort wymagał ode mnie "doszkolenia" się w zakresie algorytmów i funkcji które trzeba wykorzystać aby wykonać poprawnie zdanie

- **rozwiąnie trudności**: Dokładny research jak i poradniki na yt pomogły mi zrozumieć jak działa ten algorytm.
