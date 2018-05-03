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
    
    const responsetosend = {
        user_id: response.user_id,
        teacher: response.teacher,
        quiz_id: response.quiz_id,
        score: response.score
    }
        
    return await request
    .post('http://webhooks:4004/postquizresult/')
    .send({qobject: responsetosend})
    .then(response2=> {
        response.save()
        return response2.text})    
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

}

