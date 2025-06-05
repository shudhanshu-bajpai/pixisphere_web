# Pixisphere

Pixisphere is a React + TypeScript web application for browsing and filtering a list of photographers. It features advanced filtering, search with debounce, pagination, and a responsive UI built with Tailwind CSS and custom UI components.

## Features

- **Photographer Listing:** Browse a paginated grid of photographers with profile cards.
- **Filtering:** Filter by price range, rating, styles, and city.
- **Search with Debounce:** Search photographers by name, location, or tags with input debouncing for performance.
- **Sorting:** Sort results by rating, price (low/high), or most recent.
- **Pagination:** Load more results with a "Load More" button.
- **Responsive Design:** Mobile-friendly sidebar filters and adaptive layouts.
- **Skeleton Loading:** Placeholder cards while data is loading.

## Project Structure

```
src/
  components/         # UI components (cards, sidebar, search bar, etc.)
  hooks/
    usePhotographers.ts  # Main data fetching, filtering, and pagination logic
  lib/
    utils.ts         # Utility functions
  pages/
    Index.tsx        # Main page
    NotFound.tsx
  types/
    photographer.ts  # TypeScript types
public/
  favicon.ico
  placeholder.svg
```

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd pixisphere2
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open the app:**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Filtering Logic

Filtering is handled in [`usePhotographers`](src/hooks/usePhotographers.ts):

- **Search:** Matches photographer name, location, or tags (case-insensitive).
- **Price:** Filters photographers within the selected price range.
- **Rating:** Filters by minimum rating.
- **Styles:** Filters by selected photography styles.
- **City:** Filters by selected city.
- **Sorting:** Results can be sorted by rating, price (ascending/descending), or most recent.

Filtering is applied in a single pass using JavaScript's `Array.prototype.filter` and `sort` methods.

## Debounce in Search

The [`SearchBar`](src/components/SearchBar.tsx) component uses a debounce mechanism:

- User input is stored in a local state.
- After 300ms of inactivity, the `onChange` callback is triggered to update the search query.
- This prevents excessive re-filtering and improves performance.

## Pagination

Pagination is implemented as "Load More" in [`usePhotographers`](src/hooks/usePhotographers.ts):

- The filtered list is sliced into pages of 6 items.
- Clicking "Load More" appends the next page to the displayed list.
- The `hasMore` flag indicates if more results are available.

## Custom UI

- Built with [Tailwind CSS](tailwind.config.ts) for styling.
- Custom UI components for cards, sidebar, search, pagination, and more.
- Icons from [lucide-react](https://lucide.dev/).

## Data Source

Photographer data is fetched from a API:
```
https://mocki.io/v1/ea3d2929-9445-4855-b48d-cb51019a69e2
```

## License

MIT

---

**Project files referenced:**
- [`usePhotographers`](src/hooks/usePhotographers.ts)
- [`SearchBar`](src/components/SearchBar.tsx)
- [`FilterSidebar`](src/components/FilterSidebar.tsx)
- [`Index`](src/pages/Index.tsx)