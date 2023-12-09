import * as React from "react";
import { Input, Button } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  search: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onChange }) => {
  return (
    <Input
      value={search}
      onChange={(e) => onChange(e.target.value)}
      endContent={
        <Button
          variant="bordered"
          isIconOnly
          onClick={() => console.log(search)}
        >
          <CiSearch size={30} />
        </Button>
      }
      radius="lg"
      placeholder="Search"
      classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
          "bg-transparent",
          "text-white/30",
          "placeholder:text-black/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "shadow-xl",
          "bg-default-200/50",
          "dark:bg-default/60",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-default-200/70",
          "dark:hover:bg-default/70",
          "group-data-[focused=true]:bg-default-200/50",
          "dark:group-data-[focused=true]:bg-default/60",
          "!cursor-text",
        ],
      }}
    />
  );
};

export default SearchBar;
