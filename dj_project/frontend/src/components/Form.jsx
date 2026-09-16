import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";
import "../styles/FormLogin.css"
import { Link } from "react-router-dom";

function Form({route,method}){
    const [userprofilename,setUserprofilename] =useState("")
    const [useraddress,setUseraddress] =useState("")
    const [useremail,setUseremail] =useState("")
    const [usermobile,setUsermobile] =useState("")
    const [username,setUsername] =useState("")
    const [password,setPassword] =useState("")
    const [loading,setLoading] =useState(false)
    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const navigate=useNavigate() 
    const name= method==="login"? "Login":"Register";
    const [usernameError, setUsernameError] = useState("");

    // Stricter email check: catches @@, missing domain, missing dot, etc.
    const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isValidMobile = (value) => /^[0-9]+$/.test(value);

    const handleEmailChange = (e) => {
        setUseremail(e.target.value);
    };

     const handleMobileChange = (e) => {
        setUsermobile(e.target.value);
    };

     // onBlur fires once the user clicks/tabs away from the field
    const handleEmailBlur = () => {
        if (useremail === "") {
            setEmailError("");
        } else if (!isValidEmail(useremail)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    const handleMobileBlur = () => {
        if (usermobile === "") {
            setMobileError("");
        } else if (!isValidMobile(usermobile)) {
            setMobileError("Invalid phone number");
        } else {
            setMobileError("");
        }
    };

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if (method !== "login") {
            let hasError = false;

            if (!isValidEmail(useremail)) {
                setEmailError("Invalid email address");
                hasError = true;
            }
            if (!isValidMobile(usermobile)) {
                setMobileError("Invalid phone number");
                hasError = true;
            }

            if (hasError) return;
        }
        setLoading(true);

        try{
            const res = await api.post(route, {username,password,userprofilename,useraddress,useremail,usermobile})

            if (method==="login"){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);       // These changes the constants.js, gets the data from Django //
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login")
            }

        } catch(error){
             console.log("FULL ERROR DATA:", error.response?.data);
            if (method === "login") {
        // Keep login generic on purpose — don't reveal which field was wrong
                 alert("Invalid password or username");
            } else {
                const data = error.response?.data;
                setUsernameError(""); // reset before checking

                if (data?.username) {
                    const msg = Array.isArray(data.username) ? data.username[0] : data.username;
                    if (/already exists/i.test(msg)) {
                        setUsernameError("Username already exists");
                    } else {
                        setUsernameError(msg);
                    }
                } else {
                    alert("Registration failed. Please try again.");
                }
            }
            // if(error.response?.status===401){
            //     alert("Invalid password or username");
            // } else {
            //     alert("Invalid password or username");
            // }
        } finally {
            setLoading(false);
        }}


    return <form onSubmit={handleSubmit} className="formLogin-container" autoComplete="off">
        <div className="login-method-label">{name}</div>
          {name !=="Login" && (
            <div>
                    <input
                        className="formLogin-input"
                        type="text"
                        name="userprofilename"
                        value={userprofilename}
                        onChange={(e) => setUserprofilename(e.target.value)}
                        placeholder="Name"
                        autoComplete="off"
                    />
                    <input
                        className="formLogin-input"
                        type="text"
                        name="useraddress"
                        value={useraddress}
                        onChange={(e) => setUseraddress(e.target.value)}
                        placeholder="Address"
                        autoComplete="off"
                    />

                    <input
                        className="formLogin-input"
                        type="email"
                        name="useremail"
                        value={useremail}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        placeholder="Email address"
                        autoComplete="off"
                    />
                    {emailError && <p className="field-error">{emailError}</p>}

                    <input
                        className="formLogin-input"
                        type="tel"
                        name="usermobile"
                        value={usermobile}
                        onChange={handleMobileChange}
                        onBlur={handleMobileBlur}
                        placeholder="Mobile number eg.0501114545"
                        autoComplete="off"
                    />
                    {mobileError && <p className="field-error">{mobileError}</p>}
                </div>
                            
             )}
                <input className="formLogin-input"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="off"
                    />
                {usernameError && <p className="field-error">{usernameError}</p>}
                
                <input className="formLogin-input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="new-password"
                    />
                <button className="formLogin-button" type="submit" disabled={loading}>
                    {name}
                </button>
                    {name !== "Register" && (
                        <p className="signup-prompt">
                            Don’t have an account?{" "}<br></br>
                        <Link to="/register">Sign up here</Link> 
                        </p>
                    )}
  
    </form>

}
export default Form