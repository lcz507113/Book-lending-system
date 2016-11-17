//引入express框架
var express = require('express')

// var db = require('mongoose')

var app = express()
//设置当前文件夹的www为静态目录


//数据库
var mongoose = require('mongoose')
mongoose.Promise = Promise
var Schema = mongoose.Schema//通过它可以定义数据库model的相关内容
mongoose.connect('mongodb://localhost/books_db')
var bookSchema = new Schema({
    title:String,
    price:{
        type:Number,
        default:0
    },
    author:{
        type:String,
        default:''
    },
    publisher:String,
    img:String,
    link:String
    
})
//创建数据库模型
var DangDangBook = mongoose.model('dangdang_book',bookSchema)

// DangDangBook.find({}).limit(1)
//     .then(function(book){
//         console.log(book)
//     })

app.use(express.static('./www'))

app.get('/api/v1/books/get_books/:page?',function(req,res){
    var currentPage = 1;
    if(req.params.page){
        currentPage = Number(req.params.page)
    }
    if(currentPage<=0){
        currentPage = 1;
    }
    var resultData = {}
    var bookData = []
    DangDangBook.find({}).limit(50)
        .then(function (querybookData) {
            bookData = querybookData;
            console.log(bookData)
            console.log('查询成功')
             console.log('页面输出完毕')
            resultData.code = 200;
            resultData.page = currentPage;
             resultData.data = bookData
             res.json(resultData)
          })
         

    //输出一个json的内容
    // res.json({
    //     code:200,
    //     page:req.params.page,
    //     book_data:[{title:'从你的全世界路过'}]
    // })
    // res.send('访问的是数据接口,当前的参数为'+req.params.page)
})

app.listen(1000,function(){
    console.log('端口1000')
})