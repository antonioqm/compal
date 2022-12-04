import { useScrollTrigger } from "@mui/material";
import { cloneElement } from "react";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: Node;
  children: React.ReactElement;
}

export default function ElevationScroll({ ...props }: Props) {
  const { children, window } = props;

  // 
  // 

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window || undefined,
  });

  return cloneElement(children, {
    // elevation: trigger ? 20 : 0,
    style: trigger ? {boxShadow: '0px 10px 20px rgba(0,0,0,.1)'} : {boxShadow: '0px 2px 0px -200px rgba(0,0,0,0)'}
  });
}