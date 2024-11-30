# Google スプレッドシートのデータを表示する簡単なウェブサイト作成ハンズオン教材

本教材では、Google スプレッドシートのデータを表示するシンプルなウェブサイトを作成する方法を学びます。HTML、CSS、JavaScriptを用いたフロントエンドの作成から、Google Apps Script (GAS) を利用したバックエンドとの連携、さらにローカルサーバーでのホスティング時に発生するCORSエラーの解決方法まで、ステップバイステップで解説します。

---

## 目次

1. [この講座で学べる内容](#1-この講座で学べる内容)
2. [全体の流れ](#2-全体の流れ)
3. [ステップ1: Google スプレッドシートの準備](#3-ステップ1-google-スプレッドシートの準備)
4. [ステップ2: Google Apps Script (GAS) の設定](#4-ステップ2-google-apps-script-gas-の設定)
5. [ステップ3: フロントエンドの作成](#5-ステップ3-フロントエンドの作成)
6. [ステップ4: ローカルサーバーでホスティングする場合のCORSエラーの解決方法](#6-ステップ4-ローカルサーバーでホスティングする場合のcorsエラーの解決方法)
7. [ステップ5: サイトのテストとデバッグ](#7-ステップ5-サイトのテストとデバッグ)
8. [ステップ6: サイトの公開（オプション）](#8-ステップ6-サイトの公開オプション)
9. [まとめ](#9-まとめ)

---

## 1. この講座で学べる内容

この講座では、以下の内容を学びます：

1. **Google スプレッドシートの基礎**
   - データの入力と管理方法
   - シートの共有設定

2. **Google Apps Script (GAS) の基礎**
   - スクリプトエディタの使い方
   - スプレッドシートとの連携方法
   - エラーハンドリングとCORS対策

3. **HTMLの基礎**
   - 基本的なHTML構造
   - 要素の配置と階層構造

4. **CSSの基礎**
   - スタイルの適用方法
   - レスポンシブデザインの基本

5. **JavaScriptの基礎**
   - DOM操作
   - 非同期通信（Fetch API）

6. **フロントエンドとバックエンドの連携**
   - クライアントとサーバー間のデータ通信
   - CORSエラーの理解と解決方法

7. **サイトのホスティングと公開**
   - ローカルサーバーでのホスティング
   - GitHub Pages などを使った公開（オプション）

---

## 2. 全体の流れ

以下は、Google スプレッドシートのデータを表示するウェブサイトを作成するための全体的なステップです：

1. **Google スプレッドシートの準備**
2. **Google Apps Script (GAS) の設定**
3. **フロントエンドの作成（HTML/CSS/JavaScript）**
4. **ローカルサーバーでのホスティングとCORSエラーの解決**
5. **サイトのテストとデバッグ**
6. **サイトの公開（オプション）**

---

## 3. ステップ1: Google スプレッドシートの準備

### 1.1 スプレッドシートの作成

1. **Google スプレッドシートを作成**
   - [Google スプレッドシート](https://docs.google.com/spreadsheets/) にアクセスし、新しいスプレッドシートを作成します。
   - 例として、「Sheet1」に以下のようなデータを入力します。

    | 名前     | 年齢 | 職業       |
    |----------|------|------------|
    | 田中太郎 | 30   | エンジニア |
    | 鈴木花子 | 25   | デザイナー |

### 1.2 スプレッドシートのIDを取得

1. **スプレッドシートのURLからIDをコピー**
   - スプレッドシートのURLは以下のような形式です：
     ```
     https://docs.google.com/spreadsheets/d/スプレッドシートID/edit
     ```
   - `スプレッドシートID` 部分をコピーします。

---

## 4. ステップ2: Google Apps Script (GAS) の設定

### 2.1 GASプロジェクトの作成

1. **スプレッドシートの「拡張機能」メニューから「Apps Script」を選択**
   - スプレッドシートの上部メニューから「拡張機能」→「Apps Script」をクリックします。

### 2.2 コードの追加

1. **`Code.gs` に以下のコードを貼り付け、スプレッドシートIDを置き換えます**

    ```javascript
    function doGet(e) {
        try {
            const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
            const sheet = ss.getSheetByName('シート1');
            const data = sheet.getDataRange().getValues();

            const headers = data[0];
            const rows = data.slice(1);

            const result = {
                headers: headers,
                rows: rows
            };

            return ContentService
                .createTextOutput(JSON.stringify(result))
                .setMimeType(ContentService.MimeType.JSON);
        } catch (error) {
            const errorResponse = {
                error: error.toString()
            };
            return ContentService
                .createTextOutput(JSON.stringify(errorResponse))
                .setMimeType(ContentService.MimeType.JSON);
        }
    }
    ```

    **注意点:**
    - `YOUR_SPREADSHEET_ID` を実際のスプレッドシートIDに置き換えてください。

### 2.3 ウェブアプリとしてデプロイ

1. **デプロイ手順**
   - GASエディタの右上にある「デプロイ」ボタンをクリックし、「新しいデプロイ」を選択します。
   - 「種類」を「ウェブアプリ」に設定します。
   - 「説明」を入力（例: "初期デプロイ"）。
   - 「実行するユーザー」を「自分」に設定。
   - 「アクセスできるユーザー」を「全員（匿名ユーザーを含む）」に設定します。
   - 「デプロイ」をクリックし、生成されたURLをコピーします。

    **URL例:**
    ```
    https://script.google.com/macros/s/AKfycbwUQBK70f_dedDH-y8jnwHqGn-rvNGJGwm_CvCABoL-bR7w-mL20vzf2VXgTOyZbXi_Ug/exec
    ```

    このURLは後ほどフロントエンドのJavaScriptで使用します。

---

## 5. ステップ3: フロントエンドの作成

### 3.1 プロジェクトの構造

プロジェクトフォルダに以下のファイルを作成します：

- `index.html`
- `styles.css`
- `script.js`

### 3.2 `index.html` の作成

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>スプレッドシート表示サイト</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>スプレッドシートのデータ</h1>
    <table id="data-table">
        <thead>
            <tr id="table-header"></tr>
        </thead>
        <tbody id="table-body"></tbody>
    </table>

    <script src="script.js"></script>
</body>
</html>
```

### 3.3 `styles.css` の作成

```css
body {
    font-family: Arial, sans-serif;
    margin: 20px;
}

h1 {
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
```

### 3.4 `script.js` の作成

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // GASのウェブアプリURLに置き換えてください
    const GAS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    console.log('Fetching data from GAS...');
    fetch(GAS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        console.log('Response received:', response);
        return response.json();
    })
    .then(data => {
        console.log('Data parsed:', data);
        if (data.error) {
            console.error('Error from GAS:', data.error);
            return;
        }

        const header = document.getElementById('table-header');
        const body = document.getElementById('table-body');

        // ヘッダーの作成
        data.headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            header.appendChild(th);
        });

        // データ行の作成
        data.rows.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            body.appendChild(tr);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});
```

**注意点:**
- `YOUR_SCRIPT_ID` をGASから取得したウェブアプリのURLに置き換えてください。

---

## 6. ステップ4: ローカルサーバーでホスティングする場合のCORSエラーの解決方法

ローカルサーバーでホスティングする際に、Google Apps Script (GAS) のエンドポイントに対してリクエストを送信すると、ブラウザのセキュリティポリシーによりCORS（クロスオリジンリソースシェアリング）エラーが発生することがあります。このセクションでは、ローカルサーバーでホスティングする際のCORSエラーの原因と解決方法について詳しく説明します。

### 4.1 CORSエラーの原因理解

**CORSエラーの概要:**
CORSは、ウェブページが自分のオリジン（ドメイン、プロトコル、ポート）とは異なるオリジンにリクエストを送信する際に、セキュリティ上の制約を設けるブラウザの機能です。これにより、不正なクロスサイトリクエストが防止されます。

**主な原因:**
1. **プリフライトリクエストの発生**
   - 特定のリクエスト（例: `POST` メソッド、特定のヘッダーを含むリクエスト）は、ブラウザが事前に `OPTIONS` リクエスト（プリフライトリクエスト）を送信し、サーバーがCORSを許可しているか確認します。
   - GASのエンドポイントがこれらのプリフライトリクエストを適切に処理しない場合、CORSエラーが発生します。

2. **GASコード内のエラー**
   - GAS側でエラーが発生すると、正常なレスポンスに含まれるCORSヘッダーが欠如し、ブラウザがCORSエラーとして扱います。

### 4.2 解決策の概要

ローカルサーバーからGASエンドポイントにリクエストを送信する際のCORSエラーを解決するためには、以下の点に注意する必要があります：

- **シンプルリクエストの使用**: プリフライトリクエストを発生させないシンプルなGETリクエストを使用します。
- **GASコードのエラーハンドリング強化**: GAS側でエラーが発生しないようにし、常に適切なレスポンスを返すようにします。
- **プロキシサーバーの利用（オプション）**: 必要に応じてCORSを回避するためのプロキシサーバーを設定します。

### 4.3 ステップバイステップの解決策

以下の手順に従って、ローカルサーバーでホスティングする際のCORSエラーを解決します。

#### ステップ1: フロントエンドのリクエストをシンプルなGETに変更

CORSプリフライトを回避するために、フロントエンドからGASへのリクエストをシンプルなGETリクエストに制限します。

**`script.js` の修正:**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // GASのウェブアプリURLに置き換えてください
    const GAS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    console.log('Fetching data from GAS...');
    fetch(GAS_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // シンプルなContent-Type
        }
    })
    .then(response => {
        console.log('Response received:', response);
        return response.json();
    })
    .then(data => {
        console.log('Data parsed:', data);
        if (data.error) {
            console.error('Error from GAS:', data.error);
            return;
        }

        const header = document.getElementById('table-header');
        const body = document.getElementById('table-body');

        // ヘッダーの作成
        data.headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            header.appendChild(th);
        });

        // データ行の作成
        data.rows.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            body.appendChild(tr);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});
```

**ポイント:**

- **メソッドをGETに設定**: デフォルトではGETですが、明示的に指定することで明確にします。
- **Content-Typeをシンプルに**: `application/x-www-form-urlencoded` はシンプルなリクエストとして扱われ、プリフライトを回避できます。

#### ステップ2: GASコードのエラーハンドリング強化

GAS側でエラーが発生しないように、`doGet` 関数内で適切なエラーハンドリングを行い、常にJSON形式のレスポンスを返すようにします。これにより、エラー時にもCORSヘッダーが含まれる可能性が高まります。

**`Code.gs` の修正:**

```javascript
function doGet(e) {
    try {
        const ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
        const sheet = ss.getSheetByName('Sheet1');
        const data = sheet.getDataRange().getValues();

        const headers = data[0];
        const rows = data.slice(1);

        const result = {
            headers: headers,
            rows: rows
        };

        return ContentService
            .createTextOutput(JSON.stringify(result))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        const errorResponse = {
            error: error.toString()
        };
        return ContentService
            .createTextOutput(JSON.stringify(errorResponse))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
```

**ポイント:**

- **`try...catch` ブロックの追加**: エラーが発生した場合でも、JSON形式のレスポンスを返すようにします。
- **エラーメッセージの返却**: フロントエンドでエラーメッセージを確認できるようにします。

#### ステップ3: フロントエンドとバックエンドを同一オリジンでホスティングする（オプション）

CORSエラーを根本的に回避するために、フロントエンドとバックエンドを同一オリジンでホスティングする方法もあります。ただし、今回はローカルサーバーでフロントエンドをホスティングするため、この方法はオプションとして紹介します。

**手順:**

1. **GASプロジェクトにフロントエンドファイルを追加**
   - GASエディタの左側の「ファイル」メニューから「新しいHTMLファイル」を選択し、`index.html`、`styles.css`、`script.js` を作成します。

2. **`script.js` の修正**
   - `fetch` を使用せず、`google.script.run` を利用してサーバーサイドの関数を呼び出します。

    ```javascript
    document.addEventListener('DOMContentLoaded', function() {
        google.script.run.withSuccessHandler(function(data) {
            if (data.error) {
                console.error('Error from GAS:', data.error);
                return;
            }

            const header = document.getElementById('table-header');
            const body = document.getElementById('table-body');

            // ヘッダーの作成
            data.headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                header.appendChild(th);
            });

            // データ行の作成
            data.rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                body.appendChild(tr);
            });
        }).getData();
    });
    ```

3. **`doGet` 関数の修正**
   - フロントエンドをGASで提供するため、`doGet` 関数を以下のように設定します。

    ```javascript
    function doGet(e) {
        return HtmlService.createHtmlOutputFromFile('index');
    }
    ```

4. **ウェブアプリとして再デプロイ**
   - 上記と同様に、ウェブアプリとして再デプロイします。

**注意点:**
- この方法では、フロントエンドとバックエンドが同一オリジンとなるため、CORSエラーは発生しません。ただし、フロントエンドをローカルサーバーでホスティングしたい場合には適用できません。

#### ステップ4: プロキシサーバーの利用（オプション）

ローカルサーバーからGASエンドポイントにリクエストを送信する際にCORSエラーが発生する場合、プロキシサーバーを利用してCORSヘッダーを付加する方法があります。以下は、Node.jsを使用した簡単なプロキシサーバーの例です。

**手順:**

1. **Node.jsのインストール**
   - [Node.js](https://nodejs.org/) をインストールします。

2. **プロキシサーバーの作成**
   - プロジェクトフォルダ内に新しいファイル `proxy.js` を作成し、以下のコードを貼り付けます。

    ```javascript
    const express = require('express');
    const request = require('request');
    const cors = require('cors');

    const app = express();
    const PORT = 3000; // 任意のポート番号
    const GAS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    app.use(cors());

    app.get('/api/data', (req, res) => {
        request(
            {
                url: GAS_URL,
                method: 'GET',
                json: true
            },
            (error, response, body) => {
                if (error) {
                    return res.status(500).json({ error: 'Error fetching data from GAS' });
                }
                res.json(body);
            }
        );
    });

    app.listen(PORT, () => {
        console.log(`Proxy server is running on http://localhost:${PORT}`);
    });
    ```

    **ポイント:**
    - `YOUR_SCRIPT_ID` をGASのウェブアプリURLに置き換えます。
    - このプロキシサーバーは、ローカルサーバーからのリクエストをGASに転送し、CORSヘッダーを付加します。

3. **必要なパッケージのインストール**
   - ターミナルでプロジェクトフォルダに移動し、以下のコマンドを実行します。

    ```bash
    npm init -y
    npm install express request cors
    ```

4. **プロキシサーバーの起動**
   - ターミナルで以下のコマンドを実行してプロキシサーバーを起動します。

    ```bash
    node proxy.js
    ```

5. **フロントエンドの`script.js`を修正**

    ```javascript
    document.addEventListener('DOMContentLoaded', function() {
        // プロキシサーバーのURLに置き換えてください
        const PROXY_URL = 'http://localhost:3000/api/data';

        console.log('Fetching data from Proxy...');
        fetch(PROXY_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            console.log('Response received:', response);
            return response.json();
        })
        .then(data => {
            console.log('Data parsed:', data);
            if (data.error) {
                console.error('Error from Proxy:', data.error);
                return;
            }

            const header = document.getElementById('table-header');
            const body = document.getElementById('table-body');

            // ヘッダーの作成
            data.headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                header.appendChild(th);
            });

            // データ行の作成
            data.rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                body.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    });
    ```

    **ポイント:**
    - `PROXY_URL` をローカルプロキシサーバーのURLに置き換えます（例: `http://localhost:3000/api/data`）。

**注意点:**
- プロキシサーバーは開発環境での利用を目的としています。セキュリティやパフォーマンスの観点から、本番環境では適切なCORS設定を行うか、別の方法を検討してください。

#### ステップ5: ブラウザのCORSポリシーを一時的に無効化（開発用途のみ）

開発中にCORSエラーを一時的に回避する方法として、ブラウザのCORSポリシーを無効化することが考えられます。ただし、これはセキュリティリスクが伴うため、あくまで開発時のみ利用し、本番環境では絶対に行わないでください。

**例: Google Chromeの場合**

1. **ショートカットの作成**
   - Chromeのショートカットを右クリックし、「プロパティ」を選択します。
2. **コマンドラインオプションの追加**
   - 「リンク先」に以下のオプションを追加します：
     ```
     --disable-web-security --user-data-dir="C:/ChromeDev"
     ```
   - 完全な例：
     ```
     "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDev"
     ```
3. **ショートカットを使用してChromeを起動**
   - このショートカットを使用してChromeを起動すると、CORSポリシーが無効化されます。

**注意点:**
- この方法はセキュリティ上非常に危険です。開発終了後は必ず通常の方法でブラウザを再起動してください。

---

## 7. ステップ5: サイトのテストとデバッグ

### 5.1 サイトの確認

1. **ローカルサーバーを起動**
   - お使いのローカルサーバー（例: VSCodeのLive Server拡張、PythonのSimpleHTTPServerなど）を起動し、`index.html` をブラウザで開きます。

2. **データの表示確認**
   - スプレッドシートのデータが正しくテーブルとして表示されていることを確認します。

### 5.2 デバッグ方法

#### 1. GASエンドポイントのテスト

- **GASのウェブアプリURLを直接ブラウザで開き、JSONデータが正しく表示されるか確認します。**
  - **成功時**: スプレッドシートのデータがJSON形式で表示されます。
  - **エラー時**: エラーメッセージがJSON形式で表示されます。

#### 2. ブラウザのデベロッパーツールの活用

- **デベロッパーツールの開き方**
  - ブラウザでページを開き、`F12`キーを押してデベロッパーツールを開きます。

- **Consoleタブ**
  - JavaScriptのエラーメッセージや`console.log`の出力を確認します。

- **Networkタブ**
  - Fetchリクエストが正しく送信され、レスポンスが返ってきているか確認します。

#### 3. コンソールログの追加

`script.js` に `console.log` を追加して、各ステップでのデータフローを確認します。

**例:**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fetching data from GAS...');
    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        console.log('Response received:', response);
        return response.json();
    })
    .then(data => {
        console.log('Data parsed:', data);
        if (data.error) {
            console.error('Error from GAS:', data.error);
            return;
        }

        const header = document.getElementById('table-header');
        const body = document.getElementById('table-body');

        // ヘッダーの作成
        data.headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            header.appendChild(th);
        });

        // データ行の作成
        data.rows.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            body.appendChild(tr);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});
```

#### 4. GASのログ確認

- GASエディタで「表示」→「ログ」を開き、サーバー側でエラーが発生していないか確認します。

---

## 8. ステップ6: サイトの公開（オプション）

### 6.1 GitHub Pagesを利用して公開

ローカルで動作確認ができたら、サイトを公開するためにGitHub Pagesを利用することができます。

1. **GitHubリポジトリの作成**
   - GitHubで新しいリポジトリを作成します。

2. **プロジェクトファイルをリポジトリにプッシュ**
   - `index.html`、`styles.css`、`script.js` をリポジトリにアップロードします。

3. **GitHub Pagesの設定**
   - リポジトリの「Settings」→「Pages」を開きます。
   - 「Source」を「main branch」に設定し、「Save」をクリックします。
   - 数分後に公開URLが生成されます。

### 6.2 カスタムドメインの設定（オプション）

1. **ドメインの購入**
   - ドメインを購入していない場合は、ドメインレジストラから購入します。

2. **DNS設定の変更**
   - GitHub Pagesのドキュメントに従って、DNS設定を変更します。

3. **GitHub Pagesにカスタムドメインを設定**
   - リポジトリの「Settings」→「Pages」→「Custom domain」に購入したドメインを入力します。

**参考資料:**
- [GitHub Pages 公式ドキュメント](https://docs.github.com/ja/pages)

---

## 9. まとめ

本教材では、Google スプレッドシートのデータを表示するシンプルなウェブサイトを作成する方法を学びました。以下のステップを通じて、HTML、CSS、JavaScriptを用いたフロントエンドの作成から、Google Apps Scriptを利用したバックエンドとの連携、さらにローカルサーバーでのホスティング時に発生するCORSエラーの解決方法までを網羅しました。

### 学習ポイント

1. **Google スプレッドシートのデータを取得し、ウェブサイトに表示する方法**
2. **Google Apps Script (GAS) を用いたバックエンドの構築**
3. **フロントエンド（HTML/CSS/JavaScript）の基本的な作成方法**
4. **ローカルサーバーでのホスティングとCORSエラーの理解・解決**
5. **サイトの公開方法（オプション）**

### 次のステップ

- **機能拡張**: フィルタリングや検索機能を追加して、データの操作性を向上させましょう。
- **セキュリティ強化**: ユーザー認証を導入して、特定のユーザーのみがデータにアクセスできるようにします。
- **デザインの改善**: CSSを用いて、より魅力的で使いやすいデザインに仕上げましょう。

本教材を通じて、ウェブ開発の基礎を習得し、実際に動作するサイトを構築するスキルを身につけてください。質問や問題があれば、具体的な内容を共有していただければ、さらに詳しくサポートいたします。

---

# 参考資料

- [MDN Web Docs: CORS](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)
- [Google Apps Script: doGet と doPost の詳細](https://developers.google.com/apps-script/guides/web)
- [GitHub Pages 公式ドキュメント](https://docs.github.com/ja/pages)