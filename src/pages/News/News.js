import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./News.css";
import NewsContent from "../../components/NewsContent/NewsContent";

const News = () => {
  const dispatch = useDispatch();

  const fetchNews = async () => {
    var res = await axios.get(
      "https://newsapi.org/v2/top-headlines?q=covid&apiKey=b783c39f75c04ecaab63ba49297aac3f"
    );

    dispatch({
      type: "ADD_NEWS",
      payload: res.data.articles,
    });
  };
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <div className="india">
        <div className="wrapper">
          <div className="main-heading">
            <h1 className="mb-5 text-center">
              <span className="font-weight-bold">World </span>News
            </h1>
          </div>
          <NewsContent />
        </div>
      </div>
    </>
  );
};

export default News;
