import SearchBar from "@/components/search-bar";
import { ButtonGroup, Button, Card } from "@nextui-org/react";
import * as React from "react";
import Image from "next/image";
import useSearchController from "./controller";

const Search = () => {
  const { search, setSearch, searchQueries, tiles } = useSearchController();

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <SearchBar search={search} onChange={setSearch} />
      <div className="flex flex-row h-full w-full justify-between">
        <div className="flex-[0.35] h-full">
          <ButtonGroup
            className="flex items-start flex-col gap-4"
            variant="flat"
          >
            {searchQueries.map((query, index) => {
              return (
                <Button
                  className="w-full bg-nord1 !rounded-md"
                  key={index}
                  onClick={() => setSearch(query)}
                >
                  {query}
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
        <div className="flex-[0.6] h-full flex flex-col gap-4 items-center">
          {tiles.map((tile, index) => {
            return (
              <Card
                className="w-[90%] bg-nord1 mix-blend-color-burn"
                isPressable
                onClick={() => {}}
                key={index}
              >
                <Image
                  src={tile.image}
                  alt={tile.name}
                  layout="cover"
                  width={1000}
                  height={1000}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
