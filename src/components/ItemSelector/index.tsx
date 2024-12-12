import { twMerge } from 'tailwind-merge';
import DropdownArrow from '~/assets/dropdown-arrow.svg';
import XField from '~/assets/x-field.svg';

interface Program {
  id: string;
  label: string;
}

interface ItemSelectorProps {
  className?: string;
  items: Program[];
  selections: Program[];
  updateSelections: (selections: Program[]) => void;
  placeholder?: string;
}

export default function ItemSelector({
  items,
  selections,
  updateSelections,
  placeholder = 'All items',
  className,
}: ItemSelectorProps) {
  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItems = items.filter(
      (item) => item.id === event.target.value,
    );
    updateSelections(selectedItems);
  };

  const clearSelection = () => {
    updateSelections([]);
  };

  const selectedItem = selections.length === 1 ? selections[0] : null;
  const isAllSelected = !selectedItem;

  return (
    <div
      className={twMerge(
        'flex h-9 items-stretch border border-border bg-surface-secondary font-yalenewroman text-primary',
        className,
      )}
    >
      <div className="relative flex-1">
        <select
          className="h-full w-full appearance-none bg-transparent px-2 pr-8"
          value={selectedItem?.id ?? 'all'}
          onChange={handleSelection}
        >
          <option value="all">{placeholder}</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        {isAllSelected && (
          <div className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2">
            <DropdownArrow className="h-full w-full text-primary" />
          </div>
        )}
      </div>

      {!isAllSelected && (
        <button
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-l border-border hover:bg-surface-paper focus:bg-surface-paper focus:outline-none"
          onClick={clearSelection}
          type="button"
          aria-label="Clear selection"
        >
          <XField className="h-4 w-4 text-primary" />
        </button>
      )}
    </div>
  );
}
