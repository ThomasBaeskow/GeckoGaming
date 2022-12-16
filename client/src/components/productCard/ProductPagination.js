import React,{useState,useContext} from 'react'
import ReactPaginate from 'react-paginate';
import ProductCard from './ProductCard';


import { MyContext } from "../../context/Context";

function ProductPagination({ itemsPerPage }) {
    const { product} = useContext(MyContext);

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = product.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(product.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % product.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <><div >
      <ReactPaginate
          className='pagination'
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
        <ProductCard currentItems={currentItems} />
        </div>
      </>
    );
  }

export default ProductPagination