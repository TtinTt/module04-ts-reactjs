import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ProductCard from "./ProductCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import { addToCart } from "../actions/cartAction";
import productApi from "../apis/product.api";
import {
  HandleFilter,
  useGetTagsProducts,
  useGetProductsByTags,
  CheckLink,
} from "../function/functionData";

import { Product, ProductState } from "../types-unEdit/Product";
import { State } from "../types-unEdit/StateReducer";

const ProductList: FC = () => {
  const dispatch = useDispatch();

  const productListStore = useSelector<State, ProductState["products"]>(
    (state) => state.productReducer.products
  );

  let link: string | null = null;
  let checkLink = CheckLink();
  let productListDraft: Product[] = [];
  if (checkLink === "/") {
    productListDraft = productListStore;
  } else {
    link = checkLink
      .substring(1)
      .replace(/\s/g, "")
      .toLocaleLowerCase()
      ?.toString()
      .trim();
    // productListDraft = productsByTags[link];
  }

  const [productDescription, setProductDescription] = useState<string>("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchFilterInput, setSearchFilterInput] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortType, setSortType] = useState<number>(0);

  const fetchProducts = async () => {
    await productApi
      .searchProducts({
        name: searchFilter,
        page: currentPage,
        limit: productsPerPage,
        maxPrice: priceFromValue,
        sortType: sortOption,
        category: link,
      })
      .then((data: any) => {
        setProductList(data.records);
        setTotal(data.total);
      })
      .catch((error: any) => {
        console.log(error);
        if (error.response?.status === 401) {
          console.log(error.response?.statusText);
        } else {
          console.log(error.response?.statusText);
        }
      });
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;
  const [keyWordSearch, setKeyWordSearch] = useState<string>("");

  let searchFilter: string =
    useSelector<State, ProductState["searchFilter"]>(
      (state) => state.productReducer.searchFilter
    ) ?? "";

  let sortOption: number =
    useSelector<State, ProductState["sort"]>(
      (state) => state.productReducer.sort
    ) ?? 0;

  let priceFromValue: number | null =
    useSelector<State, ProductState["priceFrom"]>(
      (state) => state.productReducer.priceFrom
    ) ?? null;

  useEffect(() => {
    fetchProducts();
  }, [searchFilter, currentPage, priceFromValue, sortOption, link]);

  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;

  const renderProducts = productList.map((product: Product, index: number) => {
    return (
      <Col key={index}>
        <ProductCard screen={"cardProduct"} product={product} />
      </Col>
    );
  });

  const totalPages: number = Math.ceil(total / productsPerPage);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const description: string = `Đang hiển thị sản phẩm thứ ${
      indexOfFirstProduct + 1
    } đến ${
      indexOfLastProduct > total ? total : indexOfLastProduct
    } trong tổng số ${total} sản phẩm`;
    setProductDescription(description);
  }, [currentPage, productList, indexOfFirstProduct, indexOfLastProduct]);

  const PaginationSet: FC = () => {
    return (
      <div id="paginationSet">
        {renderProducts.length > 0 ? (
          <p id="statusPagination">{productDescription}</p>
        ) : (
          <p id="statusPagination">
            Chúng tôi không có sản phẩm nào giống như bạn đang tìm kiếm
          </p>
        )}
        {totalPages !== 1 && (
          <Pagination id="pagination">
            <Pagination.First
              onClick={() => changePage(1)}
              disabled={currentPage === 1}
            />

            <Pagination.Prev
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => changePage(number)}
                >
                  {number}
                </Pagination.Item>
              )
            )}

            <Pagination.Next
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />

            <Pagination.Last
              onClick={() => changePage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </div>
    );
  };

  return (
    <>
      {renderProducts.length > 8 && <PaginationSet />}
      <Row xs={1} sm={2} lg={3} xl={3} xxl={4}>
        {renderProducts}
      </Row>
      <PaginationSet />
    </>
  );
};

export default ProductList;
