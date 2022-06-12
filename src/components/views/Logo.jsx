import React from "react";
import styled from "styled-components/macro";
import defaultdesktopsrcfile from "../../assets/images/jacobs.png";
import { Image } from "../atoms/Image";

export const LogoHeadingWrapper = styled.h1`
  width: 100px;
  height: 40px;
`;
export const LinkWrapper = styled.a`
  float: left;
  width: 100%;
  height: 100%;
`;

export const Logo = ({
  redirectionPath,
  titleInfo,
  desktopsrcfile,
}) => {
  return (
    <LogoHeadingWrapper>
      <LinkWrapper href={redirectionPath} title={titleInfo}>
        <Image
          alt="Jacob Logo"
          desktopsrcfile={desktopsrcfile}
          style={{ color: "black" }}
        />
      </LinkWrapper>
    </LogoHeadingWrapper>
  );
};

Logo.defaultProps = {
  redirectionPath: "",
  titleInfo: "title",

  desktopsrcfile: defaultdesktopsrcfile,
};
