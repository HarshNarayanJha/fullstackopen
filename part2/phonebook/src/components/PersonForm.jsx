const PersonForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            name: <input value={props.newName} onChange={props.handleNewName} type='name' required />
        </div>
        <div>
            phone: <input value={props.newPhone} onChange={props.handleNewPhone} required />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}

export default PersonForm