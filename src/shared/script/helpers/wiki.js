export default {

  wikipediaSearch (term, lang="pt") {
    const params = {
        titles: term,
        srsearch: term,
        action: "query",
        list: "search",
        format: "json",
        origin: '*'
    };
    
    const query = Object.keys(params).map(key => `&${key}=${params[key]}`).join('');
    const url = `https://${lang}.wikipedia.org/w/api.php?${query}`;
    
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(resp => resp.json())
        .then(resolve)
        .catch(reject);
    });
  }
}