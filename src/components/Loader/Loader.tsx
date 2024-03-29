import React from "react";

import cn from "classnames";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = "m",
  className = "",
}) => {
  // const [isLoading, setIsLoading] = React.useState(loading)
  let loaderSize = {};
  switch (size) {
    case "l":
      loaderSize = {
        width: "60px",
        height: "60px",
        border: "6px solid #ff0000",
      };
      break;
    case "m":
      loaderSize = {
        width: "40px",
        height: "40px",
        border: "4.5px solid #ff0000",
      };
      break;
  }
  // const loaderSize = `loader_${size}`;
  const classNames = cn(styles.loader, `${className}`);
  return loading ? <div className={classNames} style={loaderSize}></div> : null;
};
export default Loader;
