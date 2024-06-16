export interface FavouritesListProps<T> extends  React.ComponentProps<"div"> {
  items: T[]
  onItemClick: (item: T) => void
}
