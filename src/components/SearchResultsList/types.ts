export interface SearchResultsListProps<T> extends  React.ComponentProps<"div"> {
  items: T[]
  onItemClick: (item: T) => void
}

export interface SearchResultsListItemProps<T> {  
  item: T
  onClick: React.MouseEventHandler<HTMLLIElement> | undefined
}
