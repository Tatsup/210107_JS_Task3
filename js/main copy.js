'use strict';
{
  const TABLE = document.getElementById('table'); // 入力テキストの出力位置取得
  let i = 0; // IDカウンタ定義

  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault(); // ページ遷移（Defaultに戻る）をキャンセル

    let tr = document.createElement('tr');

    // IDの要素ノードtrを作成
    let tdId = document.createElement('td'); // IDの要素ノードを作成
    let textId = document.createTextNode(i); // テキストノードを作成しカウントを代入
    i++; // IDカウントUP
    tdId.appendChild(textId); // ノード同士の組み立て
    tr.appendChild(tdId); // trにIDを追加

    // コメントの要素ノードtrを作成
    let tdComment = document.createElement('td'); // 入力テキストの要素ノードを作成
    let comment = document.getElementById('comment').value; // 入力テキストを変数に保管
    let textComment = document.createTextNode(comment); // テキストノードを作成し入力テキストを代入
    tdComment.appendChild(textComment); // ノード同士の組み立て
    tr.appendChild(tdComment); // trにコメントを追加

    // 状態ノードtrを作成
    let tdStatus = document.createElement('td'); // 状態の要素ノードを作成
    const buttonWork = document.createElement('button'); // ボタンの要素ノードを作成
    const buttonDelete = document.createElement('button'); // ボタンの要素ノードを作成
    buttonWork.id = 'work'; // "作業中"ボタンにidを設定
    buttonDelete.id = 'Delete'; // "作業中"ボタンにidを設定
    let textButtonWork = document.createTextNode('作業中'); // "作業中"のテキストノードを作成
    let textSpace = document.createTextNode('\t'); // スペース（空白）のテキストノードを作成
    let textButtonDelete = document.createTextNode('削除'); // "削除"のテキストノードを作成
    buttonWork.appendChild(textButtonWork); // ボタンに"作業中"を表示
    buttonDelete.appendChild(textButtonDelete); // ボタンに"削除"を表示
    tdStatus.appendChild(buttonWork); // ノード同士の組み立て
    tdStatus.appendChild(textSpace); // ノード同士の組み立て
    tdStatus.appendChild(buttonDelete); // ノード同士の組み立て
    tr.appendChild(tdStatus); // trに状態ボタンを追加

    // 作成した行ノードtrをテーブルTABLEに追加
    TABLE.appendChild(tr);
  });

  // ▼▼▼ 削除ボタン処理
  document.getElementById('Delete').addEventListener('click', e => {
    e.preventDefault(); // ページ遷移（Defaultに戻る）をキャンセル
    let clickTr = e.target.parentNode; // クリックした行の要素ノードを取得
    let clickId = clickTr.firstElementChild.value; // クリックした要素のIDを取得 ★★★ボタン自体のID取得となっていないか？
    // 
  });

}