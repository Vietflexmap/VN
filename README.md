<div align="center">

<img src="src/images/logo.svg" alt="Vietflex" width="520">

# Vietflex

### Vietnam-first interactive cartography for the open web

[![Version](https://img.shields.io/badge/version-1.0.0-087443?style=flat-square)](./CHANGELOG.md)
[![JavaScript](https://img.shields.io/badge/JavaScript-ESM%20%7C%20UMD-ffcd00?style=flat-square&logo=javascript&logoColor=111)](./dist)
[![License](https://img.shields.io/badge/license-BSD--2--Clause%20%2B%20MIT-da251d?style=flat-square)](./LICENSE)
[![Preprint](https://img.shields.io/badge/preprint-open%20HTML-087443?style=flat-square)](./preprint.html)
[![Security](https://img.shields.io/badge/security-policy-17211b?style=flat-square&logo=github)](./SECURITY.md)

[🌐 Live Demo](https://htmlpreview.github.io/?https://github.com/Vietflexmap/VN/blob/main/2c667178-1bce-48c2-b240-1c23f68b8ac9.html) · [📄 Open Preprint](https://htmlpreview.github.io/?https://github.com/Vietflexmap/VN/blob/main/preprint.html) · [🛡️ Security](./SECURITY.md) · [📜 Licenses](#license-and-attribution)

**English** · [Tiếng Việt](#tóm-tắt-tiếng-việt)

</div>

> [!NOTE]
> Vietflex is an independent open-source project developed by **Long Ngo**. It is not affiliated with Leaflet or Google. Language and region parameters request localized output; labels, boundaries, imagery, availability, and service behavior remain controlled by the selected provider.

## Overview

Vietflex is a lightweight JavaScript mapping interface built on the Leaflet interaction model and configured for Vietnam-oriented applications. It provides a Vietnam–East Sea starting view, localized controls and identity, Google layer adapters with Vietnamese language and Vietnam region preferences, and a familiar API for markers, layers, and controls.

The project distinguishes two integration paths:

- **Official Google Map Tiles API** — recommended for production; requires a valid API key, billing, key restrictions, and provider-compliant attribution.
- **Legacy compatibility tiles** — explicitly opt-in through `useLegacyGoogleTiles: true`; convenient for compatibility testing but not a documented public third-party Google Maps Platform endpoint.

## Highlights

| 🇻🇳 Vietnam-first defaults | 🧩 Familiar developer API | 🔬 Reproducible delivery |
| --- | --- | --- |
| Center `[15.8, 109.5]`, zoom `5`, and navigation bounds `[[0,95],[27,125]]`. | `VietflexMap` follows Leaflet conventions; `Marker`, controls, and layers remain recognizable. | Commit-pinned CDN assets prevent silent changes from mutable branch references and caches. |
| Vietnamese UI identity and Vietnam regional preferences. | Roadmap, satellite, hybrid, and terrain modes. | Build, lint, SSR, and browser checks are part of the development workflow. |

## Quick start

Copy this HTML into a file and open it in a browser:

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Vietflex map</title>

  <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/Vietflexmap/VN@6144d565fcf236727577ab3c4471bbe49f86892f/dist/vietflex.css">
  <script src="https://cdn.jsdelivr.net/gh/Vietflexmap/VN@6144d565fcf236727577ab3c4471bbe49f86892f/dist/vietflex.js"></script>

  <style>#map { height: 600px; }</style>
</head>
<body>
  <div id="map"></div>
  <script>
    const map = Vietflex.vietflexMap('map', {
      useLegacyGoogleTiles: true,
      googleMapType: 'roadmap',
      zoomControl: false,
      attributionControl: false
    });

    new Vietflex.ZoomControl({position: 'topleft'}).addTo(map);
    new Vietflex.AttributionControl({position: 'bottomright'}).addTo(map);

    new Vietflex.Marker([21.0285, 105.8542])
      .bindPopup('Hà Nội')
      .addTo(map);
  </script>
</body>
</html>
```

The global `Vietflex` object follows the familiar Leaflet-style pattern:

```js
const map = Vietflex.vietflexMap('map');
const marker = new Vietflex.Marker([21.0285, 105.8542]);
```

## Pinned CDN assets

| Asset | Immutable URL |
| --- | --- |
| CSS | `https://cdn.jsdelivr.net/gh/Vietflexmap/VN@6144d565fcf236727577ab3c4471bbe49f86892f/dist/vietflex.css` |
| JavaScript UMD | `https://cdn.jsdelivr.net/gh/Vietflexmap/VN@6144d565fcf236727577ab3c4471bbe49f86892f/dist/vietflex.js` |
| JavaScript ESM | `https://cdn.jsdelivr.net/gh/Vietflexmap/VN@6144d565fcf236727577ab3c4471bbe49f86892f/dist/vietflex.esm.js` |

These URLs are pinned to commit `6144d565fcf236727577ab3c4471bbe49f86892f`, which includes the duplicate-control fix. Pinning avoids unexpected changes from `@main` and CDN caching.

> [!IMPORTANT]
> The `vietflex` package has not been published to npm. `npm install vietflex` and unpkg package URLs are therefore not currently supported. The links above point only to files that exist in this repository.

## Map providers

### Official Google Maps Platform

For production use, enable **Map Tiles API**, configure billing, and restrict the API key by HTTP referrer and API. Never embed server-side secrets in browser code. See Google's current terms and attribution requirements before deployment.

### Legacy compatibility mode

```js
const map = Vietflex.vietflexMap('map', {
  useLegacyGoogleTiles: true,
  googleMapType: 'roadmap'
});
```

Or add the layer directly:

```js
const map = Vietflex.vietflexMap('map', {googleMaps: false});
const streets = Vietflex.legacyGoogleTiles({mapType: 'roadmap'});
streets.addTo(map);
```

The compatibility adapter generates this pattern:

```text
https://{s}.google.com/vt/lyrs=m&hl=vi&gl=VN&x={x}&y={y}&z={z}
```

> [!WARNING]
> `google.com/vt` is not documented by Google as a public Map Tiles API for third-party applications. It may change or stop working. Vietflex enables it only when the application explicitly sets `useLegacyGoogleTiles: true`.

### Application-supplied layers

Set `googleMaps: false` and add any valid tile, PMTiles, raster, vector, or application data layer supported by your implementation.

## Configuration

| Option | Default | Description |
| --- | --- | --- |
| `googleMaps` | `true` | Automatically add a Google base layer. |
| `googleApiKey` | `null` | Key for the official Map Tiles API path. |
| `googleMapType` | `roadmap` | Base-map mode. |
| `useLegacyGoogleTiles` | `false` | Explicitly enable the compatibility endpoint. |
| `center` | `[15.8, 109.5]` | Initial map center. |
| `zoom` | `5` | Initial zoom level. |
| `maxBounds` | `[[0,95],[27,125]]` | Default Vietnam–East Sea navigation envelope. |

Supported `googleMapType` values:

| Value | Result |
| --- | --- |
| `roadmap` | Street map |
| `satellite` | Satellite imagery |
| `hybrid` | Satellite imagery with roads and labels |
| `terrain` | Terrain view |

## Open preprint

The four-page English manuscript describes Vietflex's design, architecture, reproducibility, security model, limitations, and open-science declarations.

- [Read the visual HTML preprint](https://htmlpreview.github.io/?https://github.com/Vietflexmap/VN/blob/main/preprint.html)
- [View the source](./preprint.html)
- Use **Print / Save PDF** in the preprint for an A4-formatted copy.

### Suggested citation

```bibtex
@software{ngo2026vietflex,
  author  = {Ngo, Long},
  title   = {Vietflex: Vietnam-First Interactive Cartography for the Open Web},
  year    = {2026},
  version = {1.0.0},
  url     = {https://github.com/Vietflexmap/VN}
}
```

> [!CAUTION]
> The manuscript is an open preprint and has not undergone formal peer review. It reports a software design analysis, not an empirical benchmark or an authoritative administrative-boundary validation.

## Development

```bash
npm ci
npm run build
npm run lint
npm test -- --run
```

CI checks build, lint, server-side rendering, and browser behavior. Releases should use semantic-version tags such as `v1.0.0` and record changes in `CHANGELOG.md`.

## Security

Please do not publish API keys, sensitive data, or unpatched vulnerability details in a public issue. Follow [SECURITY.md](./SECURITY.md) and use **GitHub Security → Report a vulnerability** for private disclosure.

## License and attribution

- The Leaflet-derived core retains its BSD-2-Clause license and original notices in [LICENSE](./LICENSE).
- Vietflex-specific additions by Long Ngo are licensed under MIT in [LICENSE-VIETFLEX](./LICENSE-VIETFLEX).
- Google logos, imagery, map data, and services are not covered by the Vietflex software licenses. Deployers must follow the applicable Google Maps Platform terms and attribution requirements.
- See [NOTICE](./NOTICE) for the full attribution and licensing boundary.

## Tóm tắt tiếng Việt

Vietflex là thư viện JavaScript mã nguồn mở do **Long Ngo** phát triển, sử dụng mô hình tương tác quen thuộc của Leaflet và bổ sung cấu hình ưu tiên cho Việt Nam. Thư viện cung cấp tâm bản đồ Việt Nam–Biển Đông, giao diện nhận diện Việt Nam, tùy chọn lớp nền Google với ngôn ngữ tiếng Việt và khu vực Việt Nam, cùng cơ chế ghim phiên bản CDN để triển khai ổn định.

Tham số `vi`/`VN` chỉ yêu cầu nhà cung cấp trả về nội dung theo ngôn ngữ và khu vực mong muốn; Vietflex không kiểm soát và không bảo đảm mọi nhãn, ranh giới hoặc ảnh bản đồ của bên thứ ba. Khi triển khai chính thức, cần sử dụng API phù hợp, giới hạn khóa, tuân thủ điều khoản và hiển thị ghi nguồn đầy đủ.

---

<div align="center">

Developed by **Long Ngo** · Open source · © 2026

[Back to top](#vietflex)

</div>
