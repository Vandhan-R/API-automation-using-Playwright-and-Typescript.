// install ajv ,  npm install --save-dev playwright ajv


import {test,expect} from '@playwright/test'
import Ajv from 'ajv'

test('Schema validation',async({request})=>{

const response=await request.get('https://mocktarget.apigee.net/json')
const jsonresponse=await response.json()
console.log(jsonresponse)
const Schema= 
{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    }
  },
  "required": [
    "firstName",
    "lastName",
    "city",
    "state"
  ]
}

const ajv= new Ajv() // create a object
const validator= ajv.compile(Schema) // call the ompile method and pass the schema , returns validate function
const isvalid=validator(jsonresponse)
expect(isvalid).toBeTruthy()

})

test('Schema validation2',async({request})=>{

const response=await request.get('https://jsonplaceholder.typicode.com/posts/1')
const jsonresponse=await response.json()
console.log(jsonresponse)
const Schema= {
  "type": "object",
  "properties": {
    "userId": {
      "type": "number"
    },
    "id": {
      "type": "number"
    },
    "title": {
      "type": "string"
    },
    "body": {
      "type": "string"
    }
  },
  "required": [
    "userId",
    "id",
    "title",
    "body"
  ]
}
const ajv= new Ajv() // create a object
const validator= ajv.compile(Schema) // call the ompile method and pass the schema , returns validate function
const isvalid=validator(jsonresponse)
expect(isvalid).toBeTruthy()
})

