import Form from "../components/Form"
import "../styles/index.css"

function Login(){
    return (<div className="contacts-container">
                    <div className="contacts-sub-container">
                         <div className="header-container">
                        </div>
                        
                         <div className="login-form-container">
                            <Form route="/api/token/" method="login"/>
                        </div>
                        
                    </div>
                    
                            
            </div>
                
            )
}
export default Login