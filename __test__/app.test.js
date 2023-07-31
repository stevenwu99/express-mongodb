const request = require('supertest');
require('jest-sorted');
const app = require('../app');
const db = require('../db/connection');

/*
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data');
beforeEach(() => {
    return seed(data);
 });
 */

 
 afterAll(() => {
    return  db.connection.close();
 })


 //Search by username

 describe.only ('GET /api/users/:username',() => {
    test ('200:should return a single user by username',() => {
    return request(app)
    .get('/api/users/tomli2004')
    .expect(200)
    .then (({body}) => {
        const {user} = body
        expect(user).toHaveProperty("username", expect.any(String));
        expect(user).toHaveProperty("firstname", expect.any(String));
        expect(user).toHaveProperty("lastname", expect.any(String));
        expect(user.username).toEqual("tomli2004");
  
    })
  })

  test ("404:should return  an error respond when username is valid,but does not exist", () => {
    return request(app)
        .get('/api/users/tomZi500')
        .expect(404)
        .then(( {body} ) => {
            expect(body.msg).toBe("Not found");
        });
   });

})

// Post a new user

describe ('POST /api/users',() => {
    test ('201:should return a new user', () => {
        const new_user = {username:'kh2264',firstname:'st',lastname:'kh000'};
        return request(app)
        .post('/api/users')
        .send(new_user)
        .expect(201)
        .then (({body}) => {
            const {user} = body;
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("firstname", expect.any(String));
            expect(user).toHaveProperty("lastname", expect.any(String));
            expect(user).toHaveProperty("_id", expect.any(String));     
        })
    });

    test ('404:should return an error when user exist', () => {
        const new_user = {username:'kc2004',firstname:'ab',lastname:'kc2'};
        return request(app)
        .post('/api/users')
        .send(new_user)
        .expect(404)
        .then (({body}) => {
            expect(body.msg).toBe("User exist already");
        })
    });

    test ('201:should return a new user when add a new user with extra property', () => {
        const new_user = {username:'cc2265',firstname:'st',lastname:'kh000',sex:"M"};
        return request(app)
        .post('/api/users')
        .send(new_user)
        .expect(201)
        .then (({body}) => {
            const {user} = body;
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("firstname", expect.any(String));
            expect(user).toHaveProperty("lastname", expect.any(String));
            expect(user).toHaveProperty("_id", expect.any(String));     
        })
    });

    test ("422:should return an error respond when missing username property", () => {
        const new_user = {firstname:'ab',lastname:'kc2'};
        return request(app)
            .post("/api/users")
            .send(new_user)
            .expect(422)
            .then(({ body }) => {
                expect(body.msg).toBe("Unprocessable Entity");
            });
    });

    test ("422:should return an error respond when missing first name property", () => {
        const new_user = {username:'ab',lastname:'kc2'};
        return request(app)
            .post("/api/users")
            .send(new_user)
            .expect(422)
            .then(({ body }) => {
                expect(body.msg).toBe("Unprocessable Entity");
            });
    });
    test ("422:should return an error respond when missing last name property", () => {
        const new_user = {username:'ab',firstname:'kc2'};
        return request(app)
            .post("/api/users")
            .send(new_user)
            .expect(422)
            .then(({ body }) => {
                expect(body.msg).toBe("Unprocessable Entity");
            });
    });

})

//DELETE an user

describe ("DELETE /api/users/:username", () => {
	test ("204: should delete an user by username", () => {
	return request(app)
      .delete("/api/users/tomli2004")
      .expect(204)
  	});

    test ("404:should return an error respond when username is valid,but does not exist", () => {
        return request(app)
            .delete("/api/users/km201120")
             .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("User km201120 not found");
            });
    });

});