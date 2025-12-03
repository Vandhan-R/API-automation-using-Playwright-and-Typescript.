import {test,expect} from'@playwright/test'

test('sending POST request',async ({request})=> {


    const reqbody= {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01",
    },
    "additionalneeds" : "Breakfast"
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
expect(jsonbody.booking).toMatchObject({firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
    additionalneeds: 'Breakfast'})

    
})