<div className="nav-center">
                <div className={`search-field ${isSearchError ? "search-error" : ""}`}>
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery} 
                        className="search " placeholder='search for a book'/>
                    <Link to={handleSearchQuery}>
                        <button onClick={handleSearchClick}>
                            < SearchRoundedIcon sx={{ color :'#444' }} />
                        </button>
                    </Link>
                </div>
            </div>