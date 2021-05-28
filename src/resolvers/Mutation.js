import uuidv4 from 'uuid/v4';


const Mutation = {
    createUser(parent, args, {db}, info){
        const emailTaken = db.users.some((user)=> user.email === args.data.email);
        if(emailTaken){
            throw new Error('Email taken.');
        }

    
        const user = {
            id: uuidv4(),
            ... args.data
            // name: args.name,
            // email: args.email,
            // age: args.age
        }

        db.users.push(user);


        console.log(args);

        return user
    },

    deleteUser(parent,args,{db},info){
        const userIndex = db.users.findIndex((user) => user.id === args.id);
        if(userIndex === -1){
            throw new Error('User not found!');
        }
        const deletedUsers = db.users.splice(userIndex,1);


        for(let i=0; i<=posts.length; i++){
            const authorIndex = db.posts.findIndex((postId) => postId.author === deletedUsers[0].id);
            if(authorIndex > -1){
                const deletedPosts = db.posts.splice(authorIndex,1);
            }
        }

        for(let i=0; i<=db.comments.length; i++){
            const authorCIndex = db.comments.findIndex((commentId) => commentId.author === deletedUsers[0].id);
            if(authorCIndex > -1){
                const deletedComments = db.comments.splice(authorCIndex,1);
            }
        }





        return deletedUsers[0];
    },

    updateUser(parent,args,{db}, info){
        const {id, data} = args;
        const user = db.users.find((user)=> user.id === id);
        
        if(!user){
            throw new Error ('User does not belong to this database!');
        }
        
       

        if(typeof data.email === 'string'){
            const emailTaken = db.users.some((user)=> user.email === data.email);
            if(emailTaken){
                throw new Error('This email is already in use!');
            }
           user.email = data.email
        }

        if(typeof data.name === 'string'){
           user.name = data.name;
        }

        if(typeof data.age !== 'undefined' ){
            user.age = data.age;
        }
        return user;
    },
    createPost(parent, args, {db, pubsub}, info){
        const userExists = db.users.some((user)=> user.id === args.data.author);
        if(!userExists){
            throw new Error('Please register, before posting.');
        }
        const post = {
            id: uuidv4(),
            ... args.data
            // title: args.title,
            // body: args.body,
            // published: args.published,
            // author: args.author
        }

        db.posts.push(post);
        pubsub.publish(`post`, {post:{
            mutation:'CREATED',
            data: post
        }});
        return post
    },

    deletePost(parent,args,{db, pubsub},info){
        const postIndex = db.posts.findIndex((post)=> post.id === args.id);
        if(postIndex === -1){
            throw new Error(`Post id: ${args.id}, doesnt correspond to any post.`);
        }
        const [post] = db.posts.splice(postIndex,1);
        
        db.comments = db.comments.filter((comment) => comment.post !== args.id);
    
        if(post.published){
            pubsub.publish(`post`, {post:{
                mutation:'DELETED',
                data:post
            }})
        }
        return post;
    },

    updatePost(parent,args,{db, pubsub},info){
        const {id, data} = args;
        const post = db.posts.find((post)=> post.id === id)
        const originalPost = {...post};
        if(!post){
            throw new Error('There is no Post like this');
        }
        if(typeof data.title === 'string'){
            post.title = data.title;
        }
        if(typeof data.body === 'string'){
            post.body = data.body;
        }
        if(typeof data.published === 'boolean'){
            post.published = data.published;

            if(originalPost.published && !post.published){
                //deleted
                pubsub.publish('post',{post:{
                    mutation:'DELETED',
                    data:originalPost
                }});
            }else if(!originalPost.published && post.published){
                //Created
                pubsub.publish('post',{post:{
                    mutation:'CREATED',
                    data:post
                }})
            }
            else if(post.published){
            //updated
            pubsub.publish('post', {post:{
                mutation:'UPDATED',
                data:post
            }});
        }
        }
        

        return post;
    },

    createComment(parent,args,{db, pubsub},info){
        const userExists = db.users.some((user)=> user.id === args.data.author);
        const postExists = db.posts.some((post)=> post.id === args.data.post && post.published);
        if(userExists && postExists){
            const comment ={
                id: uuidv4(),
                ... args.data
                // text: args.text,
                // author: args.author,
                // post: args.post
            }

            db.comments.push(comment);
            pubsub.publish(`comment ${args.data.post}`, {comment:{
                mutation:'CREATED',
                data:comment
            }});
            return comment;
        }

        else if(!postExists){
            throw new Error('There is no such post!');
        }

        else{
            throw new Error('Please register.');
        }

        
    },

    deleteComment(parent,args,{db, pubsub},info){
        const commentIndex = db.comments.findIndex((comment)=>comment.id === args.id);
        if(commentIndex === -1){
            throw new Error(`Comment with id: ${args.id} doesnt exist!`);
        }
        const [comment] = db.comments.splice(commentIndex,1);
        const originalComment = {...comment}
        pubsub.publish(`comment ${comment.post}`, {comment:{
            mutation:'DELETED',
            data:originalComment
        }});
        return comment;
    },   

    updateComment(parent,args,{db,pubsub},info){
        const {id, data} = args;
        const comment = db.comments.find((comment)=> comment.id === id);
        
        if(!comment){
            throw new Error('Not such comment on database!');
        }
        if(typeof data.text === 'string'){
            comment.text = data.text;
            const post = db.posts.find((post)=> post.id === comment.post);
            if(!post.published){
                throw new Error('Not published Post!');
            }
            pubsub.publish(`comment ${post.id}`, {comment:{
                mutation:'UPDATED',
                data: comment
            }});
        }

        return comment;
    }
};

export{Mutation as default}