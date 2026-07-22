# Chính sách bảo mật

Vietflex hỗ trợ nhánh phát hành ổn định mới nhất. Không đăng công khai khóa Google Maps Platform, báo cáo lỗ hổng chưa vá hoặc dữ liệu nhạy cảm trong issue.

Để báo cáo lỗ hổng, hãy dùng **GitHub Security → Report a vulnerability** của repository Vietflex. Báo cáo nên nêu phiên bản, môi trường, cách tái hiện, ảnh hưởng và bản vá đề xuất nếu có.

Khóa API trong ví dụ chỉ là chuỗi giữ chỗ. Khi triển khai, hãy giới hạn khóa theo HTTP referrer, chỉ bật API cần thiết, đặt hạn mức và theo dõi thanh toán trong Google Cloud.
