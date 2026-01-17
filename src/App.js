import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  // 1. TodoListModelの初期化
  #todoListModel = new TodoListModel();

  mount() {
    // id="js-form" の form 要素を取得する（Todo入力フォーム）
    const formElement = document.querySelector("#js-form");

    // id="js-form-input" の input 要素を取得する（Todoの入力欄）
    const inputElement = document.querySelector("#js-form-input");

    // id="js-todo-list" の div 要素を取得する（Todo一覧の表示エリア）
    const containerElement = document.querySelector("#js-todo-list");

    // id="js-todo-count" の span 要素を取得する（Todo件数表示用）
    const todoItemCountElement = document.querySelector("#js-todo-count");

    // 2. TodoListModelの状態が更新されたら表示を更新する
    this.#todoListModel.onChange(() => {
      // Todoリストをまとめる List要素
      const todoListElement = element`<ul></ul>`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#todoListModel.getTodoItems();
      todoItems.forEach((item) => {
        // 完了済みならchecked属性を付け、未完了ならchecked属性を外す
        // input要素にはchecked属性をつける
        // 削除ボタン(x)をそれぞれ追加する
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked>
          <s>${item.title}</s>
          <button class="delete">x</button>
          </li>`
          : element`<li><input type="checkbox" class="checkbox">
          ${item.title}
          <button class="delete">x<button>
          </li>`;
        // チェックボックスのトグル処理はの変更なし
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
          // 指定したTodoアイテムの完了状態を反転させる
          this.#todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed,
          });
        });
        // 削除ボタン(X)がクリックされたときにTodoListModelからアイテムを削除する
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
          this.#todoListModel.deleteTodo({
            id: item.id,
          });
        });

        todoListElement.appendChild(todoItemElement);
      });
      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    });

    // 3. フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      // フォーム送信時のデフォルト動作（ページリロード）を止める
      event.preventDefault();
      // 新しいTodoItemをTodoListへ追加する
      this.#todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      // 入力欄を空文字にして、次の入力に備える
      inputElement.value = "";
    });
  }
}
