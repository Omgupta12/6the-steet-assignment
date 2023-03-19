import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Box, Text, Button } from "@chakra-ui/react";
import "./Products.css";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getProducts = async () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const res = await axios.get(`https://fakestoreapi.com/products`);
    const data = res.data.slice(startIndex, endIndex);
    return data;
  };

  useEffect(() => {
    getProducts().then((data) => {
      setData(data);
    });
  }, [page, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Box className="logout">
        <Text fontSize="3xl">Products Page</Text>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>

      {/* render the pagination component */}
      <Pagination
        totalPages={Math.ceil(20 / itemsPerPage)}
        handlePageChange={handlePageChange}
        currentPage={page}
      />
      {/* map the products */}
      <Box className="products">
        {data &&
          data.map((el) => (
            <Box key={el.id} className="product_page-main">
              <Box>
                <Image
                  boxSize="280px"
                  objectFit="cover"
                  padding={"10px"}
                  src={el.image}
                  alt="products"
                />
              </Box>
              <Box className="product-details">
                <Text>{`Title:-${el.title}`}</Text>
                <Text>{`Category:- ${el.category}`}</Text>
                <Text>{`Price:- Rs ${el.price}`}</Text>
                <Text>{`Rating:- ${el.rating.rate}`}</Text>
                <Text>{el.description}</Text>
              </Box>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default Products;
