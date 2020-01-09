const postHandlers = require('./index')

describe('Endpoints', () => {
    describe('users', () => {
        describe('post', () => {

            //it.skip salta este test
            it('should created', async() => {
            
                const mockUsers = [
                    { id: 1},
                    { id: 2}
                ]

                const post = {
                    userId: 1,
                    id: 1,
                    title: "Titulo",
                    body: "Cuerpo"
                }

                const req = {
                    body: post
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }

                const axios = {
                    get: jest.fn().mockResolvedValue({ data: mockUsers }),
                    post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
                }

                await postHandlers({ axios }).post(req,res)

                expect(res.status.mock.calls).toEqual([[201]])

                
                expect(axios.get.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/users/']
                ])
                
            
                expect(axios.post.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/posts/',post]
                ])
                
            });

            it('should not created if userId does not exist', async() => {
            
                const mockUsers = [
                    { id: 1},
                    { id: 2}
                ]

                const post = {
                    userId: 3,
                    title: "Titulo",
                    body: "Cuerpo"
                }

                const req = {
                    body: post
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn(),
                    sendStatus: jest.fn()
                }

                const axios = {
                    get: jest.fn().mockResolvedValue({ data: mockUsers }),
                    post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
                }

                await postHandlers({ axios }).post(req,res)

                expect(axios.post.mock.calls).toEqual([])
                expect(res.sendStatus.mock.calls).toEqual([
                    [400]
                ])
            });
        });
    });
});