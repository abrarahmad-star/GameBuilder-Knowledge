# Tool Testing

What UI Builder learned in this project (2026-11-18).

- Panels: `no internet.png` (905x566) = No Internet popup frame; `policy.png` (1161x678) = Privacy/Welcome popup frame; `settong popup.png` (1387x819) = Settings popup frame. All three are the same blue-header/dark-body frame at different proportions, so pick by width:height.
- Panels: `panel props.png` (614x634, plain dark navy, no header) = the "NEW ITEM" buy card on the props/shelf screen (BuyPanelRef); `BuyPanelBG.png` (blue starburst glow) = glow behind the item inside that card.
- Panels: `port.png` / `market.png` / `glitch.png` (717x594, rounded-TV shape) are TV-screen pictures for the Environment Unlocked screen (sits on the black screen of `env-unlock-bg`); glitch = locked/unknown state. Not for env-select cards (those cards come whole in the atlas with the picture baked in).
- Panels: `dummy logo.png` (Silly Justice logo) fits no in-game screen in this set; keep for a splash/title screen.
- Atlas sprite numbers are not the Preview box numbers: the box label is the list index, the sprite name (e.g. `atlas-1_43b`) comes from the Preview list line. Always map by the list, not the drawn number.
- Backgrounds: `env-selc-bg` → env select, `shop-bg` → shop, `hostage-hit-bg` → hostage hit, `env-unlock-bg 1920x1080` → environment unlocked (TV with empty black screen). HUD/eliminated/revive/popups sit over gameplay: no background, dim 0.3–0.6 for popups.
- Two mockups can be the same picture under different names (BuyPanelRef.png = image (5).png); give both the same layout.
- Panel "BuyPanelBG" (512×492) was used on: BuyPanelRef, image (5).
- Panel "no internet" (905×566) was used on: no internet.
- Panel "panel props" (614×634) was used on: BuyPanelRef, image (5).
- Panel "policy" (1161×678) was used on: privacy.
- Panel "port" (717×594) was used on: unlock env.
- Panel "settong popup" (1387×819) was used on: settinng.
- Screen "BuyPanelRef" (screen): 14 elements, matched its mockup 92%.
- Screen "eliminated" (screen): 6 elements, matched its mockup 75%.
- Screen "env selc" (screen): 16 elements, matched its mockup 90%.
- Screen "hostage" (screen): 7 elements, matched its mockup 92%.
- Screen "hud" (hud): 16 elements, matched its mockup 93%.
- Screen "image (5)" (screen): 14 elements, matched its mockup 92%.
- Screen "no internet" (popup): 6 elements, matched its mockup 98%.
- Screen "privacy" (popup): 8 elements, matched its mockup 96%.
- Screen "revive" (popup): 9 elements, matched its mockup 90%.
- Screen "settinng" (popup): 35 elements, matched its mockup 97%.
- Screen "shop" (screen): 50 elements, matched its mockup 98%.
- Screen "unlock env" (screen): 12 elements, matched its mockup 97%.
