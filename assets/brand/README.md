# Memoires logo set

Approved direction: open journal pages suggesting an M, with an amber bookmark.
The master has been reconstructed as editable paths from the approved visual proposal.
The wordmark uses an outlined Georgia composition; no font installation is needed to use the exported files.

## Files

- `mark.svg`: editable symbol master.
- `wordmark.svg`: outlined name master.
- `exports/symbol-*`: symbol with clear space.
- `exports/wordmark-*`: name alone.
- `exports/logo-horizontal-*`: symbol beside name.
- `exports/logo-stacked-*`: symbol above name.
- Each composition comes in light, dark, black and white versions, as SVG, transparent PNG and vector PDF.
- `exports/appicon-*`: square icon masters with opaque backgrounds. iOS applies the corner mask.
- `exports/icons/{light,dark,tinted}`: PNGs at 20, 29, 40, 48, 58, 60, 64, 76, 80, 87, 120, 128, 152, 167, 180, 192, 256, 512 and 1024 px.
- `exports/favicon.svg`: adaptive light/dark favicon; PNG and ICO fallbacks are included.
- `exports/apple-touch-icon.png`: 180 px web clip icon.
- `preview.png`: visual reference and small-size comparison.

`light` means dark artwork for light surfaces. `dark` means ivory artwork for dark surfaces.
Transparent white artwork and white PDFs need a dark surface behind them; a white PDF viewer page can make them look empty.

## Colour and usage

| Role | sRGB |
| --- | --- |
| Charcoal artwork | `#171C20` |
| Dark icon surface | `#11161B` |
| Ivory | `#F6F4EF` |
| Decorative amber bookmark | `#DBA439` |

Keep the supplied proportions and clear space. Do not stretch, add shadows, rotate or redraw the mark.
Use the symbol alone for small icons. Use the name compositions at widths of at least 160 px horizontally or 140 px stacked; below those widths use the symbol and accessible live text.
The 16 px favicon is a small-size recognition fallback: the bookmark is not intended to carry separate meaning at that size.
Use monochrome artwork for single-ink applications. The tinted iOS version uses grayscale values for system tinting.

## Integration

- iOS `AppIcon`: 1024 px light, dark and tinted appearances.
- iOS `AppLogo`: adaptive light/dark image used by welcome and empty states.
- PDF exports explicitly resolve the light appearance for both header and footer.
- Web: navigation, download section, footers, privacy and terms pages; adaptive icons, favicons, Apple touch icon and social metadata.
- `Assets/logo.png` and `Assets/logo_nobg.png` remain compatible convenience paths.

Historical screenshots and the original `Assets/logo.pxd` are retained as archival source material. They are not used as active brand assets.

## Regeneration

Run `node Assets/Brand/generate.mjs` with the `sharp` package available. If necessary, set `MEMOIRES_SHARP` to its installed package directory.
The script exports directly from the vector masters and updates the iOS and common asset paths.
Export each composition SVG to PDF with Inkscape, preserving the document artboard and vectors.
The ZIP includes the sources, all exports and this guide.

## Validation

The iOS simulator build and website production build passed. Icon dimensions, RGB opacity, transparent PNGs, path-only wordmarks and vector-only PDFs were checked, and the light/dark preview was reviewed.
Publication to the App Store requires a subsequent app release; replacing the project assets does not update an already installed version.
