// 複数の関数で使用する変数群
let sFinish;
let intervalId;
// スタートボタンがクリックされたらstartTimer処理を呼び出す
let startButton = document.querySelector("#start-button");
startButton.addEventListener("click", startTimer);
// ストップボタンがクリックされたらstopTimer処理を呼び出す
let stopButton = document.querySelector("#stop-button");
stopButton.addEventListener("click", stopTimer);

// タイマー開始
function startTimer() {
    // input要素を取得
    let h = 0;    // 時間
    let m = 0;    // 分
    let s = 0;    // 秒
    let sFromH = 0;
    let sFromM = 0;

    if (document.querySelector("#h-input").value) {
        h = parseInt(document.querySelector("#h-input").value);
    }
    if (document.querySelector("#m-input").value) {
        m = parseInt(document.querySelector("#m-input").value);
    }
    if (document.querySelector("#s-input").value) {
        s = parseInt(document.querySelector("#s-input").value);
    }

    // 時間 -> 秒 換算
    sFromH = h * 3600;
    // 分 -> 秒 換算
    sFromM = m * 60;
    // 合計秒数
    s += sFromH + sFromM;

    // 開始時刻とタイマー時間を合計して終了時刻を求める
    sFinish = Date.now() + s * 1000;

    intervalId = setInterval(checkRemainingTime, 50);    //50ミリ秒ごとに呼出し

    // スタートボタンOFF
    startButton.disabled = true;
}

// タイマー終了
function stopTimer() {
    clearInterval(intervalId);  //checkRemainingTime関数終了

    // 残時間リセット
    setDisplay(0);

    // スタートボタンON
    startButton.disabled = false;
}

// 残秒数チェック
function checkRemainingTime() {
    let sRemain = sFinish - Date.now();

    // 残時間表示
    let s = Math.floor(sRemain / 1000) + 1;  //小数点以下切り捨て+1
    setDisplay(s);

    // 残時間 0以下 になったらタイマー終了
    if (sRemain <= 0) {
        stopTimer();
        alert("時間になりました。タイマーを終了します");
    }
}

// 残時間表示
function setDisplay(s) {
    let countDown = document.querySelector("#count-down");
    let hmsRemain = toHms(s);
    countDown.textContent = hmsRemain;
}

function toHms(sec) {
    let hms = "";
    let h = sec / 3600 | 0;
    let m = sec % 3600 / 60 | 0;
    let s = sec % 60;

    if (h != 0) {
        hms = h + " 時間 " + m + " 分 " + s + " 秒";
    } else if (m != 0) {
        hms = m + " 分 " + s + " 秒";
    } else {
        hms = s + " 秒";
    }

    return hms;
}
