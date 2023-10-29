import React from "react";
import "../css/FooterBot.css";
import { Link } from "react-router-dom";

const FooterBot: React.FC = () => {
  return (
    <div className="footer-card">
      <footer>
        <div className="footer">
          <div className="about">
            <div className="logo-set-small">
              <Link to="/">
                <h6>Cozy.com</h6>
              </Link>
            </div>
            <section className="about-p">
              <p>Chúng tôi mang tới những sản phẩm tuyệt vời!</p>
            </section>
          </div>
          <div className="info">
            <h4>Liên kết</h4>
            <nav>
              <ul>
                <li>
                  <a href="/aboutProduct">Sản phẩm</a>
                </li>
                <li>
                  <a href="/aboutUs">Câu chuyện của chúng tôi</a>
                </li>
                <li>
                  <a href="/QnA">Các câu hỏi thường gặp</a>
                </li>
                {/* <li>
                  <a href="">Chính sách đổi trả</a>
                </li> */}
                <li>
                  <a href="http://localhost:4444/admin">
                    Truy cập quyền quản trị
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="contact">
            <h4>Liên hệ</h4>
            <ul className="link-list">
              <li>
                <a href="/contactUs">Để lại lời nhắn</a>
              </li>
              <li>
                <a href="">info@Cozy.com</a>
              </li>
              <li>
                <a href="">www.Cozy.com</a>
              </li>
              <li>
                <a href="">Da Nang City, Vietnam</a>
              </li>
              <li>
                <a href="">+03 3333 333</a>
              </li>
            </ul>
          </div>
          <div className="social">
            <h4>Social</h4>
            <ul className="link">
              <li>
                <i className="fab fa-facebook-f"></i> 22.543 Likes
              </li>
              <li>
                <i className="fab fa-twitter"></i> 12.860 Followers
              </li>
              <li>
                <i className="fab fa-pinterest"></i> 3331 Pins
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterBot;
