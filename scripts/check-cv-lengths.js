import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = ['de','fr','es','ca','it','pt','rm'];
const baseDir = path.join(__dirname, '..', 'src', 'locales');

function flatten(obj, prefix = '') {
	return Object.keys(obj).reduce((acc, key) => {
		const value = obj[key];
		const newKey = prefix ? `${prefix}.${key}` : key;
		if (value && typeof value === 'object') {
			Object.assign(acc, flatten(value, newKey));
		} else {
			acc[newKey] = String(value ?? '');
		}
		return acc;
	}, {});
}

function readJson(filePath) {
	return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const enPath = path.join(baseDir, 'en', 'cv.json');
const en = flatten(readJson(enPath));

const results = [];
for (const lng of languages) {
	const lngPath = path.join(baseDir, lng, 'cv.json');
	if (!fs.existsSync(lngPath)) {
		results.push({ language: lng, missing: true, issues: ['Missing cv.json'] });
		continue;
	}
	const tr = flatten(readJson(lngPath));
	const issues = [];
	for (const key of Object.keys(en)) {
		const enVal = en[key] ?? '';
		const trVal = tr[key] ?? '';
		if (!trVal) {
			issues.push(`Missing key: ${key}`);
			continue;
		}
		const ratio = trVal.length / Math.max(1, enVal.length);
		if (ratio > 1.5) {
			issues.push(`Too long (${(ratio*100).toFixed(0)}% of EN): ${key}`);
		}
		if (ratio < 0.5) {
			issues.push(`Suspiciously short (${(ratio*100).toFixed(0)}% of EN): ${key}`);
		}
	}
	results.push({ language: lng, missing: false, issues });
}

let hasProblems = false;
for (const res of results) {
	if (res.missing || res.issues.length) {
		hasProblems = true;
		// Display results for each language
		results.forEach(res => {
			// Language
			res.issues.forEach(issue => {
				// Issue description
			})
		})
	}
}

if (!hasProblems) {
	// All CV translations look within acceptable length ranges.
}

process.exit(hasProblems ? 1 : 0);
