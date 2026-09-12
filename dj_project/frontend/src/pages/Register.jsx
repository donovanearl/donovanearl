import Form from "../components/Form"

function Register(){
    return (<div className="contacts-container">
                    <div className="contacts-sub-container">
                         <div className="header-container">
                        </div>
                        
                         <div className="register-form-container">
                            <Form route="/api/user/register/" method="register"/>
                        </div>
                        
                    </div>
                    
                            
            </div>
                
            )
    
}
export default Register