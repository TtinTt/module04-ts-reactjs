// import React, { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Pagination from "react-bootstrap/Pagination";
// import productApi from "../../apis/product.api";
// import { Product, ProductState } from "../../types-unEdit/Product";
// import ProductCardAdmin from "./ProductCardAdmin";
// import NavbarFilter from "../NavbarFilter";
// import "../../css/Cart.css";
// import { State } from "../../types-unEdit/StateReducer";

// interface ManageProductProps {}

// const ManageProduct: React.FC<ManageProductProps> = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [total, setTotal] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const productListStore = useSelector(
//     (state: State) => state.productReducer.products
//   );
//   let searchFilter =
//     useSelector((state: State) => state.productReducer.searchFilter) ?? "";
//   const [loading, setLoading] = useState<boolean>(false);
//   const [productList, setProductList] = useState<Product[]>([]);
//   const [productDescription, setProductDescription] = useState<string>("");

//   let sortOption =
//     useSelector((state: State) => state.productReducer.sort) ?? 0;
//   let priceFromValue =
//     useSelector((state: State) => state.productReducer.priceFrom) ?? null;

//   const productsPerPage = 10;

//   const fetchProducts = async () => {
//     await productApi
//       .searchProducts({
//         name: searchFilter,
//         page: currentPage,
//         limit: productsPerPage,
//         maxPrice: priceFromValue,
//         sortType: sortOption,
//         category: null,
//       })
//       .then((data) => {
//         setProductList(data.records);
//         setTotal(data.total);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response?.status === 401) {
//           console.log(error.response?.statusText);
//         } else {
//           console.log(error.response?.statusText);
//         }
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [loading, searchFilter, currentPage, priceFromValue, sortOption]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

//   const renderProducts = productList.map((product, index) => {
//     return (
//       <ProductCardAdmin
//         key={index}
//         render={"productCard"}
//         i={index}
//         product={product}
//         setLoading={setLoading}
//       />
//     );
//   });

//   const totalPages = Math.ceil(total / productsPerPage);

//   const changePage = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     const description = `${indexOfFirstProduct + 1} - ${
//       indexOfLastProduct > total ? total : indexOfLastProduct
//     } trong ${total} sản phẩm`;
//     setProductDescription(description);
//   }, [currentPage, productList, indexOfFirstProduct, indexOfLastProduct]);

//   // Pagination phân trang
//   const PaginationSet = () => {
//     return (
//       <div id="paginationSet">
//         {renderProducts.length > 0 ? (
//           <p id="statusPagination">{productDescription}</p>
//         ) : (
//           <p id="statusPagination">
//             Không có sản phẩm nào giống như bạn đang tìm kiếm
//           </p>
//         )}

//         {totalPages !== 1 && (
//           <Pagination id="pagination">
//             <Pagination.First
//               onClick={() => changePage(1)}
//               disabled={currentPage === 1}
//             />

//             <Pagination.Prev
//               onClick={() => changePage(currentPage - 1)}
//               disabled={currentPage === 1}
//             />

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//               (number) => (
//                 <Pagination.Item
//                   key={number}
//                   active={number === currentPage}
//                   onClick={() => changePage(number)}
//                 >
//                   {number}
//                 </Pagination.Item>
//               )
//             )}

//             <Pagination.Next
//               onClick={() => changePage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             />

//             <Pagination.Last
//               onClick={() => changePage(totalPages)}
//               disabled={currentPage === totalPages}
//             />
//           </Pagination>
//         )}
//       </div>
//     );
//   };

//   let draftProduct: Product = {
//     product_id: 0,
//     name: "",
//     img: [],
//     tag: [],
//     price: 0,
//     comparative: 0,
//     sku: "",
//     description: "",
//   };

//   return (
//     <>
//       <NavbarFilter />
//       {/* {renderProducts.length > 8 && PaginationSet()} */}
//       {renderProducts.length !== 0 && (
//         <Table striped bordered hover variant="light">
//           <thead>
//             <tr>
//               <th className="text-center">#</th>
//               <th
//                 className="text-left position-relative"
//                 colSpan={2}
//                 style={{ padding: "auto" }}
//               >
//                 <h6
//                   className="position-relative"
//                   style={{
//                     top: "13px",
//                     padding: "auto",
//                     display: "inline-block",
//                   }}
//                 >
//                   {" "}
//                   Thông tin sản phẩm{" "}
//                 </h6>

//                 <span style={{ float: "right" }}>
//                   <ProductCardAdmin
//                     key={0}
//                     render={"addProduct"}
//                     i={0}
//                     product={draftProduct}
//                     setLoading={setLoading}
//                   />
//                 </span>
//               </th>
//               <th className="text-center">Giá</th>
//               <th className="text-center">Giá so sánh</th>
//               <th className="text-center">SKU</th>
//               <th className="text-center">TAG</th>
//               <th className="text-center"></th>
//             </tr>
//           </thead>

//           {loading ? (
//             <h5 className="text-center msgCartTop">Loading...</h5>
//           ) : (
//             <tbody>{renderProducts}</tbody>
//           )}
//         </Table>
//       )}
//       {PaginationSet()}{" "}
//     </>
//   );
// };

// export default ManageProduct;
