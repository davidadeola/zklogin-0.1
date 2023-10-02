import { useEffect, useRef } from "react";
import Lottie, { AnimationConfigWithData } from "lottie-web";

export function useLottie(animationData: any, replay: boolean | number) {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) return;

    const params: AnimationConfigWithData = {
      container: container.current,
      loop: replay,
      animationData,
      autoplay: true,
      renderer: "svg",
    };
    const animation = Lottie.loadAnimation(params);

    return () => {
      animation.destroy();
    };
  }, [animationData, container, replay]);

  return container;
}
