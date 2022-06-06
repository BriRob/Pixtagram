import React, { useState, useEffect } from "react"
import Autocomplete from '@material-ui/lab/Autocomplete'; //delete if needed
import TextField from '@material-ui/core/TextField'
import './searchbar.css'
import { useHistory } from "react-router-dom";

function SearchBar() {
    const history = useHistory()
    const [jsonResults, setJsonResults] = useState([])
    // const [value, setValue] = useState('')
    useEffect(() => {
        fetch('/api/users/all')
            .then((response) => response.json())
            .then((json) => {
                const users = json.users
                setJsonResults(users)
            })
    }, [])

    // console.log(jsonResults, "this is jsonresults")

    return (
        <>

            <Autocomplete
                id="users-search"
                getOptionLabel={(jsonResults) => `${jsonResults.username}`}
                options={jsonResults.length === 0 ? [] : jsonResults}
                // isOptionEqualToValue={(option, value) => option.username === value.username}
                noOptionsText={'NO PEOPLE FOUND'}
                style={{ width: 250, margin:15, 'postion': 'relative', 'left': 10 }}
                // shouldItemRender={(option, value) => option.username.toLowercase().indexOf(value.toLowercase()) > -1}
                renderOption={(option) => (
                    <div onClick={() => { history.push(`/users/${option.id}`) }}>
                        <React.Fragment >

                            <span
                                style={{ cursor: 'pointer' }}
                            // onClick={()=> {window.location.href = `/users/${option.id}`}}>
                            //     {`${option.username}`}
                            // </span>
                            >
                                {`${option.username}`}
                            </span>
                        </React.Fragment>
                    </div>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id='text-field'
                        placeholder='Search...'
                    // inputProps={{style: {color: 'white'}}}
                    />)}
            />
        </>
    )
}

export default SearchBar
