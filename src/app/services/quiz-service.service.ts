import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {
   // firebase dabase link
httpUrl='https://quiz-55438-default-rtdb.firebaseio.com/'
  constructor(private http:HttpClient) { }

// user
  async getUser()
{
  return this.http.get(this.httpUrl+'user.json')
}

async addUserData(obj)
{
  return this.http.put(this.httpUrl+'user.json',obj)

}

// winner
async getWinner()
{
  return this.http.get(this.httpUrl+'winner.json')
}

async addtWinnerData(obj)
{
  return this.http.put(this.httpUrl+'winner.json',obj)
}

// delete
// async deleteUserrData(id)
// {
//  this.
// }

}
