import { Button, HStack } from "@chakra-ui/react";

function createArrayOfSize(totalPages) {
  return new Array(totalPages).fill(0);
}

function Pagination({ totalPages, handlePageChange, currentPage }) {
  let pages = createArrayOfSize(totalPages).map((a, i) => {
    return (
      <Button
        data-testid="page-btn"
        variant={"ghost"}
        onClick={() => handlePageChange(i + 1)}
        isDisabled={currentPage === i + 1}
        border={currentPage === i + 1 ? "1px solid red" : "none"}
        key={i + 1}
      >
        {i + 1}
      </Button>
    );
  });

  const handlePrev = (val) => {
    handlePageChange(val);
  };

  const handleNext = (val) => {
    handlePageChange(val);
  };
  return (
    <HStack
      spacing={"1rem"}
      mt={"2em"}
      mb={"2em"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Button
        isDisabled={currentPage === 1}
        border={"1px solid black"}
        onClick={() => handlePrev(currentPage - 1)}
      >
        Prev
      </Button>
      {pages}
      <Button
        isDisabled={currentPage === totalPages}
        border={"1px solid black"}
        onClick={() => handleNext(currentPage + 1)}
      >
        Next
      </Button>
    </HStack>
  );
}

export default Pagination;
