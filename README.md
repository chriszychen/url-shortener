# Expense Tracker
利用Node.js + Express打造的簡易縮網址網站
![index image](https://github.com/chriszychen/url-shortener/blob/main/public/images/url-shortener-index.PNG)

## Features - 專案功能描述

* 將較長的網址縮短成 BaseURL + 5碼隨機英數字 
Ex. http://localhost:3000/Lyf7f

## Prerequisites - 環境建置與需求

* [Node.js v14.16.1](https://nodejs.org/en/)
* [MongoDB v4.2.14](https://www.mongodb.com/try/download/community)

## Installation and Execution - 安裝與執行步驟
1.打開終端機，使用git clone將專案下載至本地資料夾
```
git clone https://github.com/chriszychen/url-shortener.git
```

2.進入專案資料夾
```
cd url-shortener
```

3.安裝專案需求套件
```
npm install 
```

4.啟動MongoDB資料庫

5.啟動伺服器
```
npm run start
```

終端機顯示 ```The App is running on http://localhost:3000``` 代表伺服器成功啟動<br/>
顯示 ```mongodb connected!``` 代表伺服器成功與資料庫連接 <br/>

即可至瀏覽器網址輸入 http://localhost:3000 使用專案功能
