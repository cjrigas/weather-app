
import { SearchResultsListProps } from '../SearchResultsList/types'

export interface RecentsListProps<T> extends SearchResultsListProps<T> {
  onClearClicked: () => void
}
