import React, { useState } from 'react';

function BookForm( {handleSubmit} ){
    const [value, setValue] = useState('');
    return(
        <div>
            <form>
                <input onChange={newVal => {
                    // I know, this is not optimum but 
                    // I forgot how to update the 
                    // value after every keystroke...
                    setValue(value + newVal.nativeEvent.data);
                }} name="ejemplo" type="text" value={value}/>
                <button onClick={(ev) => {
                    ev.preventDefault();
                    handleSubmit(value);
                }}>Buscar!</button>
            </form>
        </div>
    );
}

export default BookForm;