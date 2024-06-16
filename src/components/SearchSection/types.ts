import { SearchResponse } from '@/services/weatherapi/types'

export type ListItem = SearchResponse['0'] & { key: string, text: string }

export interface SearchSectionProps extends  React.ComponentProps<"div"> {
  inputValue: string
  onValueChange: (value: string) => void
  onSearchItemClick: (item: ListItem) => void
  onRecentItemClick: (item: ListItem) => void
}
