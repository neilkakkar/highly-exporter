const https = require('https');

TOKEN = 'Your Token Here'
HIGHLY_URL = `https://www.highly.co/access/highlights.json?token=${TOKEN}&next_marker=`

async function getAllHighlights() {
    let results = {}
    const data = await httpGetAsync(HIGHLY_URL);
    let cleanArticles = processJSON(data.articles)
    let next_marker = data.next_marker
    results = {...results, ...cleanArticles}
    while(next_marker) {
        const data = await httpGetAsync(`${HIGHLY_URL}${next_marker}`);
        let cleanArticles = processJSON(data.articles)
        results = {...results, ...cleanArticles}
        next_marker = data.next_marker
    }
    return results
}

async function httpGetAsync(url){
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received.
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            reject("Error: " + err.message);
        });
    });
}

function processJSON(articles) {
    function processArticle(article) {
        return {[article.url]: {
            title: article.title, 
            highlights: article.highlights}}
    }
    return articles.reduce(
        (acc, cur) => ({...acc, ...processArticle(cur)}), {})
}

function generateCSV(json) {
    // json is url: {title, highlights(array)}
    const rows = []
    for(let url in json){
        if(json.hasOwnProperty(url)) {
            json[url].highlights.forEach(highlight => {
                rows.push([url, `"${json[url].title}"`, `"${highlight}"`])
            });
        }
    }
    const csvContent = rows.map(e => e.join(',')).join("\n");
    const csv = `${csvContent}`
    return csv
}

async function run() {
    const articles = await getAllHighlights();
    // console.log(articles)
    const csv = generateCSV(articles);
    console.log(csv)
}

run()