// todo: Demo user data
const users = [{
    id: '1',
    name: 'Christian',
    email: 'christian@medina.com',
    age:32
    },
    {id: '2',
    name: 'Melissa',
    email: 'melissa@figueroa.com',
    age:25
    },
    {id: '3',
    name: 'Tobias',
    email: 'tobias@medina.com',
    age:30
    }

]; 

const posts =[{
    id:'01',
    title:'Fledermaus',
    body: 'Die Fledermaus ist auch eine tolle Sache.',
    published: true,
    author: '2'
    },
    {
        id:'02',
        title:'Coyote aeyou',
        body: 'El coyote ...',
        published: true,
        author:'3'
    },
    {
        id:'03',
        title:'Pedro picapiedra',
        body: 'Pedro picapiedra se escribe la segunda en minuscula?',
        published: true,
        author: '2'
    },


];

const comments = [{
    id:'001',
    text:'This is hilariuos ...',
    author:'1',
    post:'02'
    },
    {
    id:'002',
    text:'Fantastic, I should try this too ...',
    author:'3',
    post:'03'
    },
    {id:'003',
    text:'Wow, I never thought about that!',
    author:'1',
    post:'02'
    },
    {id:'004',
    text:'Its like a rat in a temple full of cheese',
    author:'3',
    post:'02'
    },
    {id:'005',
    text:'So funny, cant stop laughing',
    author:'2',
    post:'03'
    },
    {id:'006',
    text:'Sad this occured last time, but now Im so happy lol',
    author:'2',
    post:'03'
    },
    {id:'007',
    text:'Is there an english version of this post?',
    author:'2',
    post:'01'
    }
];


const db = {
    users,
    posts,
    comments

}
export{db as default};