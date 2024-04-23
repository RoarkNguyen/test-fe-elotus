import { animated } from "@react-spring/web";
import { ReactNode } from "react";
import { useSpring } from "react-spring";

export default function FadeIn({
  children,
  duration,
}: {
  duration?: number;
  children: ReactNode;
}) {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: {
        duration: duration ? duration : 1000,
      },
    }),
    []
  );

  return <animated.div style={props}>{children}</animated.div>;
}
