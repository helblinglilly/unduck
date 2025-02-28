// This file was (mostly) ripped from https://duckduckgo.com/bang.js

export const bangs = [
  {
    t: "ddg",
    u: "https://duckduckgo.com/?q={{{s}}}",
  },{
    t: "ai",
    u: "https://www.t3.chat/new?q={{{s}}}",
  },
  {
    t: "yt",
    u: "https://www.youtube.com/results?search_query={{{s}}}",
  },
  {
    t: "g",
    u: "https://www.google.com/search?q={{{s}}}",
  },
  {
    t: "gi",
    u: "https://www.google.com/search?q={{{s}}}&udm=2",
  },
  {
    t: "gt",
    u: "https://www.translate.google.com/?sl=en&tl=de&text={{{s}}}&op=translate",
  },
  {
    t: "gn",
    u: "https://www.google.com/search?q={{{s}}}&tbm=nws",
  },
  {
    t: "gm",
    u: "https://www.google.com/maps?q={{{s}}}",
  },
  {
    t: "r",
    u: "https://www.reddit.com/search/?q={{{s}}}",
  },
];
