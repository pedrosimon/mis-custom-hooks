import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
  const initialState = { data: null, loading: true, error: null };
  const [state, setState] = useState(initialState);
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState(initialState);

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data: data,
          });
        } else {
          console.log("no se llamó");
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: "no se pudo cargar la info",
        });
      });
  }, [url]);

  return state;
};
