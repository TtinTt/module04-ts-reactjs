import React from "react";

import { Container } from "react-bootstrap";

import "../css/Cart.css";

const AboutUs: React.FC = () => {
  return (
    <>
      <div className="imgPageTop">
        <h1 className="text-center msgPageTop">Câu chuyện của chúng tôi.</h1>
      </div>
      <Container style={{ padding: "50px" }}>
        <p>
          "Chỉ cần bước chân vào cửa hàng của chúng tôi, bạn sẽ như lạc vào một
          thế giới nghệ thuật thủ công đầy màu sắc, sự tinh tế và phong cách.
        </p>
        <br></br>
        <p>
          Khởi nguồn từ sự đam mê với nghệ thuật, chúng tôi đã khắc lên từng sản
          phẩm handmade những câu chuyện riêng biệt, khắc dấu ấn của thợ làm thủ
          công với trái tim đầy nhiệt huyết. Sản phẩm của chúng tôi không chỉ là
          đồ trang sức hay đồ trang trí, mà còn là những tác phẩm nghệ thuật nhỏ
          gọn có thể đồng hành cùng bạn mỗi ngày.
        </p>
        <br></br>
        <p>
          Dựa trên nguyên liệu tự nhiên là gỗ và resin, chúng tôi đã tạo ra
          những vòng cổ, nhẫn, vòng đeo tay, hoa tai độc đáo và đầy tính nghệ
          thuật. Mỗi sản phẩm không chỉ thể hiện sự kết hợp hoàn hảo giữa gỗ và
          resin, mà còn mang những hình ảnh, màu sắc đặc biệt, phản ánh cá nhân
          bạn.
        </p>
        <br></br>
        <p>
          Ngoài ra, chúng tôi còn cung cấp những món đồ trang trí nội thất đặc
          sắc như đồng hồ, đèn ngủ... Chúng không chỉ làm cho không gian sống
          của bạn thêm ấm cúng, mà còn đem đến một nét riêng, một cái nhìn mới
          mẻ cho ngôi nhà của bạn.
        </p>
        <br></br>
        <p>
          Chúng tôi tự hào vì mỗi sản phẩm của chúng tôi không chỉ là sản phẩm
          thủ công chất lượng cao, mà còn đóng góp vào việc bảo tồn di sản thủ
          công truyền thống, nâng cao giá trị nghệ thuật trong cuộc sống hằng
          ngày.
        </p>
        <br></br>
        <p>
          Hãy đến với cửa hàng của chúng tôi, để cùng khám phá và chia sẻ những
          câu chuyện đằng sau từng sản phẩm, để cùng tìm thấy chút hồn nghệ
          thuật trong không gian sống và phong cách của bạn."
        </p>
      </Container>
    </>
  );
};

export default AboutUs;
