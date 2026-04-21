import test from "node:test";
import assert from "node:assert/strict";

import {
  getHeroVisualMode,
  shouldEnableLenis,
  shouldLoadHero3D,
  shouldHydrateDeferredSection,
} from "../lib/performance-budget.js";

test("uses a static hero on mobile and before hydration", () => {
  assert.equal(
    getHeroVisualMode({
      hasMounted: false,
      isDesktop: true,
      prefersReducedMotion: false,
    }),
    "static"
  );

  assert.equal(
    getHeroVisualMode({
      hasMounted: true,
      isDesktop: false,
      prefersReducedMotion: false,
    }),
    "static"
  );
});

test("uses a static hero when reduced motion is requested", () => {
  assert.equal(
    getHeroVisualMode({
      hasMounted: true,
      isDesktop: true,
      prefersReducedMotion: true,
    }),
    "static"
  );
});

test("uses the interactive hero only on hydrated desktop sessions", () => {
  assert.equal(
    getHeroVisualMode({
      hasMounted: true,
      isDesktop: true,
      prefersReducedMotion: false,
    }),
    "interactive"
  );
});

test("loads the 3D hero only for hydrated desktop sessions without reduced motion", () => {
  assert.equal(
    shouldLoadHero3D({
      hasMounted: true,
      isDesktop: true,
      prefersReducedMotion: false,
    }),
    true
  );

  assert.equal(
    shouldLoadHero3D({
      hasMounted: false,
      isDesktop: true,
      prefersReducedMotion: false,
    }),
    false
  );

  assert.equal(
    shouldLoadHero3D({
      hasMounted: true,
      isDesktop: false,
      prefersReducedMotion: false,
    }),
    false
  );
});

test("hydrates deferred sections only once they are mounted and near the viewport", () => {
  assert.equal(
    shouldHydrateDeferredSection({
      hasMounted: true,
      isNearViewport: true,
    }),
    true
  );

  assert.equal(
    shouldHydrateDeferredSection({
      hasMounted: false,
      isNearViewport: true,
    }),
    false
  );

  assert.equal(
    shouldHydrateDeferredSection({
      hasMounted: true,
      isNearViewport: false,
    }),
    false
  );
});

test("enables Lenis only on desktop without reduced motion", () => {
  assert.equal(
    shouldEnableLenis({
      isDesktop: true,
      prefersReducedMotion: false,
    }),
    true
  );

  assert.equal(
    shouldEnableLenis({
      isDesktop: false,
      prefersReducedMotion: false,
    }),
    false
  );

  assert.equal(
    shouldEnableLenis({
      isDesktop: true,
      prefersReducedMotion: true,
    }),
    false
  );
});
