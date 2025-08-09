import { bangs } from "./bang";
import "./global.css";

function noSearchDefaultPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <div class="content-container">
        <h1>Und*ck</h1>

        <div class="url-container">
          <form method="GET" id="search-form">
            <input
              type="text"
              class="url-input"
              id="search-input"
              placeholder="Search Term"
              name="q"
            />
          <form />

          <table style="width: 100%;">
            <tbody>
              <tr>
                <td>!ai</td>
                <td >T3 Chat</td>
              </tr>
              <tr>
                <td>!gpt</td>
                <td>Chat GPT</td>
              </tr>
              <tr>
                <td>!claude</td>
                <td>Claude</td>
              </tr>
              <tr>
                <td>!yt</td>
                <td>Youtube</td>
              </tr>
              <tr>
                <td>!gi</td>
                <td>Google Images</td>
              </tr>
              <tr>
                <td>!gt</td>
                <td>Google Translate</td>
              </tr>
              <tr>
                <td>!gn</td>
                <td>Google News</td>
              </tr>
              <tr>
                <td>!gm</td>
                <td>Google Maps</td>
              </tr>
              <tr>
                <td>!r</td>
                <td>Reddit</td>
              </tr>
              <tr>
                <td>!gh</td>
                <td>Github</td>
              </tr>
              <tr>
                <td>!gl</td>
                <td>Gitlab: Set gl-host in localstorage to hostname</td>
              </tr>
              <tr>
                <td>!npm</td>
                <td>npm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer class="footer">
        <a href="https://x.com/theo" target="_blank">theo</a>
        •
        <a href="https://github.com/t3dotgg/unduck" target="_blank">github</a>
      </footer>
    </div>
  `;

  const urlInput = app.querySelector<HTMLInputElement>(".url-input")!;
  const form = app.querySelector<HTMLFormElement>('#search-form')!;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerms = urlInput.value;
    if (searchTerms){
      form.action = `https://search.helbling.uk?q=${searchTerms}`;
      form.submit();
    }
  })
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "ddg";
const defaultBang = bangs.find((b) => b.bang === LS_DEFAULT_BANG);

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }
  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = (bangs.find((b) => b.bang === bangCandidate) ?? defaultBang)!

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // Allow for host to be customised
  if (selectedBang.searchUrl.includes('{{{h}}}')){
    const host = localStorage.getItem(`${selectedBang.bang}-host`);
    if (!host){
      noSearchDefaultPageRender();
      return null;
    }
    selectedBang.searchUrl = selectedBang.searchUrl.replace('{{{h}}}', host);
  }

  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang.searchUrl.replace(
    "{{{s}}}",
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
