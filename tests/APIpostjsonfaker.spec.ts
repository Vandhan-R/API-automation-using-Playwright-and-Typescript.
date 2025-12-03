//install faker library to generate dynamic data,  npm install @faker-js/faker
// install luxon for working with dates and times , npm install luxon

import {test,expect} from'@playwright/test'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon';

test('sending POST request using faker library',async ({request})=> {

 // generating the random data
 const FirstName=faker.person.firstName()
 const LastName=faker.person.lastName()
 const TotalPrice=faker.number.int({min:100,max:200})
 const DepositPaid=faker.datatype.boolean()
 const CheckIn=DateTime.now().toFormat("yyyy-MM-dd")
 const Checkout=DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd")
 const AdditionalDetail=faker.lorem.word()

    const reqbody= {
    "firstname" : FirstName,
    "lastname" :LastName,
    "totalprice" : TotalPrice,
    "depositpaid" : DepositPaid,
    "bookingdates" : {
        "checkin" : CheckIn,
        "checkout" : Checkout,
    },
    "additionalneeds" : AdditionalDetail
    }
  const postresponse= await request.post('/booking',{data:reqbody})
  //console.log(postresponse)

  // validating only json body
  const jsonbody=await postresponse.json()
  console.log(jsonbody)
 
//validating the response code
expect(postresponse.ok()).toBeTruthy()
expect(postresponse.status()).toBe(200)

//validate json response 
expect(jsonbody).toHaveProperty('bookingid')
expect(jsonbody).toHaveProperty('booking')
expect(jsonbody).toHaveProperty('booking.additionalneeds')

//validate response structure
expect(jsonbody.booking).toMatchObject({
    "firstname" : FirstName,
    "lastname" :LastName,
    "totalprice" : TotalPrice,
    "depositpaid" : DepositPaid,
    "bookingdates" : {
        "checkin" : CheckIn,
        "checkout" : Checkout,
    },
    "additionalneeds" : AdditionalDetail
    }
)

})