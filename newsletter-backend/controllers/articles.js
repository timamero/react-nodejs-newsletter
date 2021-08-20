const articlesRouter = require('express').Router()
const showdown = require('showdown')

const converter = new showdown.Converter()
converter.setFlavor('github');
converter.setOption('simpleLineBreaks', 'true');
converter.setOption('noHeaderId', 'true');
converter.setOption('headerLevelStart', '2');


let articles = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet 1",
    slug: "lorem-ipsum-dolor-sit-amet-1",
    creationDate: new Date("January 1, 2020"),
    lastUpdateDate: new Date("January 10, 2020"),
    publishDate: new Date("January 15, 2020"),
    authors: ["Jeremy H"],
    content: `## Lorem ipsum dolor sit amet
*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros.*
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit [sample link](www.google.com). Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
  * Bullet 1
  * Bullet 2
  * Bullet 3

<br> 
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
1. Item 1
2. Item 2
3. Item 3  
  
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
- [x] checked list item
- [ ] unchecked list item
`,
    isPublished: true,
    isEmailed: true,
    likes: 5
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet 2",
    slug: "lorem-ipsum-dolor-sit-amet-2",
    creationDate: new Date("February 10, 2021"),
    lastUpdateDate: new Date("February 11, 2021"),
    publishDate: new Date("February 15, 2021"),
    authors: ["Christine M", "Jeremy H"],
    content: `## Lorem ipsum dolor sit amet
*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros.*
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit [sample link](www.google.com). Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
  * Bullet 1
  * Bullet 2
  * Bullet 3

<br> 
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
1. Item 1
2. Item 2
3. Item 3  
  
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
- [x] checked list item
- [ ] unchecked list item
`,
    isPublished: true,
    isEmailed: true,
    likes: 1
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet 3",
    slug: "lorem-ipsum-dolor-sit-amet-3",
    creationDate: new Date("March 15, 2021"),
    lastUpdateDate: new Date("April 10, 2021"),
    publishDate: null,
    authors: ["Christine M"],
    content: `## Lorem ipsum dolor sit amet
*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros.*
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit [sample link](www.google.com). Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
  * Bullet 1
  * Bullet 2
  * Bullet 3

<br> 
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
1. Item 1
2. Item 2
3. Item 3  
  
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
- [x] checked list item
- [ ] unchecked list item
`,
    isPublished: false,
    isEmailed: false,
    likes: 0
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet 4",
    slug: "lorem-ipsum-dolor-sit-amet-4",
    creationDate: new Date("June 20, 2021"),
    lastUpdateDate: new Date("July 1, 2021"),
    publishDate: null,
    authors: ["Christine M"],
    content: `## Lorem ipsum dolor sit amet
*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros.*
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit [sample link](www.google.com). Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
  * Bullet 1
  * Bullet 2
  * Bullet 3

<br> 
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
1. Item 1
2. Item 2
3. Item 3  
  
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
- [x] checked list item
- [ ] unchecked list item
`,
    isPublished: false,
    isEmailed: false,
    likes: 0
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet 5",
    slug: "lorem-ipsum-dolor-sit-amet-5",
    creationDate: new Date("March 20, 2021"),
    lastUpdateDate: new Date("March 25, 2021"),
    publishDate: new Date("March 25, 2021"),
    authors: ["Olivia L"],
    content: `## Lorem ipsum dolor sit amet
*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros.*
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit [sample link](www.google.com). Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
  * Bullet 1
  * Bullet 2
  * Bullet 3

<br> 
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
1. Item 1
2. Item 2
3. Item 3  
  
<br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
## Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at varius eros. Phasellus vitae magna quis purus vestibulum lobortis. Aliquam vitae iaculis tortor. Nam hendrerit erat non augue elementum, vel hendrerit libero consequat. Sed tristique egestas enim, quis porttitor leo aliquet nec. Donec non fringilla tellus, id aliquam justo. Morbi nulla mi, consequat at dapibus et, laoreet non lorem. Proin efficitur purus nec velit sagittis, at facilisis enim tincidunt. Nulla et libero eu neque pellentesque fringilla. Sed ac leo nulla. Donec nec augue vel tellus tempor laoreet. Aenean velit tortor, tincidunt non ornare id, tincidunt eget justo. Proin fermentum dolor eget est mattis rhoncus. Suspendisse faucibus sollicitudin posuere. Nullam nisi nulla, sollicitudin eu rutrum aliquet, ornare sit amet nisi.
<br>
- [x] checked list item
- [ ] unchecked list item
`,
    isPublished: true,
    isEmailed: true,
    likes: 10
  }
]

articlesRouter.get('/', (request, response) => {
  response.json(articles)
})

articlesRouter.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  const article = articles.find(article => article.id === id)

  const articleWithContentConverted = {
    ...article,
    content: converter.makeHtml(article.content)
  }

  if (article) {
    response.json(articleWithContentConverted)
  } else {
    response.status(404).end()
  } 
})

articlesRouter.get('/edit/:id', (request, response) => {
  const id = Number(request.params.id)
  const article = articles.find(article => article.id === id)
  
  if (article) {
    response.json(article)
  } else {
    response.status(404).end()
  } 
})

const generateId = () => {
  const maxId = articles.length > 0
    ? Math.max(...articles.map(a => a.id))
    : 0
  return maxId + 1
}

articlesRouter.post('/', (request, response) => {
  const body = request.body

  const article = {
    id: generateId(),
    title: body.title,
    slug: body.title.toLowerCase().split(' ').join('-'),
    creationDate: new Date(),
    lastUpdateDate: null,
    publishDate: null,
    authors: body.authors,
    content: body.content,
    isPublished: false,
    isEmailed: false,
    likes: 0
  }
  
  articles = articles.concat(article)

  response.json(article)
})

articlesRouter.put('/:id', (request, response) => {
  const body = request.body
  
  const updatedArticle = {
    id: Number(request.params.id),
    title: body.title,
    slug: body.title.toLowerCase().split(' ').join('-'),
    creationDate: body.creationDate,
    lastUpdateDate: new Date(),
    publishDate: body.publishDate,
    authors: body.authors,
    content: body.content,
    isPublished: body.isPublished,
    isEmailed: body.isEmailed,
    likes: body.likes
  }

  articles = articles.map(article => {
    if (article.id !== Number(request.params.id)) {
      return article
    } else {
      return updatedArticle
    }
  })

  response.json(updatedArticle)
})

articlesRouter.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  article = articles.filter(article => article.id !== id)

  response.status(204).end()
})

module.exports = articlesRouter