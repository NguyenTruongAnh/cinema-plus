import './profileEdit.css'
import { useState } from 'react'
import axios from 'axios'

export default function ProfileEdit({ edit, setEdit, user, dispatch }) {
    const [displayName, setDisplayName] = useState(user.displayName)
    const [phone, setPhone] = useState(user.phone)
    const [email, setEmail] = useState(user.email)
    const [birthdate, setBirthdate] = useState(user.birthDate)
    const [gender, setGender] = useState(user.gender)
    const [region, setRegion] = useState(user.region)
    const [file, setFile] = useState(null)

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const PF = "http://localhost:5000/images/"

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (displayName && phone && email && birthdate && gender && region) {
            dispatch({type:"UPDATE_START"})

            const updatedUser = {
                userId: user._id,
                email,
                phone,
                displayName,
                gender,
                region,
                birthDate: new Date(birthdate)
            }

            if (file) {
                const data = new FormData()
                const fileName = Date.now() + file.name
                data.append("name", fileName)
                data.append("file", file)
                updatedUser.profilePicture = fileName

                try {
                    await axios.post("/upload", data)
                } catch(err) {
    
                }
            }

            try {
                const res = await axios.put("/users/" + user._id, updatedUser)

                dispatch({type:"UPDATE_SUCCESS", payload: res.data })
                setError(false)
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 1000)
            } catch(err) {
                dispatch({type:"UPDATE_FAILURE"})
            }

        } else {
            setError(true)
        }
    }

    return (
        <div className="profile-edit">
            <form className="profile-edit__wrapper" onSubmit={handleSubmit}>
                <i 
                    className="profile-edit__btn-close fas fa-times"
                    onClick={() => setEdit(!edit)}
                ></i>

                <div className="profile-edit__avatar">
                    <img 
                        className="profile-edit__img"
                        src={file ? URL.createObjectURL(file) : PF + user.profilePicture} 
                        alt="Avatar"
                    />
                    <label htmlFor="profile-edit__file" className="profile-edit__icon">
                        <i className="fas fa-camera"></i>
                    </label>
                    <input 
                        type="file" 
                        id="profile-edit__file" 
                        className="profile-edit__file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <div className="profile-edit__list">
                    <div className="grid">
                        <div className="row no-gutters">
                            <div className="col c-12 m-6 l-6">
                                <div className="profile-edit__item">
                                    <label htmlFor="profile-edit__input-name">Display name</label>
                                    <input 
                                        placeholder={user.displayName}
                                        type="text" 
                                        name="name" 
                                        id="profile-edit__input-name" 
                                        className="profile-edit__input"
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col c-12 m-6 l-6">
                                <div className="profile-edit__item">
                                    <label htmlFor="profile-edit__input-phone">Phone</label>
                                    <input 
                                        placeholder={user.phone}
                                        type="number" 
                                        name="phone" 
                                        id="profile-edit__input-phone" 
                                        className="profile-edit__input"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col c-12 m-6 l-6">
                                <div className="profile-edit__item">
                                    <label htmlFor="profile-edit__input-email">Email</label>
                                    <input 
                                        placeholder={user.email}
                                        type="email" 
                                        name="email" 
                                        id="profile-edit__input-email" 
                                        className="profile-edit__input"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col c-12 m-6 l-6">
                                <div className="profile-edit__item">
                                    <label htmlFor="profile-edit__input-email">Birthdate</label>
                                    <input 
                                        type="date" 
                                        name="birthdate" 
                                        id="profile-edit__input-birthdate" 
                                        className="profile-edit__input"
                                        max={date}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col c-12 m-6 l-6">
                                <div className="profile-edit__item">
                                    <label htmlFor="profile-edit__input-gender">Gender</label>
                                    <select 
                                        name="gender" 
                                        id="profile-edit__input-gender" 
                                        className="profile-edit__input" 
                                        onChange={(e) => setGender(e.target.value)}
                                        value={gender}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col c-12 m-6 l-6">
                                <div className="profile-edit__item">
                                    <label htmlFor="profile-edit__input-location">Region</label>
                                    <select 
                                        name="gender" 
                                        id="profile-edit__input-location" 
                                        className="profile-edit__input" 
                                        onChange={(e) => setRegion(e.target.value)}
                                        value={region}
                                    >
                                        <option value="South">South</option>
                                        <option value="Central">Central</option>
                                        <option value="North">North</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {error && 
                    <span 
                        style={
                            { 
                                display:"block", 
                                width:"100%", 
                                textAlign: 'center', 
                                fontSize:"1.6rem", 
                                color:"red",
                            }}
                    >
                        Please fill in all the infomation
                    </span>
                }

                {success && 
                    <span 
                        style={
                            { 
                                display:"block", 
                                width:"100%", 
                                textAlign: 'center', 
                                fontSize:"1.6rem", 
                                color:"green",
                            }}
                    >
                        Update successfully
                    </span>
                }

                <button 
                    className="profile-edit__btn-update"
                    type="submit"
                >
                    Update
                </button>
            </form>
        </div>
    )
}
