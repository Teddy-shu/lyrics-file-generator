"# lyrics-file-generator" 


## self note
```
使用:
  此程式用來產生一個含有歌名、歌詞、歌詞出現時刻的JSON檔
  CML輸入npm run start
  輸入歌名
  輸入一行歌詞(input line)與時間(input time)(單位millisecond)
  ***當歌詞內有分行字元，程式會自動新增一行，所以可以一口氣複製整份歌詞貼到(input line)，程式會自動分行***
  click insert new line => 在當行歌詞下新增一行空歌詞
  click deletethis line => 刪除當行歌詞
  click add new line => 於最下新增一行空歌詞
  click see result => 產生預覽的歌詞
  click close => 關閉預覽視窗
  click output => 下載結果JSON檔
  ***下載檔案存於瀏覽器預設的位址(client端儲存) ex: (C:\user\Downloads) ***
  
  ***下載檔案 檔案名為 "歌名".json***
  ***檔案內容為 { "lyrics":[ {"line": "一行歌詞", "time": "歌詞出現時刻(單位millisecond)"},... ] }***
  
開發工具 :
  nodejs
  react
  
開發解說 :
  App.js: 
    使用react Component
    constructor 初始化state, constructor function 必須 super(props); react才收得到這個Component的state
    Component的function 用 bind(this) 的方式把 this 指定為此Component物件
    用setState 更新state資料並render頁面
    
    output檔案用Blob物件設定資料格式為JSON
    window.navigator.msSaveOrOpenBlob //用來檢查瀏覽器有無支援Blob物件
    有的話用 => window.navigator.msSaveBlob(blob, songName + ".json"); //save檔案locally
    沒有的話 => var elem = window.document.createElement('a'); //先產生一個element
                elem.href = window.URL.createObjectURL(blob); //把blob物件封成ObjectURL
                elem.download = songName + ".json"; //設定檔案名
                document.body.appendChild(elem); //產生一個可以下載blob的物件
                elem.click(); //用指令觸發點擊此物件下載檔案
                document.body.removeChild(elem); //刪除此下載物件
```
