export interface SearchTagsProps {
  placeholder: string;
}

export default function SearchInput({ placeholder }: SearchTagsProps) {
  return (
    <input
      className="search"
      placeholder={placeholder}
    />
  );
}
