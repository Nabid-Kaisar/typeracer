import React from "react";
import { Box } from "@material-ui/core";

interface LogoProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ src, alt, style }) => {
  return (
    <>
      <img alt={alt} src={src} style={style} />
    </>
  );
};

export default Logo;
