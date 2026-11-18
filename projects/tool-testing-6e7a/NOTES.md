# Tool Testing

What UI Builder learned in this project (2026-11-18).

- In this project the Preview box number equals the sprite suffix (atlas-1_N = list index N), but some price/amount labels were sliced together (atlas-1_14 "$12.99 $6.99 $0.99", atlas-1_3 "+10+500", atlas-1_40 "+100 +500 +100", atlas-1_35 "TOP VALUE + BEST SELLER", "$3.99/REMOVE ADS" spread over atlas-1_43/44/46). The shop layout uses TMP text for these instead; split them in Step 1 if exact art is wanted.
- BuyPanelRef: "NEW" and "ITEM" are two sprites (atlas-2_15, atlas-2_16), so place them as two images. The toaster item in the mockup is in no atlas (props atlas has 16 other props), so the card has no item image; the BuyPanelBG glow stands in its place.
- eliminated: the hooded avatar, the skull counter icon and the yellow starburst behind the banner are not in the atlases. Stand-ins: atlas-2_14 dark circle (avatar), atlas-1_12 target bar (counter), and the banner without its burst.
- Settings: atlas-2_0 (HD) already has its dark rounded square behind it, so it needs no separate icon_bg. atlas-2_7 is the small dark square used behind the music/sound/sensitivity icons.
- Panels used again in project 2: no internet → No Internet popup, policy → privacy, settong popup → settinng, panel props + BuyPanelBG → BuyPanelRef, port → unlock env TV screen. market, glitch and dummy logo were left unused.
- Panel "BuyPanelBG" (512×492) was used on: BuyPanelRef.
- Panel "no internet" (905×566) was used on: no internet.
- Panel "panel props" (614×634) was used on: BuyPanelRef.
- Panel "policy" (1161×678) was used on: privacy.
- Panel "port" (717×594) was used on: unlock env.
- Panel "settong popup" (1387×819) was used on: settinng.
- Screen "BuyPanelRef" (screen): 14 elements, matched its mockup 90%.
- Screen "eliminated" (screen): 8 elements, matched its mockup 75%.
- Screen "env selc" (screen): 18 elements, matched its mockup 90%.
- Screen "hostage" (screen): 7 elements, matched its mockup 90%.
- Screen "hud" (screen): 16 elements, matched its mockup 92%.
- Screen "no internet" (popup): 6 elements, matched its mockup 97%.
- Screen "privacy" (popup): 8 elements, matched its mockup 96%.
- Screen "revive" (popup): 9 elements, matched its mockup 89%.
- Screen "settinng" (popup): 35 elements, matched its mockup 93%.
- Screen "shop" (screen): 50 elements, matched its mockup 95%.
- Screen "unlock env" (screen): 12 elements, matched its mockup 96%.
