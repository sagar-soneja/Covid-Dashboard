import React from 'react'
import { useSelector } from "react-redux";
const NewsContent = () => {
    const state = useSelector((state) => state);
    const {news} = state
    
  return (
    <div>
       <div className="news-container">
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
          </div>
    </div>
  )
}

export default NewsContent
