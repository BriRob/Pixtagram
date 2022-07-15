return (
        <>

            <Autocomplete
                id="users-search"
                getOptionLabel={(jsonResults) => `${jsonResults.username}`}
                options={jsonResults.length === 0 ? [] : jsonResults}
                noOptionsText={'NO PEOPLE FOUND'}
                style={{ width: 250, margin:15, 'postion': 'relative', 'left': 10 }}
                renderOption={(option) => (
                    <div onClick={() => { history.push(`/users/${option.id}`) }}>
                        <React.Fragment >

                            <span
                                style={{ cursor: 'pointer' }}
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
                    />)}
            />
        </>
    )
}
