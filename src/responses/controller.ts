import {JsonController, Get, Post, HttpCode, Param, Body } from 'routing-controllers'
import Responses from './entity'
import * as request from 'superagent'

@JsonController()
export default class ResponsesController {

@Post('/responses')
@HttpCode(201)
async createResponse(
    @Body() response: Responses
) {
     await request
    .post('http://users:4003/teacher/')
    .send({id:Number(response.user_id)})
    .then(response2 => {
      const teacher = response2.body.user.teacher
      if(teacher === true || teacher === null) {
        throw new Error("User not allowed to save test results")
      } else {
        const responsetosend = {
        user_id: response.user_id,
        teacher: response.teacher,
        quiz_id: response.quiz_id,
        score: response.score
    }

    return request
    .post('http://webhooks:4004/postquizresult/')
    .send({qobject: responsetosend})
    .then(response2=> {
        response.save()
        return response2.text})
      }
    })
  }


@Get('/responses/user/:user_id')
getResponseUserId(
    @Param('user_id') user_id:number
){
    return Responses.findOne({where: {user_id}})
}



@Get('/responses')
async allResponses(){
    const responses = await Responses.find()
    return {responses}
}

@Get('/responses/:id')
getResponse(
    @Param('id') id:number
){
    return Responses.findOneById(id)
}

@Post('/responses/score')
@HttpCode(201)
createScore(
    @Body() answer:Responses
) {
    return answer.save()
}

@Get('/responses/score')
async allAnswers(){
    const answers = await Responses.find()
    return {answers}
}

@Get('/responses/:id/score')
getAnswer(
    @Param('id') id:number
){
    return Responses.findOneById(id)
}

// @Post('/logins')
// @HttpCode(201)
// createScore(
//     @Body() answer:{email,password}
// ) {
//     return answer
// }

}


// import { JsonController, Body, Post, BadRequestError } from 'routing-controllers'
// import User from '../entities/users'
//
// class AuthenticatePayload {
//   id?:number
// }
//
// @JsonController()
// export default class LoginController {
//
//   @Post('/teacher')
//   async authenticate(
//     @Body() {id}: AuthenticatePayload
//   ) {
//     const user = await User.findOne({ where: { id } })
//
//     if (!user) throw new BadRequestError('A user with this id does not exist')
//
//     return {user}
//   }
//
// }
