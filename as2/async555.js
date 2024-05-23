// async  -- делает функцию такой, которая должна вернуть промис
// await  -- замораживает код и ждем выполнения того перед чем написали

// async function getPost(id){
// const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
//  return response.json()
// }
// getPost(1).then(data => console.log(data)).catch(err => console.log(err))

// async - await   --- гарантирует выпадание при ошибке в конечный catch

// использование try - catch 
// async function getPost(id){
//     try {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//         .then(res => res.json())
//         return response
//     } catch (error) {
//         // throw error          -- как вариант
//         return Promise.reject(error)
//     }
    
//     }
//     getPost(1)
//         .then(data => console.log(data))
//         .catch(err => console.log(err))
    
// когда надо получить не одни данные (например - 2 поста)
async function getPost(id){
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            return response
        } catch (error) {
            // throw error          -- как вариант
            return Promise.reject(error)
        }    
}
// функция получения всего
async function getAll(){
    const[res1, res2] = await Promise.all([getPost(1), getPost(2)])
    console.log(res1, res2)
}

getAll()