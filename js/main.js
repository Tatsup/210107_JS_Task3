'use strict';
{  
  const table = document.getElementById('table'); // 入力テキストの出力位置取得
  const defaultTableHtml = table.innerHTML; // 初期状態（空）のtableを記憶
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

  // 削除ボタンを定義
  function addDeleteButton() {
    const deleteButton = createButton('削除');
    deleteButton.className = 'DeleteBottunClass';
    // 削除ボタンClick時の処理を追加
    deleteButton.addEventListener('click', e => {
      const deleteToDoRow = e.target.parentNode.parentNode; // 削除する行の要素を取得
      table.innerHTML = defaultTableHtml; // テーブルを初期状態に戻す
      aryToDo.splice(deleteToDoRow.cells[0].firstChild.data, 1); // 配列の要素を削除（開始位置, 要素数）
      buildToDoListTable(table);// 表示するノードを組み立て（ループ処理）
      displayTable();
    });
    return deleteButton;
  };

  // 作業中ボタンを定義
  function addWorkingButton() {
    const workingButton = createButton('作業中');
    workingButton.className = 'WorkingButtonClass';
    // 作業中（完了）ボタンClick時の処理を追加
    workingButton.addEventListener('click', e => {
      const clickToDoRow = e.target.parentNode.parentNode; // 作業中or完了ボタンを押した行の要素を取得
      const rowIdOfClickedButton = clickToDoRow.cells[0].firstChild.data; // Clickしたボタンの行のID
      if (e.target.className == 'WorkingButtonClass') {
        e.target.textContent = '完了';
        e.target.classList.remove('WorkingButtonClass');
        e.target.classList.add('CompleteButtonClass');
        aryToDo[rowIdOfClickedButton].status = "完了"; // 完了にした配列のstatusを作業中⇨完了に変更する
      } else if (e.target.className == 'CompleteButtonClass') {
          e.target.textContent = '作業中';
          e.target.classList.remove('CompleteButtonClass');
          e.target.classList.add('WorkingButtonClass');
          aryToDo[rowIdOfClickedButton].status = "作業中"; // 完了にした配列のstatusを作業中⇨完了に変更する
      };
      displayTable();
    });
    return workingButton;
  };
  
  // 完了ボタンを定義
  function addCompleteButton() {
    const completeButton = createButton('完了');
    completeButton.className = 'CompleteButtonClass';
    // 作業中（完了）ボタンClick時の処理を追加
    completeButton.addEventListener('click', e => {
      const clickToDoRow = e.target.parentNode.parentNode; // 作業中or完了ボタンを押した行の要素を取得
      const rowIdOfClickedButton = clickToDoRow.cells[0].firstChild.data; // Clickしたボタンの行のID
      if (e.target.className == 'WorkingButtonClass') {
        e.target.textContent = '完了';
        e.target.classList.remove('WorkingButtonClass');
        e.target.classList.add('CompleteButtonClass');
        aryToDo[rowIdOfClickedButton].status = "完了"; // 完了にした配列のstatusを作業中⇨完了に変更する
      } else if (e.target.className == 'CompleteButtonClass') {
          e.target.textContent = '作業中';
          e.target.classList.remove('CompleteButtonClass');
          e.target.classList.add('WorkingButtonClass');
          aryToDo[rowIdOfClickedButton].status = "作業中"; // 完了にした配列のstatusを作業中⇨完了に変更する
      };
      displayTable();
    });
    return completeButton;
  };

  // 表示するテーブルを組み立てる（ループ処理）関数を定義
  function buildToDoListTable(tempAry) {
    aryToDo.forEach(function (value, index) {
      const tr = document.createElement('tr'); // テーブルの行要素ノードtrを作成      
      tr.className = 'ToDoList';
      tr.appendChild(createTd(index)); // IDの要素ノードをtrに追加      
      tr.appendChild(createTd(value.content)); // コメントの要素ノードをtrに追加
      // 状態ノードtrを作成
      const tdStatus = document.createElement('td'); // 状態の要素ノードを作成
      const textSpace = document.createTextNode('\t'); // スペース（空白）のテキストノードを作成
      if (aryToDo[index].status === "作業中") {
        tdStatus.appendChild(addWorkingButton(index)); // ノード同士の組み立て（作業中ボタン）
      } else if (aryToDo[index].status === "完了") {
        tdStatus.appendChild(addCompleteButton(index)); // ノード同士の組み立て（作業中ボタン）
      };
      tdStatus.appendChild(textSpace); // ノード同士の組み立て
      tdStatus.appendChild(addDeleteButton(index)); // ノード同士の組み立て（削除ボタン）
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
      buildToDoListTable(table);// 表示するノードを組み立て（ループ処理）
      comment.value = '';// 入力テキストを空にする
    };
    displayTable();
  });
  
  // Radioボタン（すべて）CheckにChange時の操作
  const radioButtonAll = document.getElementById('all');
  radioButtonAll.addEventListener('change', function() {
    displayTable();
  });
    
    // Radioボタン（作業中）CheckにChange時時の操作
  const radioButtonWorking = document.getElementById('working');
  radioButtonWorking.addEventListener('change', function() {
    displayTable();
  });

  // Radioボタン（完了）CheckにChange時時の操作
  const radioButtonComplete = document.getElementById('complete');
  radioButtonComplete.addEventListener('change', function() {
    displayTable();
  });
  
  // 選択したRadioボタンによってToDoリスト表示を切り替える関数を定義
  function displayTable() {
    const toDoLists = document.getElementsByClassName('ToDoList');
    if (radioButtonAll.checked) {
      for (let i=0; i<toDoLists.length; i++) {
        if (toDoLists[i].style.display = "none") {
          toDoLists[i].style.display = "";
        }
      }
    } else if (radioButtonWorking.checked) {
      for (let i=0; i<toDoLists.length; i++) {
        if (toDoLists[i].children[2].children[0].classList.contains('CompleteButtonClass')) {
          toDoLists[i].style.display = "none";
        } else if (toDoLists[i].children[2].children[0].classList.contains('WorkingButtonClass')) {
          toDoLists[i].style.display = "";
        };
      };
    } else if (radioButtonComplete.checked) {
      for (let i=0; i<toDoLists.length; i++) {
        if (toDoLists[i].children[2].children[0].classList.contains('WorkingButtonClass')) {
          toDoLists[i].style.display = "none";
        } else if (toDoLists[i].children[2].children[0].classList.contains('CompleteButtonClass')) {
          toDoLists[i].style.display = "";
        };
      };
    };
  };

}