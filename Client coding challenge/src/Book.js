import React from 'react';

function Book( {title, thumb, author, textSnippet} ){
    return(
        <div>
            <h3>{title}</h3>
            <img src={thumb} />
            <p>By: {author}</p>
            <p>Text Snippet: {textSnippet}</p>
        </div>
    );
}

export default Book;