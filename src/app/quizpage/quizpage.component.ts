import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { QuizServiceService } from '../services/quiz-service.service';


import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-quizpage',
  templateUrl: './quizpage.component.html',
  styleUrls: ['./quizpage.component.css']
})
export class QuizpageComponent implements OnInit {

constructor(private http: HttpClient, private quizService: QuizServiceService)
{}


@ViewChild(MatPaginator, {static: false})
set paginator(value: MatPaginator) {
  if (this.datasource){
    this.datasource.paginator = value;
  }
}
@ViewChild('paginator1', { static: false }) paginator1: MatPaginator;

@ViewChild(MatSort, {static: false})
set sort(value: MatSort) {
  if (this.datasource){
    this.datasource.sort = value;
  }
}
@ViewChild('sortCol2', { static: false }) sortCol2: MatSort;

displayedColumns= ['sr_no', 'name', 'age', 'score', 'action'];
datasource
dataSource1
userList=[]
user_list_from_user=[]
list_for_save=[]

// userList1=[
//   {
//    name:'Ranjeet', age: 22, score:100, id: 1
//   },
//   {
//    name:'Pankaj', age: 21, score:90, id: 2
//   },
//   {
//    name:'Ramanand', age: 20, score:80, id: 3
//   },
//   {
//    name:'Anamika', age: 23, score:70, id: 4
//   },
//   {
//    name:'Aniruddh', age: 25, score:60, id: 5
//   },
//   {
//    name:'Saket',   age: 12, score:50, id: 6
//   }

// ]
winnerList=[
  // {
  // id: 1, name:'Ranjeet', age: 22, score:100
  // },
  // {
  // id: 2, name:'Pankaj', age: 21, score:90
  // },
  // {
  // id: 3, name:'Ramanand', age: 20, score:80
  // },
  // {
  // id: 4, name:'Anamika', age: 23, score:70
  // },
  // {
  // id: 5, name:'Aniruddh', age: 25, score:60
  // },
  // {
  // id: 6, name:'Saket',   age: 12, score:50
  // }

]

topperList=[]
userUnder21List=[]
headerData=''

 // firebase dabase link
httpUral='https://quiz-55438-default-rtdb.firebaseio.com'

addUser:boolean=false;
userlist:boolean=false;
winnerlist:boolean=false;
topperlist:boolean=false;
under21:boolean=false;

userSaveObj={}


async ngOnInit(){
this.addUser=true;
await this.getUserData()
await this.getWinnerData()


}

// get user data from firebase

async getUserData()
{


 let resp= (await this.quizService.getUser()).subscribe( async (resp)=>{
    // console.log(resp);
    this.userList=[];
    this.list_for_save=[]
    this.userList.push(resp)
    this.list_for_save.push(resp)
    if(this.userlist==true)
    {
      await this.addWinnerDataToUserList()
    }
   console.log("this is hte user data ",resp)
    ,

    (err)=>console.log(err)
  })



}

async addWinnerDataToUserList()
{
  let resp1=(await this.quizService.getWinner()).subscribe((res1)=>{
    // this.userList[0].push([...new Set(res1)])
    let data= [];
    data.push(res1)
   console.log("this is the resp all user", data, this.userList)
  for(let i of data[0] )
  {
    this.userList[0].push(i)
  }
    this.dataSource1 = new MatTableDataSource(this.userList[0])
    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sortCol2 ,

    (error)=> console.log(error);
  })
}




async getWinnerData()
{
  this.winnerList=[]
    let resp= (await this.quizService.getWinner()).subscribe((resp)=>{
        // console.log("winner data  resp--",resp)
        this.winnerList.push(resp)

        this.dataSource1=new MatTableDataSource()
        this.dataSource1 = new MatTableDataSource(this.winnerList[0])
        this.dataSource1.paginator = this.paginator1;
        this.dataSource1.sort = this.sortCol2;
       console.log(" this is hte winnwe data ", resp)

        ,
      (error)=> Error;
    })
}

// Add  user

async saveUser()
{


 console.log('this is the user save data ', this.userSaveObj)
 console.log('Save data in lidt for save  ', this.list_for_save)

 this.list_for_save[0].push(this.userSaveObj);
  console.log(" this data goes to save ",  this.list_for_save[0]);
  let resp= (await this.quizService.addUserData( this.list_for_save[0])).subscribe(async (resp)=>{
    console.log(resp)
    Swal.fire("Success","User Save", 'success');
    await this.getUserData()
   this.userSaveObj={}
    ,
    (error)=>console.log(error)
  })

//  (error)=> console.log(error)
}


async add_User()
{
  this.addUser=true
  this.userlist=false
  this.winnerlist=false
  this.topperlist=false
  this.under21=false
this.userSaveObj={}
await this.getUserData()
}

 // Registered's User

async  getAllUser()
 {

  this.addUser=false
  this.userlist=true
  this.winnerlist=false
  this.topperlist=false;
  this.under21=false
  this.headerData='All User List'
  await this.getUserData()

 }
async  winnewButton(data)
 {
    console.log(" this isthe winnew button ", data)

    Swal.fire({
      title: 'Are you sure?',
      text: "Add To Winner List!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add it!'
    }).then(async (result) => {
      if (result.isConfirmed) {


        this.winnerList[0].push(data)
        console.log("this is hte winer list data goes to save ", this.winnerList[0]);
      let resp=  (await this.quizService.addtWinnerData(this.winnerList[0])).subscribe((resp)=>{
          Swal.fire(
            'Added!',
            'User Added.',
            'success'
          )
           this.deleteButton(data),
          (error)=> console.log(error);
        })

      }
    })
    console.log(" this is the push data in winner list ", this.winnerlist)
 }

// Required User

async userUnder21()
{

this.addUser=false;
this.userlist=false
this.winnerlist=false;
this.topperlist=false
this.under21=true
this.headerData='User List Under 21'

let resp= (await this.quizService.getUser()).subscribe((resp)=>{
  // console.log(resp);
  // this.user_list_from_user.push(resp)
 console.log("this is hte user data for under 21 ",resp);
 this.user_list_from_user=[]
 this.user_list_from_user.push(resp)
 this.userUnder21List=[]
 for(let i in  resp)
 {
     if( resp[i]['age']>=21)
     {
       this.userUnder21List.push( resp[i])
     }
 }

 if(this.userUnder21List.length==0)
 {
  Swal.fire("Info",'No User Under Age Of 21 Please Add More User', 'info')

 }
 this.dataSource1=new MatTableDataSource()
 this.dataSource1 = new MatTableDataSource(this.userUnder21List)
 this.dataSource1.paginator = this.paginator1;
 this.dataSource1.sort = this.sortCol2
  ,

  (err)=>console.log(err)
})


console.log(" this is the required data lisrt  ", this.userUnder21List)



}







// winner tab

async getWinnerList()
{
 console.log("this is the get winner List   ")

 this.userlist=false
 this.topperlist=false;
 this.winnerlist=true
this.addUser=false;
this.under21=false
 this.headerData='Winner List'
await this.getWinnerData()



}
 async topperButton(data)
 {
    console.log("Topper button hit ", data)
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want TO Add Topper List!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Added!',
          'User Added In Topper List',
          'success'
        )
        this.topperList.push(data)
      }
    })


 }


// topper list
async getTopperList()
{
console.log("this is the get topper ")
this.addUser=false
this.userlist=false
this.winnerlist=false
this.topperlist=true;
this.under21=false
this.headerData=' Topper List'
this.topperList=[]
for(let i in this.userList[0])
{
    if(this.userList[0][i]['score']>=90)
    {
      this.topperList.push(this.userList[0][i])
    }
}


this.dataSource1=new MatTableDataSource()
this.dataSource1 = new MatTableDataSource(this.topperList)
this.dataSource1.paginator = this.paginator1;
this.dataSource1.sort = this.sortCol2;

}



// delete button
async deleteButton(data)
{

    await this.finalyDelete(data)
}


async finalyDelete(data)
{
 //this.userUnder21List
 let i
 for(  i in this.user_list_from_user[0])
 {

     if(this.user_list_from_user[0][i]['name']==data.name)
     {
         this.user_list_from_user[0].splice(i,1)
     }
 }
 console.log("thi is hte user_list_from_user data  goes to delete", this.user_list_from_user[0]);

 let resp= (await this.quizService.addUserData(this.user_list_from_user[0])).subscribe(async (resp)=>{
   // console.log(resp)
   // await this.getAllUser(),
   await this.getWinnerList(),
   (error)=>console.log(error)
 })
}



// filter data

applyFilter1(filterValue: string) {
  this.dataSource1.filter = filterValue.trim().toLowerCase();
}






}
