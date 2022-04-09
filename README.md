# URL Shortener

利用Node.js + Express打造的簡易縮網址網站
![index image](https://github.com/chriszychen/url-shortener/blob/main/public/images/url-shortener-index.PNG)

## Features

* 將較長的網址縮短成 BaseURL + 5碼隨機英數字  
Ex. [http://localhost:3000/Lyf7f](http://localhost:3000/Lyf7f)

## Prerequisites

* [Node.js v14.16.1](https://nodejs.org/en/)
* [MongoDB v4.2.13](https://www.mongodb.com/try/download/community)

## Installation and Execution

1.打開終端機，使用git clone將專案下載至本地資料夾

```sh
git clone https://github.com/chriszychen/url-shortener.git
```

2.進入專案資料夾

```sh
cd url-shortener
```

3.安裝專案需求套件

```sh
npm install 
```

4.啟動MongoDB資料庫

5.啟動伺服器

```sh
npm run start
```

終端機顯示 ```The App is running on http://localhost:3000``` 代表伺服器成功啟動  

顯示 ```mongodb connected!``` 代表伺服器成功與資料庫連接  

即可至瀏覽器網址輸入 [http://localhost:3000](http://localhost:3000) 使用專案功能
