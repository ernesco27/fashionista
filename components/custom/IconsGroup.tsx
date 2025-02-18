import React from "react";
import Row from "./Row";
import { CiSearch } from "react-icons/ci";
import { Button } from "../ui/Button";
import SearchBar from "../modules/header/SearchBar";

const IconsGroup = ({
  openSearchBar,
  setOpenSearchBar,
}: {
  openSearchBar: boolean;
  setOpenSearchBar: (open: boolean) => void;
}) => {
  return (
    <section>
      <Row className="">
        <SearchBar
          openSearchBar={openSearchBar}
          setOpenSearchBar={setOpenSearchBar}
        />
        <div
          className="cursor-pointer"
          onClick={() => setOpenSearchBar(!openSearchBar)}
        >
          <CiSearch size={40} className="hover:text-primary-700" />
        </div>
      </Row>
    </section>
  );
};

export default IconsGroup;
