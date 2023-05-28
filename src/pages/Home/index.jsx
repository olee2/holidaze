import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import styles from "./Home.module.css";
import { fetchVenues } from "../../api/fetchVenues";
import { Card } from "../../components/Card";
import { Search } from "../../components/Search";
import { searchAlgo } from "../../utils/searchAlgo";
import SortSelect from "../../components/SortSelect";

const Home = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loadingMore, setLoadingMore] = useState(false);

  const handleQuery = (event) => {
    setQuery(event.target.value.replace(/[^a-zA-Z\d]/gi, "").toLowerCase());
  };

  const loadMoreVenues = () => {
    setLoadingMore(true);
    setOffset((prevOffset) => prevOffset + 10);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setOffset(0);
    if (!loadingMore) {
      setVenues([]);
    }
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setOffset(0);
    if (!loadingMore) {
      setVenues([]); // Clear venues when sort order changes, only if not loading more
    }
  };

  useEffect(() => {
    const handleVenues = async () => {
      try {
        const data = await fetchVenues(undefined, 10, offset, sort, sortOrder);
        if (data && data.length > 0) {
          let updatedVenues = [...venues, ...data];
          setVenues(updatedVenues);
          localStorage.setItem("venues", JSON.stringify(updatedVenues));
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoader(false);
        setLoadingMore(false);
      }
    };

    handleVenues();
    // eslint-disable-next-line
  }, [offset, sort, sortOrder, loadingMore]);

  useEffect(() => {
    let match = [];
    let allItems;

    try {
      allItems = JSON.parse(localStorage.getItem("venues"));
    } catch (e) {
      console.error(e);
    }

    if (query.length) {
      match = allItems.filter((venue) => searchAlgo(venue, query));
      if (match.length) {
        setNotFound(false);
        setVenues(match);
      } else {
        setNotFound(true);
      }
    } else {
      setVenues(allItems);
      setNotFound(false);
    }
  }, [query]);

  return (
    <main>
      <Hero />

      <div className={`inner-container ${styles.sortSearch}`}>
        <Search query={query} handleQuery={handleQuery} />
        <SortSelect
          sort={sort}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onSortOrderChange={handleSortOrderChange}
        />
      </div>
      {loader ? (
        <div className={styles.loader} />
      ) : notFound ? (
        <div className={styles.notFound}>
          <p>No venues found.</p>
          <button type="button" className="btn" onClick={() => setQuery("")}>
            Reset
          </button>
        </div>
      ) : error ? (
        <div className={styles.notFound}>
          <p>An error occured.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {venues?.map((v, index) => (
            <Card {...v} key={v.id + "-" + index} />
          ))}
        </div>
      )}
      {!loader && !error && (
        <button
          type="button"
          className={`btn ${styles.moreBtn}`}
          onClick={loadMoreVenues}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More Venues"}
        </button>
      )}
    </main>
  );
};

export default Home;
