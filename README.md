# highly-exporter
Export all highlights out of [HighlyTM](https://www.highly.co/), since it's shutting down.

Necessary because their standard export tool to export it to CSV caps out at 1000 highlights.

If you're looking for a Clojure version, check out [Devon's repo](https://github.com/devonzuegel/highly-exporter). This was written after that.

The difference is that the above didn't work for me (some missing random dependency I couldn't figure out).

This just requires [node.js](https://nodejs.org/en/download/) and no other modules.

# Usage

Add your token to the [TOKEN variable](https://github.com/neilkakkar/highly-exporter/blob/master/src/highly_exporter/highly.js#L3) in `highly.js`.

You can generate a csv or a json.
Clone repo, then run:

```
node src/highly_exporter/highly.js > highlights.csv
```

This will save highlights to a csv file.

To switch to json, just uncomment the console log line for json (and comment the one for csv) [here](https://github.com/neilkakkar/highly-exporter/blob/master/src/highly_exporter/highly.js#L67).

This works well because I don't log anything else. 

It will take a little while to run.

# Requirements

Install [node.js](https://nodejs.org/en/download/).

