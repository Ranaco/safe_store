import * as React from "react";

const useSearchController = () => {
  const [search, setSearch] = React.useState<string>("");
  const searchQueries = [
    "eggs",
    "Oreo",
    "Dove Soap",
    "Colgate",
    "Pepsi",
    "Thumbsup",
    "Vim bar",
    "Kinley",
    "Head & Shoulders",
    "Cheetos",
  ];

  const tiles = [
    {
      image: "/images/shampoo.webp",
      name: "Shampoo",
    },
    {
      image: "/images/bottle.jpg",
      name: "Bottle",
    },
    {
      image: "/images/apple.jpg",
      name: "Apple",
    },
  ];

  return {
    search,
    setSearch,
    searchQueries,
    tiles,
  };
};

export default useSearchController;
