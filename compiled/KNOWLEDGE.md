# GameBuilder Knowledge (compiled)

Built from 1 project(s): tool-testing-6e7a.

## Lessons (most often seen first)
- Templates from knowledge put the green atlas-1_29 on every button; check each button's colour against the mockup: blue = atlas-2_48, yellow big = atlas-2_53, lime big = atlas-2_54, yellow small = atlas-1_31, green wide with price = atlas-1_30.
- The settings sliders and quality picker come from atlas-2: track atlas-2_24, fill atlas-2_25, picker bg atlas-2_26, toggle off atlas-2_36, toggle on atlas-2_30 (Medium starts on, its label dark #2B3A55).
- The plain coin box (no "+") is the black bar inside atlas-1_0; it was added as its own overlapping sprite atlas-1_52 so the HUD's atlas-1_0 (box + plus) stays whole. Splitting atlas-1_0 would break the HUD.
- Shop labels come fused in one cut: "+10+500" (atlas-1_3, split at 110), "$12.99 $6.99 $0.99" (atlas-1_14), "+1100 +2750" (atlas-1_37), "+100 +500 +100" (atlas-1_40), "TOP VALUE / BEST SELLER" (atlas-1_35); "$ 3" sat on top of "REMOVE" in atlas-1_43 (split horizontally, then merged with ".99" and "ADS"). "MINI"+"PACK" and "NEW"+"ITEM" are merged word pieces.
- Locked environment cards get a dark shade: atlas-1_23 (black gradient that fades to transparent at the bottom).
- The HUD needs showOnStart: true; the env button opens env-selc, the cash "+" opens shop, everything else in these screens is "none" (game logic) or closes by its back/close id.
- Screens drawn over the live game (eliminated, revive) top out around 75-90% match because the mockup's 3D scene is not UI; don't chase that score.
- Panel "BuyPanelBG" (512×492) was used on: BuyPanelRef.
- Panel "no internet" (905×566) was used on: no internet.
- Panel "panel props" (614×634) was used on: BuyPanelRef.
- Panel "policy" (1161×678) was used on: privacy.
- Panel "port" (717×594) was used on: unlock env.
- Panel "settong popup" (1387×819) was used on: settinng.
- Screen "BuyPanelRef" (screen): 14 elements, matched its mockup 92%.
- Screen "eliminated" (screen): 8 elements, matched its mockup 75%.
- Screen "env selc" (screen): 18 elements, matched its mockup 95%.
- Screen "hostage" (screen): 7 elements, matched its mockup 92%.
- Screen "hud" (hud): 16 elements, matched its mockup 93%.
- Screen "no internet" (popup): 6 elements, matched its mockup 98%.
- Screen "privacy" (popup): 8 elements, matched its mockup 96%.
- Screen "revive" (popup): 9 elements, matched its mockup 90%.
- Screen "settinng" (popup): 35 elements, matched its mockup 97%.
- Screen "shop" (screen): 50 elements, matched its mockup 98%.
- Screen "unlock env" (screen): 12 elements, matched its mockup 97%.

## Screens seen
- **BuyPanelRef** (screen), 1 project(s), 14 elements in the latest layout
- **eliminated** (screen), 1 project(s), 8 elements in the latest layout
- **env selc** (screen), 1 project(s), 18 elements in the latest layout
- **hostage** (screen), 1 project(s), 7 elements in the latest layout
- **hud** (hud), 1 project(s), 16 elements in the latest layout
- **no internet** (popup), 1 project(s), 6 elements in the latest layout
- **privacy** (popup), 1 project(s), 8 elements in the latest layout
- **revive** (popup), 1 project(s), 9 elements in the latest layout
- **settinng** (popup), 1 project(s), 35 elements in the latest layout
- **shop** (screen), 1 project(s), 50 elements in the latest layout
- **unlock env** (screen), 1 project(s), 12 elements in the latest layout

## Panels (whole images) and the screens they went on
- BuyPanelBG (512×492) → BuyPanelRef
- dummy logo (546×278) → unused
- glitch (717×594) → unused
- market (717×594) → unused
- no internet (905×566) → no internet
- panel props (614×634) → BuyPanelRef
- policy (1161×678) → privacy
- port (717×594) → unlock env
- settong popup (1387×819) → settinng

Sprites known by fingerprint: 112 (2 with a name).
