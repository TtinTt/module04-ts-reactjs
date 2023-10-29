import React from "react";
import { Container } from "react-bootstrap";
import "../css/Cart.css";

const AboutProduct: React.FC = () => {
  return (
    <>
      <div className="imgPageTop">
        <h1 className="text-center msgPageTop">Sản phẩm của chúng tôi.</h1>
      </div>{" "}
      <br />
      <Container style={{ padding: "50px" }}>
        <div>
          <h2>Khám phá thế giới sản phẩm thủ công của chúng tôi</h2>
          <p>
            Tại cửa hàng của chúng tôi, chúng tôi tự hào giới thiệu đến bạn một
            bộ sưu tập sản phẩm thủ công độc đáo và tinh tế, làm từ sự kết hợp
            hoàn hảo giữa gỗ và resin. Mỗi sản phẩm là một tác phẩm nghệ thuật
            được tạo ra bằng đôi bàn tay khéo léo và tâm huyết của các nghệ
            nhân.
          </p>
          <p>
            Từ những chiếc nhẫn đơn giản và tinh xảo, những vòng cổ thanh lịch
            và cá tính, đến những chiếc vòng đeo tay đầy phong cách và hoa tai
            thu hút ánh nhìn, chúng tôi đem đến cho bạn những sản phẩm độc đáo,
            làm nổi bật cá nhân bạn.
          </p>
          <p>
            Ngoài ra, chúng tôi cũng cung cấp những món đồ trang trí nội thất để
            làm cho không gian sống của bạn thêm ấm cúng và đẹp mắt. Từ những
            chiếc đồng hồ độc đáo, những chiếc đèn ngủ tinh tế, đến những đồ
            trang trí nhỏ như bình hoa và tranh gỗ, chúng tôi mong muốn mang đến
            cho bạn một phong cách sống đậm chất nghệ thuật.
          </p>
          <p>
            Mỗi sản phẩm trong bộ sưu tập của chúng tôi đều được tạo ra với chất
            lượng hoàn thiện cao, từ việc chọn lựa nguyên liệu tốt nhất đến quá
            trình chế tác tỉ mỉ và tỉn mẩn. Chúng tôi cam kết đem đến cho bạn
            những sản phẩm độc đáo và sự hài lòng tuyệt đối.
          </p>
          <p>
            Hãy khám phá và trải nghiệm thế giới nghệ thuật thủ công của chúng
            tôi ngay hôm nay. Hãy chọn cho mình những món đồ yêu thích và biến
            không gian sống của bạn thành một tác phẩm nghệ thuật độc đáo và cá
            nhân.
          </p>
        </div>
      </Container>
    </>
  );
};

export default AboutProduct;
