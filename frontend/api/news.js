import fetch from 'node-fetch';

export default async function topHeadlinesHandler(req, res) {
  const apiKey = 'b8504bb386304c0b8cc1161f3a8cc2d8';
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ error: data.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
