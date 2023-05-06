import { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //temp
  const [books, setBooks] = useState([])

  const handleCreateBook = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', imageFile);

    const bookDetails = {
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      description:
        'The Name of the Wind is a fantasy novel about a young orphan boy named Kvothe who grows up to become a powerful wizard.',
      publisher: 'DAW Books',
      publicationDate: '2007-03-27',
      language: 'English',
      price: 12.99,
      category: 'fantasy',
      stock: 25,
    };

    for (const key in bookDetails) {
      formData.append(key, bookDetails[key]);
    }

    setLoading(true)
    fetch('http://127.0.0.1:4000/book/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        setError(!data.success)
        setMessage(data.data.message ? data.data.message : data.data[0].message)
        // localStorage.setItem('token', data.data.token)
        setLoading(false)
        console.log(data);
      });
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  useEffect(()=>{
    fetch('http://localhost:4000/book?title=Test')
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      setBooks(data.data.books)
      console.log(books);
    })
  },[books.length])


  return (
    <div className="container w-full">


        {
          books?.map((book, idBook)=>{
            return <div key={idBook} className="card">
              <img className="card-img-top" src={'http://localhost:4000' + book.imageUrl} alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.category}</p>
                <a href="#" className="btn btn-primary">shop</a>
              </div>
            </div>
          })
        }


      {/* <form onSubmit={handleCreateBook}>
          <input type="file" onChange={handleImageChange} />
           <p className={`text-sm flex items-center ${error ? 'text-red-700' : 'text-green-700'}` } >
              {
                error ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              
              }

            {message}
            </p>

           <button type="submit" className="btn btn-primary">
           {
                loading ? 'loading...'
                : 
              <span className='flex items-center '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                Create book
              </span>
              }
           </button>
           </form> */}
           </div>
  )}

  export default App;
