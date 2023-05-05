import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import styles from "./Home.module.css";
import { fetchVenues } from "../../api/fetchVenues";
import { Card } from "../../components/Card";
import { Search } from "../../components/Search";
import { searchAlgo } from "../../utils/searchAlgo";

const Home = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [query, setQuery] = useState("");

  const handleQuery = (event) => {
    setQuery(event.target.value.replace(/[^a-zA-Z\d]/gi, "").toLowerCase());
  };

  useEffect(() => {
    const handleVenues = async () => {
      const storedVenues = JSON.parse(localStorage.getItem("venues"));
      setLoader(true);
      if (!storedVenues) {
        try {
          const data = await fetchVenues();
          setVenues(data);
          localStorage.setItem("venues", JSON.stringify(data));
          setLoader(false);
        } catch (err) {
          console.log(err);
          setError(true);
        }
      } else {
        setVenues(storedVenues);
        setLoader(false);
      }
    };
    handleVenues();
  }, []);

  useEffect(() => {
    let match = [];
    let allItems = JSON.parse(localStorage.getItem("venues"));

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
      <Search query={query} handleQuery={handleQuery} />
      {loader ? (
        <div className={styles.loader} />
      ) : notFound ? (
        <div className={styles.notFound}>
          <p>No products found.</p>
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
          {venues?.map((v) => (
            <Card {...v} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
