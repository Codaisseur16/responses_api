import {JsonController, Get, Post, HttpCode, Param, Body } from 'routing-controllers'
import {Responses} from './entity'


@JsonController()
export default class ResponsesController {

@Post('/responses')
@HttpCode(201)
createResponse(
    @Body() response:Responses
) {
    return response.save()
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
    return Responses.findOne(id)
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

@Get('/responses/score/:id')
getAnswer(
    @Param('id') id:number
){
    return Responses.findOne(id)
}

}

