const articles = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet 1",
    slug: "lorem-ipsum-dolor-sit-amet-1",
    creationDate: new Date("January 1, 2020"),
    lastUpdateDate: new Date("January 10, 2020"),
    publishDate: new Date("January 15, 2020"),
    authors: ["Jeremy H"],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
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
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
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
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
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
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
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
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla efficitur interdum ipsum ac malesuada. Nunc pellentesque ligula mauris, id fringilla lectus mollis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam faucibus arcu lacus, ac auctor justo suscipit vel. Morbi eget enim lorem. Praesent elementum magna in pharetra fringilla. Nam aliquam, risus nec sagittis iaculis, mi enim dapibus eros, sed finibus nunc quam et mauris. Duis bibendum ex quis feugiat vulputate. Cras tincidunt aliquam turpis, non pellentesque massa. Quisque luctus et nisl id venenatis. Ut tempor, lacus ac pharetra lacinia, odio libero accumsan lacus.",
    isPublished: true,
    isEmailed: true,
    likes: 10
  }
]

const getAll = () => {
  return articles
}

const articleServices = {
  getAll,
}

export default articleServices