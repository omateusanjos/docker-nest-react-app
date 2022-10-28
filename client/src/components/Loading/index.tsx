import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

const Loading = ({
  type,
  color,
  ...rest
}: {
  type: LoadingType;
  color: string;
}) => (
  <ReactLoading
    type={type}
    color={color}
    height={"20%"}
    width={"20%"}
    delay={2}
    {...rest}
  />
);

export default Loading;
