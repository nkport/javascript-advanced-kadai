// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// HTMLの取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

// 問題用のテキスト配列
const textLists = [
    'Hello World', 'This is my App', 'How are you?',
    'Today is sunny', 'I love JavaScript!', 'Good morning',
    'I am Japanese', 'Let it be', 'Samurai',
    'Typing Game', 'Information Technology',
    'I want to be a programmer', 'What day is today?',
    'I want to build a web app', 'Nice to meet you',
    'Chrome Firefox Edge Safari', 'machine learning',
    'Brendan Eich', 'John Resig', 'React Vue Angular',
    'Netscape Communications', 'undefined null NaN',
    'Thank you very much', 'Google Apple Facebook Amazon',
    'ECMAScript', 'console.log', 'for while if switch',
    'var let const', 'Windows Mac Linux iOS Android',
    'programming'
];

// ランダムなテキストを表示
const createText = () => {

    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;

    let random = Math.floor(Math.random() * textLists.length);

    // 画面に表示処理
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {

    // 誤タイプの処理
    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');

        // 100ms後に背景色をもとに戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);

        // 関数の実行を終了して、関数の呼び出し元に返す値
        return;
    }

    // 正タイプの処理

    // スコアのインクリメント
    score++;

    // 文字列の一部を抽出するメソッド
    typed += untyped.substring(0, 1); // この場合は0~1まで
    untyped = untyped.substring(1); // この場合は1のみ

    // テキストを変更するtextContentプロパティ
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示
    if (untyped === '') {
        createText();
    }

};

// タイピングスキルのランクを判定
// const rankCheck = score => {

// テキストを格納する変数を作る
// let text = '';

// スコアに応じて異なるメッセージを変数textに格納する
// if (score < 100) {
//     text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
// } else if (score < 200) {
//     text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
// } else if (score < 300) {
//     text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
// } else if (score >= 300) {
//     text = `あなたのランクはSです。\nおめでとうございます!`;
// }

// 生成したメッセージと一緒に文字列を返す
//     return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
// };

// ゲームを終了
const gameOver = id => {

    // setIntervalの動作を取り消す
    clearInterval(id);

    // スコアの結果を出す
    // const result = confirm(rankCheck(score));

    setTimeout(() => {
        untypedfield.textContent = 'タイムアップ！';
    }, timer);

    // OKボタンをクリックされたらリロードする
    // if (result == true) {
    //     window.location.reload();
    // }
};

// カウントダウンタイマー
const timer = () => {

    // タイマー部分のHTML要素（p要素）を取得する
    let time = count.textContent;

    const id = setInterval(() => {

        // 時間がだんだん減っていく
        time--;
        count.textContent = time;

        // カウントが0になったらタイマーを停止する
        if (time <= 0) {
            gameOver(id);
        }
    }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

    // カウントダウンタイマーの開始
    timer();

    // ランダムなテキストの表示
    createText();

    // 非表示スタイルの適用
    start.style.display = 'none';

    // キーボードイベントの処理
    document.addEventListener('keypress', keyPress);
});

// スタート画面に表示される文字
untypedfield.textContent = 'スタートボタンで開始';