import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { createOrder } from "../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, changeQuantity } from "../actions/cartAction";
import { Changedot } from "../function/functionData";
import FloatingLabel from "react-bootstrap/FloatingLabel";
// import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { getCurrentTimeString } from "../function/functionData";
import Modal from "react-bootstrap/Modal";
import "../css/Cart.css";
import { clearCart } from "../actions/userAction";

const QnA: React.FC = () => {
  return (
    <>
      <div className="imgPageTop">
        <h1 className="text-center msgPageTop">Các câu hỏi thường gặp.</h1>
      </div>{" "}
      <br></br>
      <Container style={{ padding: "50px" }}>
        <dl>
          <dt>1. Làm thế nào để đặt hàng trên trang web của chúng tôi?</dt>
          <dd>
            Để đặt hàng, bạn chỉ cần chọn sản phẩm bạn muốn và thêm vào giỏ
            hàng, sau đó tiếp tục quá trình thanh toán.
          </dd>

          <dt>2. Có thể thanh toán bằng cách nào?</dt>
          <dd>
            Chúng tôi chấp nhận các hình thức thanh toán qua thẻ tín dụng,
            chuyển khoản ngân hàng và tiền mặt khi nhận hàng.
          </dd>

          <dt>3. Tôi có thể đổi hoặc trả hàng không?</dt>
          <dd>
            Vui lòng xem chính sách đổi trả hàng của chúng tôi trong mục "Chính
            sách đổi trả".
          </dd>

          <dt>4. Sản phẩm của bạn được làm từ loại gỗ nào?</dt>
          <dd>
            Tất cả sản phẩm của chúng tôi đều được làm từ loại gỗ tự nhiên,
            không gây hại cho sức khỏe và môi trường.
          </dd>

          <dt>5. Làm thế nào để bảo quản sản phẩm gỗ và resin?</dt>
          <dd>
            Bạn nên tránh để sản phẩm tiếp xúc trực tiếp với nước hoặc hóa chất.
            Sử dụng vải mềm không gây trầy xước để lau chùi sản phẩm.
          </dd>

          <dt>6. Có thể yêu cầu làm sản phẩm theo thiết kế riêng không?</dt>
          <dd>
            Chúng tôi chấp nhận đặt hàng theo yêu cầu. Vui lòng liên hệ với
            chúng tôi để thảo luận chi tiết hơn.
          </dd>

          <dt>7. Thời gian giao hàng là bao lâu?</dt>
          <dd>
            Thời gian giao hàng tùy thuộc vào địa điểm và loại sản phẩm, nhưng
            thường không quá 7 ngày làm việc.
          </dd>

          <dt>8. Có cần phải tạo tài khoản để mua hàng không?</dt>
          <dd>
            Cần thiết, bạn sẽ nhận được thông tin ưu đãi và theo dõi đơn hàng dễ
            dàng hơn.
          </dd>

          <dt>9. Tôi có thể mua hàng ở nước ngoài không?</dt>
          <dd>
            Chúng tôi có hỗ trợ giao hàng quốc tế. Chi phí và thời gian giao
            hàng có thể thay đổi tùy theo địa điểm.
          </dd>

          <dt>10. Cửa hàng của bạn mở cửa từ lúc nào đến lúc nào?</dt>
          <dd>
            Trang web của chúng tôi hoạt động 24/7. Còn cửa hàng vật lý mở cửa
            từ 9h sáng đến 9h tối hàng ngày.
          </dd>

          <dt>
            11. Có thể liên hệ với bạn như thế nào nếu tôi có thắc mắc hoặc vấn
            đề cần giải quyết?
          </dt>
          <dd>
            Bạn có thể liên hệ với chúng tôi qua email, số điện thoại hoặc trực
            tiếp tại cửa hàng.
          </dd>

          <dt>12. Có chương trình giảm giá hoặc ưu đãi đặc biệt nào không?</dt>
          <dd>
            Chúng tôi thường có các chương trình ưu đãi và giảm giá. Hãy đăng ký
            nhận tin tức từ chúng tôi để không bỏ lỡ!
          </dd>

          <dt>13. Tôi cần cung cấp thông tin gì khi đặt hàng?</dt>
          <dd>
            Bạn cần cung cấp thông tin về tên, địa chỉ giao hàng, số điện thoại
            liên lạc và hình thức thanh toán.
          </dd>

          <dt>
            14. Tôi có thể theo dõi trạng thái đơn hàng của mình như thế nào?
          </dt>
          <dd>
            Bạn có thể theo dõi trạng thái đơn hàng của mình bằng cách đăng nhập
            vào tài khoản và kiểm tra trong mục "Đơn hàng của tôi".
          </dd>

          <dt>15. Tôi có thể huỷ đơn hàng của mình không?</dt>
          <dd>
            Bạn có thể huỷ đơn hàng trong vòng 4 giờ sau khi đặt hàng. Vui lòng
            liên hệ với chúng tôi nếu bạn muốn huỷ đơn hàng.
          </dd>
        </dl>
      </Container>
    </>
  );
};

export default QnA;
