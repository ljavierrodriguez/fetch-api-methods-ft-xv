const FormUser = ({ user, setUser, handleSubmit, handleEdit, action }) => {
    return (
        <form className="row g-3" onSubmit={action === 'create' ? handleSubmit : handleEdit}>
            <div className="col-md-6 col-sm-6">
                <label htmlFor="inputName4" className="form-label">Name</label>
                <input type="text" className="form-control" id="inputName4" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </div>
            <div className="col-md-6 col-sm-6">
                <label htmlFor="inputLastName4" className="form-label">Lastname</label>
                <input type="text" className="form-control" id="inputLastname4" value={user.lastname} onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword4" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
            </div>
            <div className="col-md-4 col-sm-6">
                <label htmlFor="inputCity" className="form-label">City</label>
                <input type="text" className="form-control" id="inputCity" value={user.city} onChange={(e) => setUser({ ...user, city: e.target.value })}/>
            </div>
            <div className="col-md-4 col-sm-6">
                <label htmlFor="inputState" className="form-label">State</label>
                <select id="inputState" className="form-select" value={user.state} onChange={(e) => setUser({ ...user, state: e.target.value })}>
                    <option selected value="">Choose...</option>
                    <option value="ARG">ARGENTINA</option>
                    <option value="CHL">CHILE</option>
                    <option value="VEN">VENEZUELA</option>
                </select>
            </div>
            <div className="col-md-4">
                <label htmlFor="inputZip" className="form-label">Zip</label>
                <input type="text" className="form-control" id="inputZip" value={user.zip} onChange={(e) => setUser({ ...user, zip: e.target.value })}/>
            </div>
            <div className="col-12">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck" checked={user.active} onChange={(e) => setUser({ ...user, active: e.target.checked })}/>
                    <label className="form-check-label" htmlFor="gridCheck">
                        Active
                    </label>
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
        </form>
    )
}

export default FormUser;