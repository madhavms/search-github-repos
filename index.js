const axios = require('axios');

const getRepos = async ({
    username = 'madhavms',
    page = 1,
    per_page = 30
  } = {}) => {
      try {
      const repos = await axios(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`);
      console.log(repos.data);
      return repos.data
        .map((repo) => {
            return {
                name: repo.name,
                url: repo.html_url,
                description: repo.description,
                stars: repo.stargazers_count
            }
        })
         .sort((first, second) => second.stars - first.stars)
    }
        catch(error) {
            return "No repositories found for the given user."
        }
    }

module.exports = { getRepos };