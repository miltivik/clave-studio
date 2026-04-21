export function getHeroVisualMode({ hasMounted, isDesktop, prefersReducedMotion }) {
  return hasMounted && isDesktop && !prefersReducedMotion ? "interactive" : "static";
}

export function shouldLoadHero3D({ hasMounted, isDesktop, prefersReducedMotion }) {
  return hasMounted && isDesktop && !prefersReducedMotion;
}

export function shouldEnableLenis({ isDesktop, prefersReducedMotion }) {
  return isDesktop && !prefersReducedMotion;
}

export function shouldHydrateDeferredSection({ hasMounted, isNearViewport }) {
  return hasMounted && isNearViewport;
}
