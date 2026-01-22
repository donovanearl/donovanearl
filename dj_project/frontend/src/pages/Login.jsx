import Form from "../components/LoginForm"
import "../styles/index.css"

function Login(){
    return <Form route="/api/token/" method="login"/>
}
export default Login