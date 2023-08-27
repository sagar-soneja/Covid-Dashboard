import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./News.css";
import NewsContent from "../../components/NewsContent/NewsContent";

const News = () => {
  const dispatch = useDispatch();
  // const [news, setNews] = useState([]);

  const fetchNews = async () => {
    var res = await axios.get(
      "https://newsapi.org/v2/top-headlines?q=covid&apiKey=b783c39f75c04ecaab63ba49297aac3f"
    );
    
    // setNews(res.data.articles);
    dispatch({
      type: 'ADD_NEWS',
      payload: res.data.articles
    })
  };
  useEffect(() => {
    fetchNews();
  }, []);

  // const state = useSelector((state) => state);
  // const {news} = state
  
  return (
    <>
      <div className="india">
        <div className="wrapper">
          <div className="main-heading">
            <h1 className="mb-5 text-center">
             
              <span className="font-weight-bold">World </span>News
            </h1>
          </div>
          {/* <div className="news-container">
            {news.map((nesw, ind) => (
              <div className="news" key={ind}>
                <div key={ind}>
                  <img
                    className="imgg"
                    src={nesw.urlToImage}
                    alt={nesw.title}
                  />{" "}
                </div>
                <div className="info">
                  <span className="span">{nesw.title}</span>
                  <b>{nesw.source.name} </b>
                </div>

                <a href={nesw.url} target="_blank">
                  <button>Go to Source</button>
                </a>
              </div>
            ))}
          </div> */}
          <NewsContent />
        </div>
      </div>
    </>
  );
};

export default News;
