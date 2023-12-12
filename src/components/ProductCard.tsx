import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartAction";
import {
  TruncateString,
  Changedot,
  CheckLink,
  prependLocalhost,
} from "../function/functionData";
import { State } from "../types-unEdit/StateReducer";
import { Product } from "../types-unEdit/Product";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import Modal from 'react-bootstrap/Modal';
import { Modal } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import "../css/ProductCard.css";
import "./../css/CarouselProduct.css";
import nonProductImg from "../imgs/productImg.png";

interface ProductCardProps {
  screen: string;
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ screen, product }) => {
  const initialImg =
    Array.isArray(product.img) && product.img.length > 0 ? product.img[0] : "";
  const [currentImg, setCurrentImg] = useState(initialImg);

  const userLogined = useSelector(
    (state: State) => state.userReducer.userLogined
  );
  const link = CheckLink();

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentImg(initialImg);
  }, [product]);

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAdd = () => {
    if (userLogined !== null) {
      dispatch(addToCart({ ...product, quantity }));
    } else {
      navigate("/login");
    }
    setShow(false);
    setQuantity(1);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setQuantity(1);
  };
  const handleShow = () => setShow(true);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const renderCarousel =
    Array.isArray(product.img) && product.img.length > 0 ? (
      product.img.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            className="productImgLarger d-block w-100"
            src={prependLocalhost(img) ?? ""}
            onError={(e) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.src = nonProductImg; // Thiết lập src của đối tượng hình ảnh
            }}
          />
        </Carousel.Item>
      ))
    ) : (
      <img
        className="productImgLarger d-block w-100"
        src={nonProductImg}
        onError={(e) => {
          const imgElement = e.target as HTMLImageElement;
          imgElement.src = nonProductImg; // Thiết lập src của đối tượng hình ảnh
        }}
      />
    );

  return (
    <>
      {screen !== "cardProduct" ? (
        <div
          onClick={handleShow}
          style={{ backgroundImage: `url(${screen})` }}
          className="CarouselProductCard"
        >
          {/* <> {console.log(screen)}</> */}
        </div>
      ) : (
        <Card style={{ width: "310px" }} className="ProductCardThumb">
          {
            <div>
              <Card.Img
                onClick={() => {
                  !(product.description.length < 15) && handleShow();
                }}
                className="productImgThumb"
                variant="top"
                src={prependLocalhost(currentImg) ?? nonProductImg}
                onError={(e) => {
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.src = nonProductImg; // Thiết lập src của đối tượng hình ảnh
                }}
                onMouseOver={() => {
                  let item = 1;
                  if (product.img.length < 2) {
                    item = 0;
                  }

                  setCurrentImg(product.img[item]);
                }}
                onMouseOut={() => setCurrentImg(product.img[0])}
              />
            </div>
          }
          <Card.Body>
            <div
              onClick={() => {
                !(product.description.length < 15) && handleShow();
              }}
              // disabled={
              //   product.price < 10000 && product.description.length < 15
              // }
            >
              <OverlayTrigger
                // style={{ width: "320px !importan" }}
                key={"top"}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    <strong>
                      {product.description.length < 15
                        ? "Sản phẩm sắp ra mắt"
                        : product.name}
                    </strong>
                    <br></br>
                    {product.description.length < 15
                      ? "Sản phẩm chưa sẵn sàng để nhận đơn hàng"
                      : TruncateString(product.description, 100) +
                        " Click để xem thông tin sản phẩm."}
                  </Tooltip>
                }
              >
                <div>
                  <Card.Title>
                    <h6
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {product.description.length < 15
                        ? "Sản phẩm sắp ra mắt!"
                        : TruncateString(product.name, 29)}
                    </h6>
                  </Card.Title>
                  <Card.Text>
                    <h6
                      style={{
                        paddingLeft: "5px",
                        color: "#258635",
                        textAlign: "center",
                      }}
                    >
                      {product.description.length < 15
                        ? ""
                        : Changedot(product.price)}
                      {product.comparative > product.price && (
                        <>
                          {" "}
                          <s
                            style={{
                              paddingLeft: "5px",
                              color: "grey",
                              fontWeight: "400",
                            }}
                          >
                            {Changedot(product.comparative)}
                          </s>
                          <span
                            style={{
                              paddingLeft: "5px",
                              color: "#dc3545",
                              fontWeight: "400",
                            }}
                          >
                            {"(Giảm "}
                            {(
                              100 -
                              (product.price / product.comparative) * 100
                            ).toFixed(0)}
                            {"%)"}
                          </span>
                        </>
                      )}
                    </h6>
                  </Card.Text>
                  {/* <Card.Text>{TruncateString(product.description, 50)}</Card.Text> */}
                </div>
              </OverlayTrigger>
            </div>
            <div
              className="noWrap"
              style={{
                justifyContent: "center",
                gap: "15px",
                alignItems: "center",
              }}
            >
              {link == "/" &&
                Array.isArray(product.tag) &&
                product.tag.length > 0 && (
                  <OverlayTrigger
                    // style={{ width: "320px !importan" }}
                    key={"right"}
                    placement={"right"}
                    overlay={
                      <Tooltip id={`tooltip-right`}>
                        Xem các sản phẩm tương tự trong bộ sưu tập{" "}
                        <strong> {product.tag[0].toUpperCase()}</strong>{" "}
                      </Tooltip>
                    }
                  >
                    <Link to={"/" + product.tag[0].toLowerCase()}>
                      <p
                        onClick={handleClose}
                        style={{
                          paddingTop: "15px",
                          color: "grey",
                        }}
                      >
                        Tương tự...
                      </p>
                    </Link>
                  </OverlayTrigger>
                )}

              {
                <Button
                  variant="light"
                  onClick={handleAdd}
                  style={{
                    float: "right",
                  }}
                  disabled={product.description.length < 15}
                >
                  {product.description.length < 15
                    ? "Chưa nhận đặt hàng"
                    : "Thêm vào giỏ hàng"}
                </Button>
              }
            </div>
          </Card.Body>
        </Card>
      )}

      {/* MODAL___________________________________ */}
      {/* MODAL___________________________________ */}
      {/* MODAL___________________________________ */}
      <Modal
        // size="lg"
        show={show}
        onHide={handleClose}
        centered
        // size="lg"
      >
        <Modal.Body
        // closeButton
        >
          <Button
            variant="light"
            onClick={handleClose}
            style={{
              marginBottom: "10px",
              float: "right",
            }}
          >
            X
          </Button>
          <div>
            <Modal.Title>
              <Card.Title>
                <h4
                  style={{
                    textAlign: "center",
                  }}
                >
                  {product.name}
                </h4>
              </Card.Title>
            </Modal.Title>

            <Carousel activeIndex={index} onSelect={handleSelect}>
              {renderCarousel}
            </Carousel>
            <Card.Body>
              <div
                className="noWrap"
                style={{
                  justifyContent: "space-between",
                  gap: "15px",
                  // alignItems: "center",
                }}
              >
                {link == "/" &&
                Array.isArray(product.tag) &&
                product.tag.length > 0 ? (
                  <OverlayTrigger
                    key={"right"}
                    placement={"right"}
                    overlay={
                      <Tooltip id={`tooltip-right`}>
                        Xem các sản phẩm tương tự trong bộ sưu tập{" "}
                        <strong> {product.tag[0].toUpperCase()}</strong>{" "}
                      </Tooltip>
                    }
                  >
                    <Link to={"/" + product.tag[0].toLowerCase()}>
                      <p
                        className="noWrap"
                        style={{
                          paddingTop: "15px",
                          color: "grey",
                          width: "420px !importan",
                        }}
                        onClick={handleClose}
                      >
                        Tương tự...
                      </p>
                    </Link>
                  </OverlayTrigger>
                ) : (
                  <div></div>
                )}
                <Card.Text>
                  <h5
                    style={{
                      padding: "10px 5px 15px 0",
                      textAlign: "right",
                      fontWeight: "600",
                    }}
                  >
                    {product.comparative > product.price && (
                      <>
                        <span
                          style={{
                            paddingLeft: "5px",
                            color: "#dc3545",
                            fontWeight: "200",
                          }}
                        >
                          {"(Giảm giá "}
                          {(
                            100 -
                            (product.price / product.comparative) * 100
                          ).toFixed(0)}
                          {"%)"}
                        </span>
                        <s
                          style={{
                            paddingLeft: "5px",
                            color: "grey",
                            fontWeight: "200",
                          }}
                        >
                          {Changedot(product.comparative * quantity)}
                        </s>
                      </>
                    )}{" "}
                    {Changedot(product.price * quantity)}
                  </h5>
                </Card.Text>
              </div>
              <div
                id="modalFotter"
                className="noWrap"
                style={{
                  justifyContent: "center",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={handleChangeQuantity}
                  min={1}
                />
                <Button
                  style={{ width: "300px" }}
                  variant="light"
                  onClick={handleAdd}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </Card.Body>
            <br></br>
            <Card.Text>
              <p className="text-center">{product.description}</p>
            </Card.Text>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductCard;
