import * as React from "react";
import styled from "styled-components/macro";

export const PictureWrapper = styled.picture`
  height: auto;
`;

const Img = styled.img`
  height: ${(props) => props.height};
  width: ${(props) => props.width};

  ${(props) =>
    props.cover &&
    `
      object-fit: cover;
      object-position: ${props.position || "center"};
      height: 100%;
    `}
`;

export const Image = ({
  id,
  alt = "Jacobs Img",
  mobilesrcfile,
  tabletsrcfile,
  desktopsrcfile,
  height,
  width,
}) => {
  return (
    <PictureWrapper>
      <source media="(min-width: 960px)" srcSet={desktopsrcfile} />
      <source
        media="(min-width: 640px)"
        srcSet={tabletsrcfile || desktopsrcfile}
      />
      <source
        media="(min-width: 320px)"
        srcSet={mobilesrcfile || desktopsrcfile}
      />
      <Img
        id={id}
        alt={alt}
        src={desktopsrcfile}
        height={height}
        width={width}
      />
    </PictureWrapper>
  );
};

Image.defaultProps = {
  mobilesrcfile: "",
  tabletsrcfile: "",
  desktopsrcfile: "",
  height: "100%",
  width: "100%",
  id: "",
};
