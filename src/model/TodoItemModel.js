// ユニークなIDを管理する変数
let todoIdx = 0;

export class TodoItemModel {
  /** @type {number} TodoアイテムのID */
  id;
  /** @type {string} Todoアイテムのタイトル */
  title;
  /** @type {boolean} Todoアイテムの完了状態 */

  /**
   *
   * @param {{title: string, completed: boolean}}
   */
  constructor({ title, completed }) {
    // idは連番となり、それぞれのインスタンス毎に異なるものとする
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }
}
