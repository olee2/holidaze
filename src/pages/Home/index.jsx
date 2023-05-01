import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero";
import styles from "./Home.module.css";
import { fetchVenues } from "../../api/fetchVenues";

const Home = () => {
  const [venues, setVenues] = useState();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleVenues = async () => {
    try {
      const data = await fetchVenues();
      setVenues(data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    handleVenues();
  }, []);

  return (
    <main>
      <Hero />
      <div className="grid"></div>
    </main>
  );
};

export default Home;
