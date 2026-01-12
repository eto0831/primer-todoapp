export function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * HTML文字列からHTML要素を作成して返す
 * @param {string} html
 */
export function htmlToElement(html) {
  // template 要素を新しく作成する（HTML文字列をDOMに変換するための器）
  const template = document.createElement("template");

  // template の innerHTML に HTML文字列を代入する
  // この時点ではまだ document には追加されていない
  template.innerHTML = html;

  // template の中身（DocumentFragment）から最初の要素ノードを取り出して返す
  return template.content.firstElementChild;
}

/**
 * HTML文字列からDOM Nodeを作成して返すタグ関数
 * @returns {Element}
 */
export function element(strings, ...values) {
  // タグ付きテンプレートの文字列配列(strings)と値(values)を1つのHTML文字列に組み立てる
  const htmlString = strings.reduce((result, str, i) => {
    // 現在のプレースホルダに対応する値を取得する
    // i=0 のときは values[-1] になるため undefined
    const value = values[i - 1];

    // プレースホルダの値が文字列の場合
    if (typeof value === "string") {
      // 文字列をHTMLエスケープしてから結果文字列に連結する
      return result + escapeSpecialChars(value) + str;
    } else {
      // 文字列以外（数値やDOMなど）はそのまま文字列化して連結する
      return result + String(value) + str;
    }
  });
  // 組み立てたHTML文字列をDOM要素に変換して返す
  return htmlToElement(htmlString);
}

/**
 * コンテナ要素の中身をbodyElementで上書きする
 * @param {Element} bodyElement コンテナ要素の中身となる要素
 * @param {Element} containerElement コンテナ要素
 */
export function render(bodyElement, containerElement) {
  // containerElement の中にある既存のDOMをすべて削除する
  containerElement.innerHTML = "";

  // containerElement の直下に bodyElement を追加する
  containerElement.appendChild(bodyElement);
}
