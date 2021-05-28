const Query = {
    
    users(parent, args, {db}, info){
       
       if(!args.query){
           return db.users;
       } 

       return db.users.filter((user)=>{
           return user.name.toLowerCase().includes(args.query.toLowerCase())
       });
       
    },

     me(){
       return {
           id: '1234009482',
           name: 'Mikessss',
           email: 'mikes@example.com',
           
       };

     },

     post(){
         return {
           id: '08',
           title: 'Untold stories',
           body: 'This is a great story!',
           published: true
         };
     },

     posts(parent, args, {db}, info){
       if(!args.query){
           return db.posts;
       }  
       
       return db.posts.filter((post)=>{
           const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
           const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
           return isTitleMatch || isBodyMatch;
       });
       },

    comments(parent,args,{db},info){

       return db.comments;
    },

    comment(){
        return {
            id:'1',
            text:'This should work',
            author:'01',
            post:'002'
        }
    }

   };

   export {Query as default}