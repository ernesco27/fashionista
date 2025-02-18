"use client";

import Container from "@/components/custom/Container";
import IconsGroup from "@/components/custom/IconsGroup";
import Logo from "@/components/custom/Logo";
import MobileButton from "@/components/modules/header/MobileButton";
import Row from "@/components/custom/Row";
import React, { useState } from "react";
import MainMenu from "./MainMenu";

const Main = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  return (
    <section className="h-full">
      <Container>
        <Row className="flex justify-between">
          <MobileButton />
          <Logo />
          <MainMenu />
          <IconsGroup
            openSearchBar={searchBarOpen}
            setOpenSearchBar={setSearchBarOpen}
          />
        </Row>
      </Container>
    </section>
  );
};

export default Main;
