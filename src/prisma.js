import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs:'./src/generated/prisma.graphql',
    endpoint:'http://localhost:4466'
})

//prisma.query prisma.mutation prisma.subscription prisma.exists

// const createPostForUser = async(authorId, data)=>{
    
//     const userExists = await prisma.exists.User({id:authorId})
    
//     if(!userExists){
//         throw new Error(`No user registred with id: ${authorId}`)
//     }
    
//     const post = await prisma.mutation.createPost({
//         data:{
//             ...data,
//             author:{
//                 connect:{
//                     id:authorId
//                 }
//             }
//         }
//     }, '{author {id name email posts{id title published}}}')

//     return post.author
// }

// createPostForUser('ckp6m84hp00090b26ba81ka15',{
//     title:"Messing around with graphql",
//     body:"This is so pretty nead!",
//     published:true
// }).then((user)=>console.log(JSON.stringify(user,undefined,2))).catch((err) => {
//     console.log(`${err}`)
// })


const updatePostForUser = async(postId, data) => {

    const postExists = await prisma.exists.Post({
        id:postId
    })
    if(!postExists){
        throw new Error(`There is no Post with id: ${postId}`)
    }
    const post = await prisma.mutation.updatePost({
        where:{
            id:postId
        },
        data:{
            ...data
        }
    },'{author{id name email posts{id title published}}}')
    return post.author
}

updatePostForUser("ckp6q9oeo00hy0b26p629qx1r", {
    published:false
}).then((post)=>console.log(JSON.stringify(post,undefined,2))).catch(err=>console.error(err.message))



// prisma.mutation.createPost({
//     data:{
//         title: "Graphql 101",
//         body:"Her.",
//         published:true,
//         author:{
//             connect:{
//                 id:"ckp6m84hp00090b26ba81ka15"
//             }
//         }
//     }}, '{id title body author{id name}}').then((data)=>{
//         console.log(JSON.stringify(data,undefined,2))
//         return prisma.query.users(null,'{id name email posts{id title}}')
//     }).then((data)=>{
//         console.log(JSON.stringify(data,undefined,2))
//     })

// prisma.mutation.updatePost({
//     where:{
//             id:"ckp72ah8o000k0939rwcdnuv1"
//         },
//     data:{
//         title:"New title is bliblablub",
//         body:"such a mess!",
//         published:false
//     }    
        
//     },'{id title body published author{id name email}}').then((data)=>{
//         console.log(JSON.stringify(data,undefined,2))
//         return prisma.query.posts(null,'{id title body author{name email id}}')
//     }).then((data)=>{
//         console.log(JSON.stringify(data, undefined,2))
//     })