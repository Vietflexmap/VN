<p align="center">
  <img src="src/images/logo.svg" alt="Vietflex" width="520">
</p>

# Vietflex

Vietflex là thư viện JavaScript mã nguồn mở ưu tiên Việt Nam, được phát triển bởi **Long Ngo** trên nền lõi Leaflet. Bản đồ mặc định hướng đến lãnh thổ Việt Nam và Biển Đông; giao diện nhận diện sử dụng cờ Việt Nam; lớp nền Google được yêu cầu với `language=vi` và `region=VN`.

> Vietflex không trực thuộc Leaflet hay Google. Nhãn, dữ liệu và đường biên trên lớp nền do nhà cung cấp bản đồ trả về. Cấu hình `vi`/`VN` yêu cầu ngôn ngữ và khu vực Việt Nam nhưng không phải lời bảo đảm rằng mọi nhãn sẽ luôn giống nhau ở mọi thời điểm.

## Điểm khác biệt

- Tâm mặc định: Việt Nam và Biển Đông (`[15.8, 109.5]`, zoom `5`).
- Phạm vi điều hướng mặc định: `[[0, 95], [27, 125]]`.
- Huy hiệu góc bản đồ và ghim mặc định mang cờ Việt Nam.
- `VietflexMap` giữ tương thích với API lớp `LeafletMap`.
- Tích hợp Google Map Tiles API chính thức với `language: 'vi'`, `region: 'VN'`.
- Có lớp tương thích cho URL Google `mt0…mt3` theo yêu cầu của dự án.
- Roadmap, satellite, hybrid và terrain.

## Cài đặt

```bash
npm install vietflex
```

```js
import {vietflexMap, Marker} from 'vietflex';
import 'vietflex/styles.css';

const map = vietflexMap('map', {
  googleApiKey: 'YOUR_GOOGLE_MAPS_PLATFORM_KEY',
  googleMapType: 'roadmap'
});

new Marker([21.0285, 105.8542])
  .bindPopup('Hà Nội')
  .addTo(map);
```

Google Maps Platform phải bật **Map Tiles API**, có thanh toán và giới hạn khóa theo miền. Không đưa khóa bí mật phía máy chủ vào mã trình duyệt.

## Chế độ tương thích với URL Google cũ

Đoạn cấu hình dưới đây tương ứng với mẫu `L.tileLayer(...)` được yêu cầu, đồng thời dùng HTTPS và bổ sung tiếng Việt/khu vực Việt Nam:

```js
import {vietflexMap} from 'vietflex';

const map = vietflexMap('map', {
  useLegacyGoogleTiles: true,
  googleMapType: 'roadmap'
});
```

Hoặc tạo lớp trực tiếp:

```js
import {legacyGoogleTiles} from 'vietflex';

const googleStreets = legacyGoogleTiles({mapType: 'roadmap'});
googleStreets.addTo(map);
```

URL được tạo:

```text
https://{s}.google.com/vt/lyrs=m&hl=vi&gl=VN&x={x}&y={y}&z={z}
```

`google.com/vt` không phải endpoint Map Tiles API được Google công bố cho bên thứ ba; nó có thể thay đổi hoặc ngừng hoạt động. Vì vậy Vietflex không bật chế độ này nếu người dùng chưa chủ động đặt `useLegacyGoogleTiles: true`. Với sản phẩm dùng lâu dài, hãy dùng `googleApiKey` và API chính thức.

## Các kiểu bản đồ

| Giá trị | Kết quả |
| --- | --- |
| `roadmap` | Bản đồ đường phố |
| `satellite` | Ảnh vệ tinh |
| `hybrid` | Ảnh vệ tinh kèm lớp đường/nhãn |
| `terrain` | Địa hình |

## Tùy chọn VietflexMap

| Tùy chọn | Mặc định | Ý nghĩa |
| --- | --- | --- |
| `googleMaps` | `true` | Tự thêm lớp nền Google |
| `googleApiKey` | `null` | Khóa Map Tiles API chính thức |
| `googleMapType` | `roadmap` | Kiểu lớp nền |
| `useLegacyGoogleTiles` | `false` | Chủ động dùng endpoint tương thích |
| `center` | `[15.8, 109.5]` | Tâm ban đầu |
| `zoom` | `5` | Mức thu phóng ban đầu |
| `maxBounds` | `[[0,95],[27,125]]` | Phạm vi Việt Nam–Biển Đông |

Nếu không dùng Google, đặt `googleMaps: false` rồi thêm bất kỳ `TileLayer`, PMTiles hoặc lớp dữ liệu hợp lệ nào khác.

## Phát triển

```bash
npm ci
npm run build
npm run lint
npm test -- --run
```

CI kiểm tra build, lint, SSR và trình duyệt. Mỗi bản phát hành nên có tag SemVer (`v1.0.0`) và ghi thay đổi trong `CHANGELOG.md`.

## Bản quyền và giấy phép

- Lõi dẫn xuất từ Leaflet giữ giấy phép BSD-2-Clause và thông báo bản quyền gốc trong `LICENSE`.
- Phần bổ sung riêng của Vietflex do Long Ngo phát triển được cấp phép MIT trong `LICENSE-VIETFLEX`.
- Logo Google, dữ liệu và ảnh bản đồ không nằm trong giấy phép mã nguồn của Vietflex. Người triển khai phải tuân thủ điều khoản và yêu cầu ghi nguồn của Google Maps Platform.

Xem `NOTICE` để biết ranh giới giấy phép và ghi công đầy đủ.
