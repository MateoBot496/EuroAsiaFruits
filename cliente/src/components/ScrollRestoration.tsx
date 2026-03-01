import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Hace que los links del footer envíen a la parte superior de la página */

export default function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
