const axios = require("axios");

const newsData = async (req, res) => {
  try {
    const news = await axios.get(
      "https://newsapi.org/v2/everything?domains=archdaily.com&apiKey=f1944b649554455cb9ed1fc7a6f8c495"
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
    res.status(200).json(filterNews)
  } catch (error) {
    res.status(404).json(error)
  }
}
module.exports = newsData;