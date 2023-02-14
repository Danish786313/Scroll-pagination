import { useState, useEffect } from "react";
import useInfiniteScroll from "./useInfiniteScroll";
import axios from "axios";

const App = () => {
  //we change here
  const [Items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  //setting tha initial page
  const [page, setPage] = useState(0);
  //we need to know if there is more data
  const [HasMore, setHasMore] = useState(true);

  const [lastElementRef] = useInfiniteScroll(
    HasMore ? loadMoreItems : () => {},
    isFetching
  );

  //on initial mount
  useEffect(() => {
    loadMoreItems();
  }, []);

  function loadMoreItems() {
    setIsFetching(true);

    //using axios to access the third party API
    axios({
      method: "GET",
      url: "http://localhost:5000/api/users", //use endpoint url
      params: { _page: page, _limit: 40 },
    })
      .then((res) => {
        setItems((prevTitles) => {
          //some edits here as data is structured differently
          return [
            ...new Set([
              ...prevTitles,
              ...res.data.response.items.map((b) => b),
            ]),
          ];
        });
        setPage((prevPageNumber) => prevPageNumber + 1);
        //we now compare current page to totalpages
        setHasMore(
          res.data.response.currentPage <= res.data.response.totalPages
        );
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      {Items.map((item, index) => {
        if (Items.length === index + 1) {
          return (
            //referencing the last item to be watched by the observer
            //we are getting object properties now
            <div ref={lastElementRef} key={index}>
              {item.firstName} - {item.lastName} - {item.email} - <b>last</b>
            </div>
          );
        } else {
          return (
            //we are getting object properties now
            <div key={index}>
              {item.firstName} - {item.lastName} - {item.email}
            </div>
          );
        }
      })}
      {isFetching && <p>Fetching items...</p>}
    </div>
  );
};

export default App;
