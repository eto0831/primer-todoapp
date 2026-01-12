import { element, render } from "./view/html-util.js";

export class App {
  mount() {
    // id="js-form" の form 要素を取得する（Todo入力フォーム）
    const formElement = document.querySelector("#js-form");

    // id="js-form-input" の input 要素を取得する（Todoの入力欄）
    const inputElement = document.querySelector("#js-form-input");

    // id="js-todo-list" の div 要素を取得する（Todo一覧の表示エリア）
    const containerElement = document.querySelector("#js-todo-list");

    // id="js-todo-count" の span 要素を取得する（Todo件数表示用）
    const todoItemCountElement = document.querySelector("#js-todo-count");

    // Todoリスト全体をまとめる ul 要素を生成する（まだ中身は空）
    const todoListElement = element`<ul></ul>`;

    // 現在のTodoアイテム数を管理する変数を0で初期化する
    let todoItemCount = 0;

    // form が submit されたときの処理を登録する
    formElement.addEventListener("submit", (event) => {
      // フォーム送信時のデフォルト動作（ページリロード）を止める
      event.preventDefault();

      // input に入力された文字列を使って li 要素を生成する
      // element タグ関数により HTMLエスケープも自動で行われる
      const todoItemElement = element`<li>${inputElement.value}</li>`;

      // 作成した li 要素を ul（Todoリスト）に追加する
      todoListElement.appendChild(todoItemElement);

      // 表示エリア(containerElement)の中身を
      // 現在の todoListElement（ul）で置き換える
      render(todoListElement, containerElement);

      // Todoアイテム数を1増やす
      todoItemCount += 1;

      // Todoアイテム数の表示テキストを更新する
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;

      // 入力欄を空文字にして、次の入力に備える
      inputElement.value = "";
    });
  }
}
