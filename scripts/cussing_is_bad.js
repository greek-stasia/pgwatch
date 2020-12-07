//
// Run w/ `node cussing_is_bad.js`
//
const fs = require('fs');
const crypto = require("crypto");
const STRING = 0;
const RATING = 1;

function hash(x) {
	return crypto
		.createHash("sha1")
		.update(x)
		.digest("hex");
}

fs.readFile('./cuss_index.json', 'utf8', (err, data) => {
	if (err) {
		console.log(`Error reading file from disk: ${err}`);
	} else {
		// parse JSON string to JSON object
		Object.entries(JSON.parse(data)).forEach((cussWord) => {
			if(cussWord[RATING] > 0) {
				let newHash = hash(cussWord[STRING]);
				fs.appendFile('cuss.hash', "\"" + newHash + "\"\n", (err) => {
						if (err) return console.log(err);
						console.log(`[*] ${newHash} >> cuss.hash`);
				});
			} else {
				console.log("[*] Not a bad word");
			}
		});
	}
});

