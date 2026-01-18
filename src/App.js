import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
  #todoListView = new TodoListView();
  // 1. TodoListModelの初期化
  #todoListModel = new TodoListModel();

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {id: number, completed: boolean}
   */
  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {id: number}
   */
  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }

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
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#todoListModel.getTodoItems();
      const todoListView = new TodoListView();
      // todoItemに対応するTodoListViewを作成する
      const todoListElement = todoListView.createElement(todoItems, {
        // Appに定義したリスナー関数を呼び出す
        // Todoアイテムが講師にベントを発生させたときに呼ばれる
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        // Todoアイテムが削除イベントを発生させたときに呼ばれる
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        },
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
        }),
      );
      // 入力欄を空文字にして、次の入力に備える
      inputElement.value = "";
    });
  }
}
