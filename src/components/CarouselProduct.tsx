import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../imgs/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { inputSearchBox } from "../actions/productAction";
import { useEffect, useState } from "react";
import "./../css/CarouselProduct.css";
import Image from "react-bootstrap/Image";
import productApi from "../apis/product.api";
import {
  TruncateString,
  CheckLink,
  useGetTagsProducts,
  // fetchProductsByTags,
  Changedot,
  prependLocalhost,
} from "../function/functionData";
import UserButton from "./UserButton";
import Carousel from "react-bootstrap/Carousel";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { Product } from "../types-unEdit/Product";
type SearchResult = {
  tag: string;
  data: Product[];
};

function CarouselProduct() {
  const link = CheckLink();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [index, setIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number): void => {
    setIndex(selectedIndex);
  };

  const getRandomElement = <T,>(array: T[]): T | null => {
    if (array.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const getTag = async (): Promise<void> => {
    setLoading(true);

    try {
      const data = await productApi.getTag({});
      console.log("1-lấy các tag", data.tags);
      setTagsProducts(data.tags);
      await fetchProductsByTags(data.tags);
      console.log("data.tags", data.tags);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      console.log(error.response?.statusText);
    }
  };

  const [tagsProducts, setTagsProducts] = useState<string[]>([]);

  useEffect(() => {
    getTag();
  }, []);

  const fetchProductsByTags = async (
    listCatalogueByTag: string[]
  ): Promise<void> => {
    const promises: Promise<SearchResult | null>[] = listCatalogueByTag.map(
      async (tag) => {
        try {
          const data = await productApi.searchProducts({
            name: "",
            page: 1,
            limit: 8,
            maxPrice: null,
            sortType: 0,
            category: tag,
          });
          return { tag, data: data.records };
        } catch (error: any) {
          console.log(error);
          console.log(error.response?.statusText);
          return null;
        }
      }
    );

    const results = await Promise.all(promises);
    const resultMap: Record<string, Product[]> = {};
    results.forEach((result) => {
      if (result?.data) {
        resultMap[result.tag] = result.data;
      }
    });

    setProductsByTags(resultMap);
    console.log("result", resultMap);
  };

  const [productsByTags, setProductsByTags] = useState<
    Record<string, Product[]>
  >({});

  // let productsByTags = fetchProductsByTags();

  // lấy ra các array là list product từ products trên store theo từng tag

  const carouselItem = tagsProducts.map((tag) => {
    if (loading) {
      return <h5 className="text-center msgCartTop">Loading...</h5>;
    } else {
      const productsForTag = productsByTags[tag.toString().toLowerCase()];

      // Thêm điều kiện kiểm tra
      if (!productsForTag || productsForTag.length === 0) {
        return null; // Không trả về gì cả nếu không có sản phẩm cho tag này
      }
      // const productsForTag = fetchProducts(tag.toString().toLowerCase());
      let productShow = getRandomElement(productsForTag);

      if (!productShow) {
        return null; // Không trả về gì nếu không có sản phẩm được chọn
      }
      // console.log(productShow);
      if (productShow && productsByTags) {
        return (
          <Carousel.Item key={productShow.product_id} className="CarouselItem">
            <ProductCard
              screen={prependLocalhost(productShow.img[0]) ?? ""}
              product={productShow}
            />
            <Carousel.Caption>
              <h4 className="CarouselProductText">{productShow.name}</h4>
              <h4 className="CarouselProductText ">
                {Changedot(productShow.price)}
                {productShow.comparative > productShow.price && (
                  <>
                    {" "}
                    <s
                      style={{
                        paddingLeft: "5px",
                        color: "#DADADA",
                        fontWeight: "400",
                      }}
                    >
                      {Changedot(productShow.comparative)}
                    </s>
                    <span
                      style={{
                        paddingLeft: "5px",
                        color: "#FFA500",
                        fontWeight: "400",
                      }}
                    >
                      {"(Giảm giá "}
                      {(
                        100 -
                        (productShow.price / productShow.comparative) * 100
                      ).toFixed(0)}
                      {"%)"}
                    </span>
                  </>
                )}
              </h4>
            </Carousel.Caption>
          </Carousel.Item>
        );
      } else {
        return null;
      }
    }
  });

  const cataloguelItem = tagsProducts.map((tag) => {
    if (loading) {
      return <h5 className="text-center msgCartTop">Loading...</h5>;
    } else {
      const productsForTag = productsByTags[tag.toString().toLowerCase()];

      // Thêm điều kiện kiểm tra
      if (!productsForTag || productsForTag.length === 0) {
        return null; // Không trả về gì cả nếu không có sản phẩm cho tag này
      }

      let productShow = getRandomElement(productsForTag);

      if (!productShow) {
        return null; // Không trả về gì nếu không có sản phẩm được chọn
      }
      if (productsForTag && productsForTag.length > 0) {
        productShow = getRandomElement(productsForTag);
      }
      let urlLink = "/" + tag;
      let lastItem = productShow ? productShow.img.length - 1 : 0;
      if (productShow && productsByTags) {
        return (
          <div
            // href={urlLink}
            onClick={() => {
              navigate(urlLink);
            }}
            className="imgCatalogue"
            style={{
              backgroundImage: `url(${prependLocalhost(
                productShow.img[lastItem]
              )})`,
            }}
          >
            <p>Bộ sưu tập</p>
            <h4>{tag.toLocaleUpperCase()}</h4>
          </div>
        );
      } else {
        return null;
      }
    }
  });

  if (loading && productsByTags) {
    return <h5 className="text-center msgCartTop">Loading...</h5>;
    // Thay "Loading..." bằng spinner hoặc hình ảnh gif loader
  } else {
    return (
      <div id="bundleCarouselAndCatalouge">
        <Carousel
          fade
          id="carouselScreen"
          activeIndex={index}
          onSelect={handleSelect}
        >
          {carouselItem}
        </Carousel>

        <div id="catalogueScreen"> {cataloguelItem}</div>
      </div>
    );
  }
}

export default CarouselProduct;
