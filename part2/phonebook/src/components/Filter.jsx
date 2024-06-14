const Filter = (props) => {
    return <div>
        filter shown with: <input value={props.searchName} onChange={props.handleSearchName} required />
    </div>
}

export default Filter