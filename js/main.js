'use strict';
{  
  const table = document.getElementById('table'); // 入力テキストの出力位置取得
  const defaultTableHtml = table.innerHTML; // テーブルを初期状態に戻す
  const aryToDo = [];

  // ToDo追加（ToDoオブジェクト作成、ToDo配列追加などのデータ処理）の関数を定義
  function addToDo(textInput) {
    const objToDo = {
      content: textInput,
      status: "作業中"
    };      
    aryToDo.push(objToDo); // aryToDoにobjToDoを追加
    return aryToDo;
  };

  // ToDo要素（HTML）形成の関数を定義
  function createTd(text) {
    const td = document.createElement('td') // 要素ノードtdを作成
    const textNode = document.createTextNode(text); // テキストノードを作成
    td.appendChild(textNode); // ノード同士の組み立て
    return td;
  };

  // ボタン生成の関数を定義
  function createButton(textButton) {
    const button = document.createElement('button'); // ボタンの要素ノードを作成
    const textNodeButton = document.createTextNode(textButton); // "作業中"のテキストノードを作成
    button.appendChild(textNodeButton); // ボタンに"作業中"を表示
    return button;
  };

  // 削除ボタンにClass名とidを付与する関数を定義
  function addDeleteButtonId() {
    const deleteButton = createButton('削除');
    deleteButton.className = 'Delete';
    deleteButton.id = 'delete';
    deleteButton.onclick = clickDeleteButton();
    // deleteButton[0].setAttribute("id", id); //なぜエラー「Uncaught TypeError: Cannot read property 'setAttribute' of undefined」でる？
    return deleteButton;
  };

  // 表示するノードを組み立て（ループ処理）の関数を定義
  function buildNodeByForeach(tempAry) {
    aryToDo.forEach(function (value, index) {
      const tr = document.createElement('tr'); // テーブルの行要素ノードtrを作成      
      tr.className = 'ToDoList';
      tr.appendChild(createTd(index)); // IDの要素ノードをtrに追加      
      tr.appendChild(createTd(value.content)); // コメントの要素ノードをtrに追加
      // 状態ノードtrを作成
      const tdStatus = document.createElement('td'); // 状態の要素ノードを作成
      const textSpace = document.createTextNode('\t'); // スペース（空白）のテキストノードを作成
      tdStatus.appendChild(createButton('作業中')); // ノード同士の組み立て
      tdStatus.appendChild(textSpace); // ノード同士の組み立て
      // tdStatus.appendChild(createButton('削除')); // ノード同士の組み立て
      tdStatus.appendChild(addDeleteButtonId(index)); // ノード同士の組み立て
      tr.appendChild(tdStatus); // trに状態ボタンを追加
      // 作成した行ノードtrをテーブルTABLEに追加
      table.appendChild(tr);
    });
    return tempAry;
  };

  // 追加ボタンClick時の処理
  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault(); // ページ遷移（Defaultに戻る）をキャンセル
    const comment = document.getElementById('comment'); // 入力テキストの要素ノードを変数に保管
    
    if (comment.value) { // 入力テキストに文字があった場合
      table.innerHTML = defaultTableHtml; // テーブルを初期状態に戻す
      addToDo(comment.value);// ToDo追加・データ処理      
      buildNodeByForeach(table);// 表示するノードを組み立て（ループ処理）      
      comment.value = '';// 入力テキストを空にする
    };
    // console.dir(document.getElementsByClassName('delete')); // debug用
  });

  // 削除ボタンClick時の処理
  function clickDeleteButton() {
      const deleteClass = document.getElementsByClassName('Delete');
      for (let i = 0; i < deleteClass.length; i++) {
        deleteClass[i].addEventListener('click', e => {
          this.closest('.ToDoList[i]').remove();
        });
      }
  };


  
}