import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  #items;
  /**
   *
   * @param {TodoItemModel[]} [items] 初期アイテム(デフォルトは空の配列)
   */
  constructor(items = []) {
    super();
    this.#items = items;
  }
  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.#items.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns {TodoModel[]}
   */
  getTodoItems() {
    return this.#items;
  }
  /**
   * TodoListの状態が更新されたときに呼び出されるリスナーを登録
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }
  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  emitChange() {
    this.emit("change");
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItems
   */
  addTodo(todoItem) {
    this.#items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {{ id:number, completed: boolean }}
   */
  updateTodo({ id, completed }) {
    // idが一致するTodoItemを見つけ、あるなら完了状態の値を更新
    const todoItem = this.#items.find((todo) => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemを削除する
   * @param {{ id: number }}
   */
  deleteTodo({ id }) {
    // idに一致しないTodoItemだけを残すことでidに一致するTodoItemだけを削除する
    this.#items = this.#items.filter((todo) => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}
