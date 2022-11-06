import { useEffect, useRef } from "react";

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 */
export default function useEffectOnUpdate(
  effect: Function,
  dependencies: any[]
) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
