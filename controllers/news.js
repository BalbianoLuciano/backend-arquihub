const axios = require("axios");

const newsData = async (req, res) => {
    try{
      const news = await axios.get(
      "https://newsapi.org/v2/everything?domains=archdaily.com&apiKey=761b6e1111a74c789561b3cbaa3f9515"
    );
    const filterNews = news.data.articles.map((e, index) => {
      return {
          id: index,
          title: e.title,
          image: e.urlToImage,
          url: e.url,
          author: e.author,
          description: e.description,
          date: e.publishedAt.substring(0,10)
      }
    })
    res.status(200).send(filterNews)}
    catch(err){
      res.status(400).send({err:err.message})
    }
}
module.exports = newsData;