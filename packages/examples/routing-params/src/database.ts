const users = [
  {
    name: 'Alice',
    id: 'alice',
    articles: [1, 3],
  },
  {
    name: 'Bob',
    id: 'bob',
    articles: [2],
  },
  { name: 'Carol', id: 'carol', articles: [] },
]

const articles = [
  {
    id: 1,
    title: `Alice's first article`,
    content: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare
dignissim erat non commodo. Phasellus auctor, massa ut dapibus eleifend, tortor
lacus hendrerit nisi, eget cursus eros purus a magna. Morbi dignissim ante
orci, quis faucibus ex vulputate quis. Integer auctor feugiat ex quis
porttitor. Aliquam erat volutpat. Sed ipsum sapien, maximus ut feugiat in,
finibus elementum elit. Quisque ultricies quis nisi quis elementum.
Nullam ultricies urna et neque consectetur tincidunt. Nunc vulputate erat
lectus.`.trim(),
    owner: 'alice',
  },
  {
    id: 2,
    title: `Bob's first article`,
    content: `
Aliquam aliquet nec nisl quis tincidunt. Sed finibus porta mauris non
fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus.
Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla ut congue
magna, id pharetra lectus. Suspendisse interdum dignissim orci sed
condimentum. Morbi vel fermentum turpis. Vivamus finibus nunc sit amet
tristique semper. Nulla facilisi.`.trim(),
    owner: 'bob',
  },
  {
    id: 3,
    title: `Alice's second article`,
    content: `
Pellentesque lorem ligula, molestie nec tincidunt vitae, convallis eget mauris.
Mauris vitae nibh eleifend, pellentesque dolor sed, sollicitudin ipsum. Proin
luctus ipsum mauris, nec dignissim nibh suscipit et. Fusce luctus, justo sed
consectetur volutpat, arcu lectus molestie arcu, vel pulvinar urna eros eu sem.
Aliquam at est egestas, interdum odio eu, rutrum nulla. Quisque ac nisi eros.
Aliquam venenatis pulvinar ex, sed sagittis nibh viverra non. Lorem ipsum dolor
sit amet, consectetur adipiscing elit. Donec ipsum sapien, viverra ac bibendum
sit amet, varius vitae tortor.`.trim(),
    owner: 'alice',
  },
]

class DatabaseImpl {
  getUsers = () => [...users]

  getUserById = (id: string) => users.find((u) => u.id === id)

  getArticleById = (id: number) => articles.find((a) => a.id === id)
}

export const Database = new DatabaseImpl()
