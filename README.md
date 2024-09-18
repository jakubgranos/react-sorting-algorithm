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

- Wybrałem środowisko opartę na NX + vite, z tego względu, że aplikacje CRA słabo sie skalują. Dodatkowo repo oparte na NX pozwala na lepsze i sprawniejsze zarządzanie + ustawienie testów np w playwright

2. Zadanie rozpocząłem od przygotowania i rodzielenia kodu na foldery zgodnie z ich przeznaczeniem oraz dodałem basic'owe funkcjonalności sortowania i wizualizacji
