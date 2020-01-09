
const handlers = ({ axios }) => ({

    post: async(req, res) => {
        const { data:users } = await axios.get('https://jsonplaceholder.typicode.com/users/');

        //Evaluamos el caso de encontrar usuario y no encontrado
        const found = users.find( x=> x.id == req.body.userId);
        if(found)
        {
            const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts/', req.body);
            return res.status(201).send(data);
        }
        res.sendStatus(400);
    },

})

module.exports = handlers