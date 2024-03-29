import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const CreateBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [language, setLanguage] = useState('');
  const [price, setPrice] = useState(0);
  const [categories, setCategories] = useState('');
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateBook = (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('publisher', publisher);
    formData.append('publicationDate', publicationDate);
    formData.append('language', language);
    formData.append('price', price);
    formData.append('categories', categories);
    formData.append('stock', stock);
    formData.append('image', image);
  
    fetch('http://127.0.0.1:4000/book', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setError(!data.success);
        setMessage(data.data.message ? data.data.message : data.data[0].message);
        setLoading(false);
      });
  };

  return (
    <div className="container w-full">
      <form onSubmit={handleCreateBook}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publisher">Publisher:</label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            placeholder="Enter publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publicationDate">Publication Date:</label>
          <input
            type="date"
            className="form-control"
            id="publicationDate"
            placeholder="Enter publication date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="language">Language:</label>
          <input
           type="text"
           className="form-control"
           id="language"
           placeholder="Enter language"
           value={language}
           onChange={(e) => setLanguage(e.target.value)}
           />
        </div>
        <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
        type="number"
        className="form-control"
        id="price"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="categories">Categories:</label>
        <input
        type="text"
        className="form-control"
        id="categories"
        placeholder="Enter categories"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="stock">Stock:</label>
        <input
        type="number"
        className="form-control"
        id="stock"
        placeholder="Enter stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
        type="file"
        className="form-control"
        id="imageUrl"
        placeholder="Enter image URL"
        onChange={(e) => setImage(e.target.files[0])}
        />
        </div>

        <p className={`text-sm flex items-center ${error ? 'text-red-700' : 'text-green-700'}` } >
          {
            error ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 pr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 pr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
      </form>
    </div>
  )}

  export default CreateBookForm;