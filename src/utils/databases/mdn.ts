import config from "../../config.json";
import fetch from "node-fetch";

// MDN Data Initialisation

interface MDNIndexEntry {
  title: string;
  url: string;
}

export async function initialiseMDN() {
  const mdnIndexCache: Array<MDNIndexEntry> = [];
  const mdnData = (await fetch(`${config.mdn.api}/en-US/search-index.json`)
    .then(r => r.json())
    .catch(() => undefined)) as Array<MDNIndexEntry> | undefined;

  if (mdnData) {
    mdnIndexCache.push(...mdnData.map(r => ({ title: r.title, url: r.url })));
    console.log("MDN Data Initialised...");
  }

  return mdnIndexCache;
}

export const mdnData = initialiseMDN();

// MDN Command Autocompletion

interface MDNCandidate {
  entry: MDNIndexEntry;
  matches: string[];
}

const AUTOCOMPLETE_MAX_ITEMS = 20;
const SLICED_URL_START = 19;

function autoCompleteMap(elements: Array<MDNCandidate>) {
  return elements.map(e => ({ name: e.entry.title, value: e.entry.url }));
}

export async function mdnAutoComplete(value: string) {
  const parts = value.split(/\.|#/u).map(p => p.toLowerCase());
  const candidates = [];
  const cache = await mdnData;

  for (const entry of cache) {
    const lowercaseTitle = entry.title.toLowerCase();
    const matches = parts.filter(phrase => lowercaseTitle.includes(phrase));
    if (matches.length) {
      candidates.push({ entry, matches });
    }
  }

  const sortedCandidates = candidates.sort((a, b) => {
    if (a.matches.length !== b.matches.length) {
      return b.matches.length - a.matches.length;
    }
    const aMatches = a.matches.join("").length;
    const bMatches = b.matches.join("").length;
    return bMatches - aMatches;
  });

  return autoCompleteMap(sortedCandidates).slice(0, AUTOCOMPLETE_MAX_ITEMS - 1);
}