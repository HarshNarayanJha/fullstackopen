const Filter = (props) => {
    return <div>
        find countries <input value={props.searchName} onChange={props.handleSearchName} required />
    </div>
}

export default Filter